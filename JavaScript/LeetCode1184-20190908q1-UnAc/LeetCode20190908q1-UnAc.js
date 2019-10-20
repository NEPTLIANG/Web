/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {  //参数：距离数组，出发点，目的地
    //没写注释是真滴8行，一个月过去了简直看天书
    var tmpStart, tmpDestination, clockwiseDistance, anticlockwiseDistance; //出发点（临时），目的地（临时），顺时针总距离，逆时针总距离
    var clockwiseResult = [], anticlockwideResult = [], result = [], tmpDistance;  //顺时针结果表（行为起点，列为终点），逆时针结果表，最终结果表
    var site, sumOfDistance = 0;  //站点下标，圈总路程
    for (site = 0; site < distance.length; site++) {  //求圈总路程
        sumOfDistance += distance[site];
    }
    //先考虑顺时针
    clockwiseResult.push([]);  //给结果表插入第一行
    clockwiseResult[0].push(0);  //0站到0站的距离为0
    tmpDistance = sumOfDistance;
    for (tmpStart = 1; tmpStart < distance.length; tmpStart++) {  //先计算终点为0的情况，从上往下给结果表第一列赋值
        clockwiseResult.push([]);  //给结果表插入新行
        tmpDistance -= distance[tmpStart - 1];  //当前站到站0的距离=前一站到站0的距离-前一站到当前站的距离
        clockwiseResult[tmpStart].push(sumOfDistance)  //给该行插入第一个值
    }
    /*for (tmpDestination = 1; tmpDestination < distance.length; tmpDestination++) {  //先计算出发点为0的情况，给结果表第一行赋值
        tmpDistance += distance[tmpDestination - 1];  //总距离=前一站的总距离+当前站与前一站的距离
        result[0].push(tmpDistance);
    }*/
    /*for (i = 0; i < distance.length; i++) {
        tmp = 0;
        tmp += distance[i];
        result[1].push(tmp);
    }*/
    //后考虑逆时针
    anticlockwiseDistance.push([]);
    anticlockwiseDistance[0].push(0);
    tmpDistance = 0;
    for (tmpStart = 0; tmpStart < distance.length - 1; tmpStart++) {  //先计算终点为最后一站的情况，从上往下给结果表最后一列赋值
        anticlockwideResult.push([]);  //给结果表插入新行
        tmpDistance += distance[(tmpStart + 4 - 1) % 4];  //当前站到最后一站的距离=下一站到最后一站的距离+下一站到当前站的距离
        anticlockwideResult[tmpStart].push(tmpDistance);  //给该行插入最后一个值
    }
    //打表
    for (tmpStart = 0; tmpStart < distance.length; tmpStart++) {
        // result[tmpStart].push(0);  //
        for (tmpDestination = 1; tmpDestination < distance.length; tmpDestination++) {  //计算顺时针行驶时的情况
            clockwiseResult[tmpStart].push(result[tmpStart][tmpDestination - 1] + distance[tmpDestination - 1]);  //出发点到目的地的距离=出发点到目的地前一站的距离+目的地前一站到目的地的距离
            // clockwiseDistance = result[tmpStart][tmpDestination - 1] + distance[tmpDestination - 1];
            // anticlockwiseDistance = result[tmpStart][tmpDestination + 1] + distance[tmpDestination];
            // result[tmpStart][tmpDestination] = clockwiseDistance < anticlockwiseDistance ? clockwiseDistance : anticlockwiseDistance;
        }
        for (tmpDestination = distance.length - 1; tmpDestination >= 0; tmpDestination++) {  //计算逆时针行驶时的情况
            anticlockwiseDistance = result[tmpStart][(tmpDestination + 1) % distance.length] + distance[tmpDestination];  //出发点到目的地的距离=出发点到目的地前一站的距离+目的地到目的地前一站的距离
            result[tmpStart][tmpDestination] = result[tmpStart][tmpDestination] < anticlockwiseDistance ? result[tmpStart][tmpDestination] : anticlockwiseDistance;  //取顺时针和逆时针行驶的总距离中小的那一个
        }
        /*for (st = 2; st <= distance.length; st++) {
            result.push([]);
            for (des = 2; des <= distance.length; des++) {
                clockwise = result[st][des - 1] + distance[des - 1];
                anticlockwise = result[st][des + 1] + distance[des];
                result[st][des] = clockwise < anticlockwise ? clockwise : anticlockwise;
            }
        }*/
    }
    return result[start][destination];
};

var distance, start, destination;
eval("distance = [1,2,3,4], start = 0, destination = 1");
console.write(distanceBetweenBusStops(distance, start, destination));
