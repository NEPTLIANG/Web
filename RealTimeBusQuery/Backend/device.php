<?php

class Device
{
    private $name;      //设备名
    private $id;        //id
    private $route;     //属于哪条路线
    private $lng;       //经度
    private $lat;       //纬度
    private $intro;     //说明

    function __get($name)
    {
        return $this->$name;
    }

    function __set($name, $value)
    {
        switch ($name) {
            case "id":
                $pattern = "[a-zA-Z0-9_-]{2,21}";
                echo "1";
                var_dump(preg_grep($pattern, $value));
                if (preg_match($pattern, $value)) {
                    $this->id = $value;
                }
                break;
            case "lng":
            case "lat":
                $lng = substr($value, 0, strlen($value) - 1);
                if ($lng >= 0 && $lng <= 180) {
                    $this->lng = $value;
                }
                break;
        }
    }

    function __construct($name, $id, $route)
    {
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        //echo $id;
        //var_dump(preg_match($pattern, $route));
        if (preg_match($pattern, $id) !== 0 && preg_match($pattern, $route) !== 0 && $name !== "") {
            $this->name = $name;
            $this->id = $id;
            $this->route = $route;
        }
    }
}

session_start();

header("Access-Control-Allow-Origin: *");

switch ($_SERVER['REQUEST_METHOD']) {
    case "POST" :
        $name = trim($_POST['name']);
        $id = trim($_POST['id']);
        $route = trim($_POST['route']);
        $intro = trim($_POST['intro']);
        $intro = isset($intro) ? $intro : "暂无说明";
        if (isset($name) && isset($id) && isset($route)) {
            $dev = new Device($name, $id, $route);
            var_dump($dev);
        } else {
            $result["status"] = 400;
            $result["message"] = "不合法的值";
            exit(json_encode($result));
        }
        if (isset($dev)) {
            //var_dump(isset($dev));
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                $result["status"] = 500;
                $result["message"] = "无法连接到数据库，请稍后重试";
                exit(json_encode($result));
            }
            $db->select_db("RealTimeBusQuery");
            $query = "INSERT INTO device VALUES (?, ?, ?, 0, 0, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ssss", $id, $name, $route, $intro);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["message"] = "设备添加成功";
            } else {
                echo "发生错误，设备未添加";
            }
            /*@$db = mysqli_connect("localhost", "root", "916616515");
            if (mysqli_connect_errno()) {
                echo "无法连接到数据库";
                exit;
            }
            mysqli_select_db($db, "RealTimeBusQuery");
            $query = "INSERT INTO device"
                . "VALUES(?, ?, ?, ?)";
            mysqli_stmt_prepare($query);
            mysqli_stmt_bind_param("s", $name, $id, $route, $intro);
            mysqli_stmt_execute($query);*/
        } else {
            print("不合法的值");
            exit;
        }
        $db->close();
        break;
    case "PUT":
        //if (isset($_POST["name"]) && isset($_POST["id"]) && isset($_POST["route"])
        //&& isset($_POST["intro"]) && isset($_POST["lng"]) && isset($_POST["lat"])) {
        /*$name = trim($_POST["name"]);
        $id = trim($_POST["id"]);
        $route = trim($_POST["route"]);
        $intro = trim($_POST["intro"]);
        $lng = doubleval(trim($_REQUEST["lng"]));  //经度
        $lat = doubleval(trim($_POST["lat"]));  //纬度 */
        //var_dump($_REQUEST);
        parse_str(file_get_contents('php://input'), $data);
        $id = trim($data["id"]);
        $lng = doubleval(trim($data["lng"]));  //经度
        $lat = doubleval(trim($data["lat"]));  //纬度
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        if (preg_match($pattern, $id) !== 0
            && ($lng >= 0 && $lng <= 180) && ($lat >= 0 && $lat <= 90)) {
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "UPDATE device "
                . "SET id=?, lng=?, lat=? "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sdds", $id, $lng, $lat, $id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo $lng . "," . $lat . "\n";
                echo "定位上传成功";
            } else {
                echo "发生错误，定位未上传";
            }
        } else {
            print("不合法的值");
            exit;
        }
        $db->close();
        break;
    //}
    case "GET":
        //header("Access-Control-Allow-Origin", "*");
        $route = trim($_GET["route"]);
        $pattern = "/^[a-zA-Z0-9_\-]{1,20}$/";
        if (preg_match($pattern, $route) !== 0) {
            @$db = new mysqli("127.0.0.1", "root", "3q3nw,2z1ch.");
            if (mysqli_connect_errno()) {
                exit("无法连接到数据库，请稍后重试");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "SELECT id, name, intro, lng, lat "
                . "FROM device "
                . "WHERE route=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $route);
            $stmt->bind_result($id, $name, $intro, $lng, $lat);
            $stmt->execute();
            $stmt->store_result();
            //var_dump($stmt->num_rows);
            if ($stmt->num_rows > 0) {
                $devices = [];
                while ($stmt->fetch()) {
                    $device = [
                        "id" => $id,
                        "name" => $name,
                        "intro" => $intro,
                        "lng" => $lng,
                        "lat" => $lat
                    ];
                    array_push($devices, json_encode($device));
                }
                //var_dump($devices);
                $db->close();
                $result["status"] = 200;
                $result["describe"] = "OK";
                $result["devices"] = $devices;
                exit(json_encode($result));
            } else {
                $result["status"] = 500;
                $result["describe"] = "发生错误，无法查询定位";
                exit(json_encode($result));
            }
        } else {
            print("不合法的值");
            exit;
        }
        break;
}

//echo "test";
