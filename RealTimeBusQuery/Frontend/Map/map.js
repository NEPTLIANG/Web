var map = new AMap.Map('container', {
    zoom: 13,//缩放级别
    center: [111.791588, 22.17042],//中心点坐标
    viewMode: '3D',//使用3D视图
    mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
});
AMap.plugin('AMap.ToolBar', function () {//异步加载插件
    var toolbar = new AMap.ToolBar();
    map.addControl(toolbar);
});
// map.setFeatures(['bg','road','point','building']); // 多个种类要素显示
map.setFeatures(['bg', 'road']);

// 创建一条折线覆盖物
/* var path = [
    new AMap.LngLat("116.368904","39.913423"),
    new AMap.LngLat("116.382122","39.901176"),
    new AMap.LngLat("116.387271","39.912501"),
    new AMap.LngLat("116.398258","39.904600")
];
var polyline = new AMap.Polyline({
    path: path,  
    borderWeight: 2, // 线条宽度，默认为 1
    strokeColor: 'red', // 线条颜色
    lineJoin: 'round' // 折线拐点连接处样式
});
map.add(polyline); */

// 创建两个点标记
var marker1 = new AMap.Marker({
    position: new AMap.LngLat(110.352556, 21.274520),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '北2门'
});
var marker2 = new AMap.Marker({
    position: new AMap.LngLat(110.344556, 21.264520),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '南门'
});
var marker3 = new AMap.Marker({
    position: new AMap.LngLat(110.347556, 21.269520),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '综合实验楼A'
});
// map.add(marker3);
var car1 = new AMap.Marker({
    position: new AMap.LngLat(110.345556, 21.265520),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '校车1'
});
// map.add(car1);
map.add(marker1);
map.add(marker2);
car1.setPosition(new AMap.LngLat(110.351556, 21.273520));

//自定义点标记
// var content = '<div>'
//     + '<div style="border-radius: 8px 8px 8px 0px;background-color: rgba(255,255,255,0.5); padding: 8px 16px;margin: 0 0 -1px 8px;width:max-content;color: #77f">'
//             + device.name + '</div>'
//     + '<img src="../Map/img/3.png" style="width: 16px; height: 16px;margin-left: 8px;"/>'
//     + '<div style="width:16px; height:16px; border-radius:16px; background-color: #77f; box-shadow: 0 0 8px rgba(127,127,255,0.5);"></div>'
//     + '</div>';
// var marker = new AMap.Marker({
//     content: content,  // 自定义点标记覆盖物内容
//     position:  [116.397428, 39.90923], // 基点位置
//     offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
// });
// map.add(marker);

var id = location.search.split("=")[1]
var route = ""
var url = `http://122.51.3.35/user.php?id=${id}`;  //获取标识点
if (typeof XMLHttpRequest != "undefined") {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                console.log(xhr.responseText)
                var response = JSON.parse(xhr.responseText);
                if (response.status === 200 && response.routes.length >= 1) {
                    route = response.routes;
                } else if (response.status === 200 && response.routes.length === 0) {
                    alert("没有查询到路线");
                } else {
                    alert("发生错误：" + response.describe);
                }
            } else {
                alert("请求失败：" + xhr.status);
            }
        }
    };
    xhr.open("GET", url, false);
    xhr.send(null);
}

var point = [];
var cars = {};
// 自动适配到合适视野范围
// 无参数，默认包括所有覆盖物的情况
// map.setFitView();
// 传入覆盖物数组，仅包括polyline和marker1的情况
// map.setFitView(point);

var url = `http://122.51.3.35/identification.php?route=${route}`;  //获取标识点
if (typeof XMLHttpRequest != "undefined") {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === 200 && response.identifications.length >= 1) {
                    for (var index = 0; index < response.identifications.length; index++) {
                        var identification = response.identifications[index];
                        // var id = device.id
                        if (point[identification.id] === undefined) {
                            var content = '<div>'
                                + '<div style="border-radius: 8px 8px 8px 0px;background-color: rgba(255,255,255,0.5); padding: 8px 16px;margin: 0 0 -1px 8px;width:max-content;color: #77f">'
                                + identification.name + '</div>'
                                + '<img src="../Map/img/3.png" style="width: 16px; height: 16px;margin-left: 8px;"/>'
                                + '<div style="width:16px; height:16px; border-radius:16px; background-color: #77f; box-shadow: 0 0 8px rgba(127,127,255,0.5);"></div>'
                                + '</div>';
                            var pointOfidentification = new AMap.Marker({
                                content: content,  // 自定义点标记覆盖物内容
                                position: new AMap.LngLat(identification.lng, identification.lat),
                                title: identification.name,
                                offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
                            });
                            point.push(pointOfidentification);
                            // point[identification.id] = pointOfidentification;
                            map.add(pointOfidentification);
                        } else {
                            point[identification.id].setPosition(new AMap.LngLat(identification.lng, identification.lat));
                        }
                        // map.setFitView(point);
                    }
                } else if (response.status === 200 && response.devices.length === 0) {
                    alert("未添加设备");
                } else {
                    alert("发生错误：" + response.describe);
                }
                // car1.setPosition(new AMap.LngLat(response.lng, response.lat));
            } else {
                alert("请求失败：" + xhr.status);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}
map.setFitView(point);
console.log(point)


var url = `http://122.51.3.35/device.php?route=${route}`;  //获取车辆
setInterval(() => {
    if (typeof XMLHttpRequest != "undefined") {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.status === 200 && response.devices.length >= 1) {
                        for (var index = 0; index < response.devices.length; index++) {
                            var device = JSON.parse(response.devices[index]);
                            // var id = device.id
                            if (cars[device.id] === undefined) {
                                var content = '<div>'
                                    + '<div style="border-radius: 8px 8px 8px 0px;background-color: rgba(255,255,255,0.5); padding: 8px 16px;margin: 0 0 -1px 8px;width:max-content;color: #77f">'
                                    + device.name + '</div>'
                                    + '<img src="../Map/img/3.png" style="width: 16px; height: 16px;margin-left: 8px;"/>'
                                    + '<div style="width:16px; height:16px; border-radius:16px; background-color: #77f; box-shadow: 0 0 8px rgba(127,127,255,0.5);"></div>'
                                    + '</div>';
                                var car = new AMap.Marker({
                                    content: content,  // 自定义点标记覆盖物内容
                                    position: new AMap.LngLat(device.lng, device.lat),
                                    title: device.name,
                                    offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
                                });
                                point.push(car);
                                cars[device.id] = car;
                                map.add(car);
                            } else {
                                cars[device.id].setPosition(new AMap.LngLat(device.lng, device.lat));
                            }
                            map.setFitView(point);
                        }
                    } else if (response.status === 200 && response.devices.length === 0) {
                        alert("未添加设备");
                    } else {
                        alert("发生错误：" + response.describe);
                    }
                    // car1.setPosition(new AMap.LngLat(response.lng, response.lat));
                } else {
                    alert("请求失败：" + xhr.status);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    }
}, 5000);