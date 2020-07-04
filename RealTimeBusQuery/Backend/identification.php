<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");

$pattern = "/[a-zA-Z0-9_-]{2,21}/";
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":
        $name   = trim($_POST['name']);
        $id     = trim($_POST['id']);
        $route  = trim($_POST['route']);
        $lng    = doubleval(trim($_POST['lng']));
        $lat    = doubleval(trim($_POST['lat']));
        $intro  = trim($_POST['intro']);
        //$intro  = $intro ? $intro : "暂无简介";
        if (strlen($name) > 20 || !preg_match($pattern, $id) || !preg_match($pattern, $route)
            || $lng < 0 || $lng > 180 || $lat < 0 || $lat >180 || strlen($intro) > 128) {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
        if (mysqli_connect_errno()) {
            $result["status"] = 500;
            $result["message"] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "INSERT INTO identification(name, id, route, lng, lat, intro) "
            . "VALUES(?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("ssssss", $name, $id, $route, $lng, $lat, $intro);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $result["status"] = 200;
            $result["describe"] = "OK";
        } else {
            $result["status"] = 500;
            $result["message"] = "发生错误，标识点未添加";
        }
        $db->close();
        exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        break;
    case "GET":
        $route = trim($_GET['route']);
        if (!preg_match($pattern, $route)) {
            $result['status'] = 400;
            $result['message'] = "不合法的值";
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");  //这里应该用本地ip而非localhost，否则报错
        if (mysqli_connect_errno()) {
            $result['status'] = 500;
            $result['message'] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "SELECT id, name, route, lng, lat, intro "
            . "FROM identification "
            . "WHERE route=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $route);
        $stmt->bind_result($id, $name, $route, $lng, $lat, $intro);
        $stmt->execute();
        $stmt->store_result();
        if (!$stmt->num_rows) {
            $result['status'] = 400;
            $result['message'] = "没有查询到标识点";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        $identifications = [];
        while ($stmt->fetch()) {
            $identification = [
                "id"    => $id,
                "name"  => $name,
                "route" => $route,
                "lng" => $lng,
                "lat" => $lat,
                "intro" => $intro
            ];
            array_push($identifications, $identification);
        }
        $db->close();
        $result['status'] = 200;
        $result['describe'] = "OK";
        $result['identifications'] = $identifications;
        exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        break;
    case "PUT":
        parse_str(file_get_contents('php://input'), $data);
        $id     = trim($data['id']);
        $name   = trim($data['name']);
        $route  = trim($data['route']);
        $lng    = doubleval(trim($_POST['lng']));
        $lat    = doubleval(trim($_POST['lat']));
        $intro  = trim($data['intro']);
//        $intro = $intro ? $intro : "暂无简介";
        if (strlen($name) > 20 || !preg_match($pattern, $id) || !preg_match($pattern, $route)
            || $lng < 0 || $lng > 180 || $lat < 0 || $lat >180 || strlen($intro) > 128) {
            $result['status'] = "400";
            $result['message'] = "不合法的值";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
        if (mysqli_connect_errno()) {
            $result['status'] = 500;
            $result['message'] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "UPDATE identification "
            . "SET id=?, name=?, route=?, lng=?, lat=?, intro=? "
            . "WHERE id=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("ssssss", $id, $name, $route, $lng, $lat, $intro, $id);
        $stmt->execute();
        if (!$stmt->affected_rows) {
            $result['status'] = 500;
            $result['message'] = "发生错误，标识点信息未修改";
        } else {
            $result['status'] = 200;
            $result['describe'] = "OK";
        }
        $db->close();
        exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        break;
    case "DELETE":
        parse_str(file_get_contents("php://input"), $data);
        $id = trim($data['id']);
        if (!preg_match($pattern, $id)) {
            $result['status'] = 400;
            $result['message'] = "不合法的值";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        @$db = new mysqli("127.0.0.1", "root", "amd,yes!");
        if (mysqli_connect_errno()) {
            $result['status'] = 500;
            $result['message'] = "无法连接到数据库，请稍后重试";
            exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        }
        $db->select_db("RealTimeBusQuery");
        $query = "DELETE FROM identification "
            . "WHERE id=?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        if ($stmt->affected_rows) {
            $result['status'] = 200;
            $result['describe'] = "OK";
        } else {
            $result['status'] = 500;
            $result['message'] = "发生错误，标识点未删除";
        }
        $db->close();
        exit(json_encode($result, JSON_UNESCAPED_UNICODE));
        break;
}
