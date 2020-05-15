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
        $pattern = "/^[a-zA-Z0-9_\-]{2,21}$/";
        echo $pattern;
//        var_dump(preg_match($pattern, $id));
        if (preg_match($pattern, $id) !== 0 && preg_match($pattern, $route) !== "" && $name !== "") {
            $this->name = $name;
            $this->id = $id;
            $this->route = $route;
        }
    }
}

session_start();

header("Access-Control-Allow-Origin", "*");

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
            print("IlleGal Value");
            exit;
        }
        if (isset($dev)) {
            @$db = new mysqli("localhost", "root", "916616515");
            if (mysqli_connect_errno()) {
                echo "数据库连接失败";
                exit;
            }
            $db->select_db("RealTimeBusQuery");
            $query = "INSERT INTO device "
                . "VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ssss", $name, $id, $route, $intro);
            $stmt->execute();
            /*@$db = mysqli_connect("localhost", "root", "916616515");
            if (mysqli_connect_errno()) {
                echo "Could not connect to database.";
                exit;
            }
            mysqli_select_db($db, "RealTimeBusQuery");
            $query = "INSERT INTO device"
                . "VALUES(?, ?, ?, ?)";
            mysqli_stmt_prepare($query);
            mysqli_stmt_bind_param("s", $name, $id, $route, $intro);
            mysqli_stmt_execute($query);*/
        } else {
            print("IlleGal Value");
            exit;
        }
        $db->close();
        break;
    case "PUT":
        if (isset($_POST["name"]) && isset($_POST["id"]) && isset($_POST["route"])
            && isset($_POST["intro"]) && isset($_POST["lng"]) && isset($_POST["lat"])) {
            $name = trim($_POST["name"]);
            $id = trim($_POST["id"]);
            $route = trim($_POST["route"]);
            $intro = trim($_POST["intro"]);
            $lng = trim($_POST["lng"]);  //经度
            $lat = trim($_POST["lat"]);  //纬度
            @$db = new mysqli("localhost", "root", "916616515");
            if (mysqli_connect_errno()) {
                exit("数据库连接失败");
            }
            $db->select_db("RealTimeBusQuery");
            $query = "UPDATE device(id, lng, lat) "
                . "SET (?, ?, ?) "
                . "WHERE id=?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sdds", $id, $lng, $lat, $id);
            $stmt->execute();
        }
}

echo "test";