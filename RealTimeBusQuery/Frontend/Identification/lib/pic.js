AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
    var map = new AMap.Map('container', {
        center: [113.264499, 23.130058],//中心点坐标
        zoom: 8,
        scrollWheel: true
    })
    var positionPicker = new PositionPicker({
        mode: 'dragMap',
        map: map
    });

    positionPicker.on('success', function(positionResult) {
        console.log(document.getElementById('lnglat'));
        document.getElementById('lnglat').value = positionResult.position;
        document.getElementById('position').value = positionResult.address;
        // document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
        // document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
        // document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
    });
    positionPicker.on('fail', function(positionResult) {
        document.getElementById('lnglat').innerHTML = ' ';
        document.getElementById('position').innerHTML = ' ';
        // document.getElementById('nearestJunction').innerHTML = ' ';
        // document.getElementById('nearestRoad').innerHTML = ' ';
        // document.getElementById('nearestPOI').innerHTML = ' ';
    });
    var onModeChange = function(e) {
        positionPicker.setMode(e.target.value)
    }
    var startButton = document.getElementById('start');
    var stopButton = document.getElementById('stop');
    var dragMapMode = document.getElementsByName('mode')[0];
    var dragMarkerMode = document.getElementsByName('mode')[1];
    // startButton.addEventListener('click', function() {
    positionPicker.start(map.getBounds().getSouthWest())
    // })
    // stopButton.addEventListener('click', function() {
    //     positionPicker.stop();
    // })
    // dragMapMode.addEventListener('change', onModeChange)
    // dragMarkerMode.addEventListener('change', onModeChange);
    positionPicker.start();
    map.panBy(0, 1);

    map.addControl(new AMap.ToolBar({
        liteStyle: true
    }))
});