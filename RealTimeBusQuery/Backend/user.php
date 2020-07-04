<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
$pwdPattern = "/^[a-fA-F0-9]{128}$/";
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST" :
        $name = trim($_POST['name']);
        $id = trim($_POST['id']);
        $pwd = trim($_POST['pwd']);
        if (strlen($name) <= 20 && (preg_match($pattern, $id) !== 0) && preg_match($pwdPattern, $pwd)) {
            @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
            if (mysqli_connect_errno()) {
                $result["status"] = 500;
                $result["message"] = "无法连接到数据库，请稍后重试";
                exit(json_encode($result, JSON_UNESCAPED_UNICODE));
            }
            $db->select_db("RealTimeBusQuery");
            $query = "INSERT INTO user(name, id, pwd) VALUES (?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sss", $name, $id, $pwd);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "注册成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，未注册";
            }
            $db->close();
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
        }
        exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        break;
    case "PUT":
        parse_str(file_get_contents('php://input'), $data);
        $id = trim($data["id"]);
        $route = trim($data["route"]);
        if ((preg_match($pattern, $id) !== 0) && isset($route)) {  //用户添加路线
            @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "UPDATE user "
                . "SET route=? "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ss", $route, $id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "修改成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，未修改";
            }
            $db->close();
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
        }
        exit(json_encode($result));
        break;
    case "GET":
        if (isset($_GET['pwd'])) {  //登录验证
            $id = trim($_GET["id"]);
            $pwd = trim($_GET["pwd"]);
            //echo $id . "<br/>" . $pwd . "<br/>";
            //echo "<br/>" . preg_match($pwdPattern, $pwd);
            if (preg_match($pattern, $id) && preg_match($pwdPattern, $pwd)) {
                @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
                if (mysqli_connect_errno()) {
                    $response['status'] = 500;
                    $response['message'] = "无法连接到数据库，请稍后重试";
                    exit(json_encode($response, JSON_UNESCAPED_UNICODE));
                }
                $db->select_db("RealTimeBusQuery");
                $query = "SELECT pwd "
                    . "FROM user "
                    . "WHERE id=?";
                $stmt = $db->prepare($query);
                $stmt->bind_param("s", $id);
                $stmt->bind_result($realPwd);
                $stmt->execute();
                $stmt->store_result();
                if ($stmt->num_rows === 1) {
                    $stmt->fetch();
                    if ($realPwd !== $pwd) {
                        $response["status"] = 400;
                        $response["message"] = "密码错误";
                        exit(json_encode($response, JSON_UNESCAPED_UNICODE));
                    }
                    $result["status"] = 200;
                    $result["describe"] = "OK";
                } else {
                    $result["status"] = 500;
                    $result["message"] = "发生错误，无法查询";
                }
                $db->close();
            } else {
                $result["status"] = 400;
                $result["message"] = "不合法的值";
            }
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        } else {  //查询路线
            $id = trim($_GET["id"]);
            if (preg_match($pattern, $id)) {
                @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
                if (mysqli_connect_errno()) {
                    $response['status'] = 500;
                    $response['message'] = "无法连接到数据库，请稍后重试";
                    exit(json_encode($response, JSON_UNESCAPED_UNICODE));
                }
                $db->select_db("RealTimeBusQuery");
                $query = "SELECT route "
                    . "FROM user "
                    . "WHERE id=?";
                $stmt = $db->prepare($query);
                $stmt->bind_param("s", $id);
                $stmt->bind_result($route);
                $stmt->execute();
                $stmt->store_result();
                if ($stmt->num_rows === 1) {
                    $stmt->fetch();
                    $result["status"] = 200;
                    $result["describe"] = "OK";
                    $result["routes"] = $route;
                } else {
                    $result["status"] = 500;
                    $result["message"] = "发生错误，无法查询";
                }
                $db->close();
            } else {
                $result["status"] = 400;
                $result["message"] = "不合法的值";
            }
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
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
        $query = "DELETE FROM user "
            . "WHERE id=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        if ($stmt->affected_rows) {
            $response['status'] = 200;
            $response["describe"] = "OK";
        } else {
            $response['status'] = 500;
            $response['message'] = "发生错误，用户未删除";
        }
        $db->close();
        exit(json_encode($response, JSON_UNESCAPED_UNICODE));
        break;
}
