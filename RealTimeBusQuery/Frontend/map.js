var map = new AMap.Map('container', {
    // zoom:15.75,//缩放级别
    center: [110.349556, 21.269520],//中心点坐标
    viewMode:'3D',//使用3D视图
    mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
});
AMap.plugin('AMap.ToolBar',function(){//异步加载插件
    var toolbar = new AMap.ToolBar();
    map.addControl(toolbar);
});
// map.setFeatures(['bg','road','point','building']); // 多个种类要素显示
map.setFeatures(['bg','road']);

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
map.add(marker3);
var car1 = new AMap.Marker({
    position: new AMap.LngLat(110.345556, 21.265520),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '校车1'
});
map.add(car1);
map.add(marker1);
map.add(marker2);
car1.setPosition(new AMap.LngLat(110.351556, 21.273520));

// 自动适配到合适视野范围
// 无参数，默认包括所有覆盖物的情况
// map.setFitView();
// 传入覆盖物数组，仅包括polyline和marker1的情况
map.setFitView([marker2,marker1]);

var url = "http://122.51.3.35/test.php"
setInterval(() => {
    if (typeof XMLHttpRequest != "undefined") {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status>=200 && xhr.status<300) || xhr.status==304) {
                    var response = JSON.parse(xhr.responseText);
                    car1.setPosition(new AMap.LngLat(response.lng, response.lat));
                    console.log(xhr.responseText);
                } else {
                    alert("请求失败：" + xhr.status);
                }
            }
        }
        xhr.open("GET", url, false);
        xhr.send(null);
    }
}, 10000);
