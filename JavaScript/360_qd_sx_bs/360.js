/*--------------------------------------------------

                      记得gets

----------------------------------------------------
360前端实习笔试第1题，时间超限
Test case:
4 2
1 3 2 4
 */
function Human(level) {
    this.level = level;
    this.win = 0;
}

(function () {
    var a = "10 10";
    var levels = "1 3 2 4 5 8 6 9 7 0".split(" ");


    // var a = read_line();
    // var levels = read_line().split(" ");
    var num = parseInt(a.split(" ")[0]);
    var require = parseInt(a.split(" ")[1]);
    var humans = [];
    for (var j = 0; j < num; j++) {
        humans.push(new Human(parseInt(levels[j])));
    }
// var i = 0;
    var result = 0;
    while (humans[0].win < require && humans[0].win < num) {
        if (humans[0].level > humans[1].level) {
            humans[0].win++;
            humans[1].win = 0;
            humans.push(humans.splice(1, 1)[0]);
        } else {
            humans[1].win++;
            humans[0].win = 0;
            humans.push(humans.splice(0, 1)[0]);
        }
        result++;
        // i++;
    }
// print(result);


    console.log(result);
})();