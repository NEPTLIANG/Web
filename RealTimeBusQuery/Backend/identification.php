<?php
session_start();

header("Access-Control-Allow-Origin: *");

$pattern = "/[a-zA-Z0-9_-]{2,21}/";
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        $name   = trim($_POST['name']);
        $id     = trim($_POST['id']);
        $route  = trim($_POST['route']);
        $intro  = trim($_POST['intro']);
//        $intro  = $intro ? $intro : "暂无简介";
        if (!$name || !preg_match($pattern, $id)
            || !preg_match($pattern, $route)) {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
            exit(json_encode($result));
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
        if (mysqli_connect_errno()) {
            $result["status"] = 500;
            $result["message"] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "INSERT INTO identification(name, id, route, intro) VALUES(?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("ssss", $name, $id, $route, $intro);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $result["status"] = 200;
            $result["message"] = "标识点添加成功";
        } else {
            $result["status"] = 500;
            $result["message"] = "发生错误，标识点未添加";
        }
        $db->close();
        exit(json_encode($result));
        break;
    case "GET":
        $route = trim($_GET['route']);
        if (!preg_match($pattern, $route)) {
            $result['status'] = 400;
            $result['message'] = "不合法的值";
        }
        $db = new mysqli("127.0.0.1", "root", "amd,yes!");  //这里应该用本地ip而非localhost，否则报错
        if (mysqli_connect_errno()) {
            $result['status'] = 500;
            $result['message'] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "SELECT id, name, route, intro "
            . "FROM identification "
            . "WHERE route=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $route);
        $stmt->bind_result($id, $name, $route, $intro);
        $stmt->execute();
        $stmt->store_result();
        if (!$stmt->num_rows) {
            $result['status'] = 400;
            $result['message'] = "没有查询到标识点";
            exit(json_encode($result));
        }
        $identifications = [];
        while ($stmt->fetch()) {
            $identification = [
                "id"    => $id,
                "name"  => $name,
                "route" => $route,
                "intro" => $intro
            ];
            array_push($identifications, $identification);
        }
        $db->close();
        $result['status'] = 200;
        $result['describe'] = "OK";
        $result['identifications'] = $identifications;
        exit(json_encode($result));
        break;
}
