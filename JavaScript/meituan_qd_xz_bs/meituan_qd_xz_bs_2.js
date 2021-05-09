/*
 * @Author: NeptLiang
 * @Date: 2021-05-09 11:43:56
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-05-09 13:40:41
 * @Description: unAc
 */

/*
1111
2222
3333
4444
5555
 */

/**
 * 求从点(1,1)到点(n,m)的最短路径
 * @param {Number} n n行
 * @param {Number} m m列
 * @param {Number} k k个节点
 * @param {Array} routes 路径信息
 */
let getShortestRoute = (n, m, k, routes) => {
    let lengths = [];
    routes.forEach(([xi, yi, ui, vi, wi]) => {
        lengths[xi, yi] = [];
        lengths[xi, yi].push({ ui, vi, wi });
    })
    console.log(lengths)
};

let [n, m, k] = [5, 4, 3];
let routes = [
    [1, 1, 2, 2, 1], //[路径起点x坐标xi, 路径起点y坐标yi, 路径终点x坐标ui, 路径终点y坐标vi, 路径长度wi]
    [1, 1, 5, 4, 4],
    [2, 2, 5, 4, 1]
];
console.log(getShortestRoute(n, m, k, routes));