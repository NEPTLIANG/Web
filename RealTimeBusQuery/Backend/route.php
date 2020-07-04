<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST" :
        $name = trim($_POST['name']);
        $id = trim($_POST['id']);
        $org = trim($_POST['org']);
        $intro = trim($_POST['intro']);
        $intro = isset($intro) ? $intro : "暂无说明";
        if ((preg_match($pattern, $id) !== 0) && (preg_match($pattern, $org) !== 0) && isset($name)) {
            //var_dump(isset($dev));
            @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
            if (mysqli_connect_errno()) {
                $result["status"] = 500;
                $result["message"] = "无法连接到数据库，请稍后重试";
                exit(json_encode($result));
            }
            $db->select_db("RealTimeBusQuery");
            $query = "INSERT INTO route VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ssss", $id, $name, $org, $intro);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "路线添加成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，路线未添加";
            }
            $db->close();
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
        }
        exit(json_encode($result));
        break;
    case "PUT":
        parse_str(file_get_contents('php://input'), $data);
        $id = trim($data["id"]);
        $name = trim($data["name"]);
        $org = trim($data["org"]);
        $intro = trim($data["intro"]);
        if ((preg_match($pattern, $id) !== 0) && (preg_match($pattern, $org) !== 0) && isset($name)) {
            @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "UPDATE route "
                . "SET id=?, name=?, org=?, intro=? "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sssss", $id, $name, $org, $intro, $id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "路线修改成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，路线未修改";
            }
            $db->close();
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
        }
        exit(json_encode($result));
        break;
    case "GET":
        if (isset($_GET["org"])) {
            $org = trim($_GET["org"]);
            if (preg_match($pattern, $org) !== 0) {
                @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
                if (mysqli_connect_errno()) {
                    exit("无法连接到数据库，请稍后重试");
                }
                $db->select_db("RealTimeBusQuery");
                $query = "SELECT id, name, org, intro "
                    . "FROM route "
                    . "WHERE org=?";
                $stmt = $db->prepare($query);
                $stmt->bind_param("s", $org);
                $stmt->bind_result($id, $name, $ort, $intro);
                $stmt->execute();
                $stmt->store_result();
                if ($stmt->num_rows > 0) {
                    $routes = [];
                    while ($stmt->fetch()) {
                        $route = [
                            "id" => $id,
                            "name" => $name,
                            "org" => $org,
                            "intro" => $intro
                        ];
                        array_push($routes, json_encode($route));
                    }
                    $db->close();
                    $result["status"] = 200;
                    $result["describe"] = "OK";
                    $result["routes"] = $routes;
                } else {
                    $result["status"] = 500;
                    $result["message"] = "发生错误，无法查询路线";
                }
            } else {
                $result["status"] = 400;
                $result["message"] = "不合法的值";
            }
            exit(json_encode($result));
        } else {
            @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "SELECT id, name, org, intro "
                . "FROM route";
            $stmt = $db->prepare($query);
            $stmt->bind_result($id, $name, $ort, $intro);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                $routes = [];
                while ($stmt->fetch()) {
                    $route = [
                        "id" => $id,
                        "name" => $name,
                        "org" => $org,
                        "intro" => $intro
                    ];
                    array_push($routes, json_encode($route));
                }
                $db->close();
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["routes"] = $routes;
            } else {
                $result["status"] = 500;
                $result["message"] = "暂无路线";
            }
            exit(json_encode($result));
        }
        break;
    case "DELETE":
        parse_str(file_get_contents("php://input"), $delete);
        $id = trim($delete['id']);
        if (!preg_match($pattern, $id)) {
            $response['status'] = 400;
            $response['message'] = "不合法的值";
            exit(json_encode($response, JSON_UNESCAPED_UNICODE));
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
        if (mysqli_connect_errno()) {
            $response['status'] = 500;
            $response['message'] = "无法连接到数据库，请稍后重试";
            exit(json_encode($response, JSON_UNESCAPED_UNICODE));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "DELETE FROM route "
            . "WHERE id=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        if ($stmt->affected_rows) {
            $response['status'] = 200;
            $response['describe'] = "OK";
        } else {
            $response['status'] = 500;
            $response['message'] = "发生错误，路线未删除";
        }
        $db->close();
        exit(json_encode($response, JSON_UNESCAPED_UNICODE));
        break;
}
