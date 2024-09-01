const data = [
    { index: 0, hash: 'yule', name: '娱乐', background: 'red' },
    { index: 1, hash: 'yinyue', name: '音乐', background: 'lightsalmon' },
    { index: 2, hash: 'wudao', name: '舞蹈', background: 'lightseagreen' },
    { index: 3, hash: 'shenghuo', name: '生活', background: 'blue' },
];
let zIndex = 0;

const init = data => {
    const contentElement = document.getElementById('content');
    const tabBox = document.getElementById('tabBox');
    let contentStr = '';
    let tabStr = '';
    data.forEach(i => {
        contentStr += `<div id="${i.hash}" style="background: ${i.background}">
        ${i.name}</div>`;
        tabStr += `<li><a href="#${i.hash}">${i.name}</a></li>`;
    });
    contentElement.innerHTML = contentStr;
    console.log({tabStr})
    tabBox.innerHTML = tabStr;
    
    const liList = tabBox.getElementsByTagName('li');

    const move = function (e) {
        // 阻止拖动的默认行为
        e.preventDefault();
        // 跟随光标
        this.style.top = e.pageY - this.y + this.top + 'px';
        // 动画效果
        for (let i = 0; i < liList.length; i++) {
            // 如果这个liList[i]就是this，就不用比较了
            if (liList[i] === this) { continue; }
            // 当前项
            const currentLi = liList[i];
            console.log(this.offsetTop, currentLi.offsetTop, this.i, currentLi.i);
            if (this.offsetTop > currentLi.offsetTop
                && this.i < currentLi.i
            ) {
                /* 如果当前项的 offsetTop 大于了 currentLi 的 offsetTop，
                    就让 currentLi 把自己的位置让出来 */
                currentLi.style.marginTop = -currentLi.offsetHeight + 'px';
            }
            if (this.offsetTop < currentLi.offsetTop
                && this.i < currentLi.i
            ) {     //还原
                currentLi.style.marginTop = 0 + 'px';
            }
            if (this.offsetTop < currentLi.offsetTop
                && this.i > currentLi.i
            ) {     //下面的目录项往上移时的变化
                currentLi.style.marginTop = currentLi.offsetHeight + 'px';
            }
            if (this.offsetTop > currentLi.offsetTop
                && this.i > currentLi.i
            ) {     //还原
                currentLi.style.marginTop = 0 + 'px';
            }
            console.log(currentLi.style.marginTop);
        }
    }

    // 倒着是因为有样式问题，因为定位会脱离文档流
    for (let i = liList.length - 1; i >= 0; i--) {
        // console.log(liList[i].offsetTop, liList[i].offsetLeft, liList[i].offsetParent)
        liList[i].style.top = liList[i].offsetTop + 'px';
        liList[i].style.position = 'absolute';
        liList[i].i = data[i].index;
        
        liList[i].onmousedown = function (e) {
            this.y = e.pageY;
            this.top = Number.parseFloat(this.style.top);
            
            // 永远保持被拖动的盒子在最上层
            this.style.zIndex = ++zIndex;
            // 用事件委托绑定鼠标移动事件
            document.onmousemove = move.bind(this);
        }
        
        
        window.ondragstart = e => {     //须阻止页面触发 drag 相关事件，否则后面的 mouseup 不触发
            e.preventDefault();
            e.stopPropagation();
        };
        liList[i].onmouseup = function () {
            // 清除document上的移动事件
            document.onmousemove = null;
            
            for (let i = 0; i < liList.length; i++) {
                // 要把当前的 li 和被拖动的 li 的距离存起来
                liList[i].distance = Math.abs(this.offsetTop - liList[i].offsetTop);
            }
            
            // 根据distance排序
            let ary = [...liList].sort((a, b) => a.distance - b.distance);
            console.log(ary.map(i => i.style.marginTop));
            // 找出 ary 里 marginTop 不是 0px 的 li
            let close = ary.find(i => i.style.marginTop     //排除掉自己（未设置 marginTop 故为空）
                && i.style.marginTop !== '0px'
            );
            if (!close) {   //若顺序没有改变，则复位
                return this.style.top = this.top + 'px';
            }
            
            // 取到当前被拖动的 li
            let current = data.splice(this.i, 1)[0];
            data.splice(close.i, 0, current);
            
            data.forEach((item, index) => {
                item.index = index
            })
            
            init(data);
        }
    }
};

init(data);