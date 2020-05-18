<?php
session_start();

header("Access-Control-Allow-Origin: *");

switch ($_SERVER['REQUEST_METHOD']) {
    case "POST" :
        $name = trim($_POST['name']);
        $id = trim($_POST['id']);
        $pwd = trim($_POST['pwd']);
        $intro = trim($_POST['intro']);
        $intro = isset($intro) ? $intro : "暂无说明";
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        if ((preg_match($pattern, $id) !== 0) && isset($pwd) && isset($name)) {
            //var_dump(isset($dev));
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                $result["status"] = 500;
                $result["message"] = "无法连接到数据库，请稍后重试";
                exit(json_encode($result));
            }
            $db->select_db("RealTimeBusQuery");
            $query = "INSERT INTO org VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ssss", $id, $pwd, $name, $intro);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "机构注册成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，机构未注册";
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
        $pwd = trim($data["pwd"]);
        $intro = trim($data["intro"]);
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        if ((preg_match($pattern, $id) !== 0) && isset($pwd) && isset($name)) {
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "UPDATE org "
                . "SET id=?, name=?, pwd=?, intro=? "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sssss", $id, $name, $pwd, $intro, $id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "机构信息修改成功";
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，机构信息未修改";
            }
            $db->close();
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
        }
        exit(json_encode($result));
        break;
    case "GET":
        $id = trim($_GET["id"]);
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        if (preg_match($pattern, $id) !== 0) {
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "SELECT name, intro "
                . "FROM org "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $id);
            $stmt->bind_result($name, $intro);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows === 1) {
                while ($stmt->fetch()) {
                    $org = [
                        "name" => $name,
                        "intro" => $intro
                    ];
                }
                $db->close();
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["org"] = json_encode($org);
                exit(json_encode($result));
            } else {
                $result["status"] = 500;
                $result["message"] = "发生错误，无法查询机构信息";
                exit(json_encode($result));
            }
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
            exit(json_encode($result));
        }
        break;
}