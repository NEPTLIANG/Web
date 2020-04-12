onload = (function () {  //要等待页面加载完成，应设置window.onload而非document.onload
    //实验3-1、将exercise中页面添加总分列，将平均成绩高于85分的男同学用不同背景标注
    var newTh = document.createElement("th");
    newTh.innerText = "总分";  //设置innerText要和createElement分开；innerText是属性而非方法
    document.querySelector("#dataTable thead tr").appendChild(newTh);  //就算HTML中thead里没有tr，DOM中也会有
    var trs = document.querySelectorAll("#dataTable tbody tr");  //别忘了All
    for (var indexOfTr in trs) {  //别忘了遍历数组时遍历的是索引
        var child = trs[indexOfTr].childNodes;  //childNodes是属性而非方法
        var sum = parseInt(child[9].innerText) + parseInt(child[11].innerText) + parseInt(child[13].innerText);  //td节点前还有“#text”节点
        var sumElm = document.createElement("td");
        sumElm.innerText = sum;
        trs[indexOfTr].appendChild(sumElm);
        if (child[15].innerText>=85 && child[5].innerText=="男") {
            trs[indexOfTr].style.backgroundColor = "#00dfff";
        }
    }
});