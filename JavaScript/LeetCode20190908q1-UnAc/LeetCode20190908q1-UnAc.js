/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
    //第153场力扣周赛第1题——1184. 公交站间的距离——UnAc
    var tmp, st, des, clockwise, anticlockwise, result = [];
    result.push([]);
    result.push([]);
    for (var i = 1; i <= distance.length; i++) {
        tmp = 0;
        tmp += distance[i];
        result[1].push(tmp);
    }
    for (var st = 2; st <= distance.length; st++) {
        result.push([]);
        for (var des = 2; des <= distance.length; des++) {
            clockwise = result[st][des - 1] + distance[des - 1];
            anticlockwise = result[st][des + 1] + distance[des];
            result[st][des] = clockwise < anticlockwise ? clockwise : anticlockwise;
        }
    }
    return result[start][destination];
};

//var distance, start, destination;
eval("var distance = [1,2,3,4], start = 0, destination = 1");
console.write(distanceBetweenBusStops(distance, start, destination));
