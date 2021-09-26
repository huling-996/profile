/*----------头部js----------*/
var menuBody = document.querySelector(".menu_body");
var nav = document.querySelector(".nav");
menuBody.addEventListener("click", () => {
  menuBody.classList.toggle("active");
  nav.classList.toggle("shezhi");
})




/*----------轮播图全部js----------*/
var banerWidth = document.body.clientWidth;//根据不同的浏览器可见宽度设置相关容器宽度
var banerContainer = document.querySelector(".baner_container");//轮播图的总块
var baner1 = document.querySelectorAll(".baner1");//轮播图的子图片模块

// console.log(banerWidth);
//轮播图大小根据浏览器大小变化。
banerContainer.style.width = banerWidth * (baner1.length + 1) + "px";//加1是为了下面克隆添加节点留位置
for (let i = 0; i < baner1.length; i++) {
  let element = baner1[i];
  element.style.width = banerWidth + "px";
}



//轮播图按钮
let banerButtonLeft = document.getElementById("baner_button_left");
let banerButtonRight = document.getElementById("baner_button_right");
let banerContainerCopy = banerContainer.firstElementChild.cloneNode(true);//拷贝第一个轮播图组件
banerContainer.appendChild(banerContainerCopy);//添加到页面上
var index = 0;
//  设置函数节流锁
let lock = true;

//右点击
banerButtonRight.addEventListener('click', banerRightClick);
function banerRightClick() {
  // console.log("123");
  //判断锁的状态:是false就关闭直接结束函数
  if (!lock) { return };
  index++;
  if (index == baner1.length) {
    // alert("123");
    setTimeout(() => {
      banerContainer.style.transition = "none";
      index = 0;
      banerContainer.style.left = -banerWidth * index + "px";
    }, 2000);
  }
  banerContainer.style.transition = "left 2s"//将上面关掉的特效打开
  banerContainer.style.left = -banerWidth * index + "px";
  //关闭锁
  lock = false;
  //2s后打开锁
  setTimeout(() => {
    lock = true;
  }, 2000);
}

//左点击
banerButtonLeft.addEventListener('click', banerLeftClick);
function banerLeftClick() {
  if (!lock) { return };
  index--;
  if (index < 0) {
    //切换到轮播图最后的克隆图上
    index = baner1.length;
    banerContainer.style.transition = "none";
    banerContainer.style.left = -banerWidth * index + "px";
    //加的画移动到倒数地2张图上
    //设置延时器的目的是 可以让我们过渡瞬间取消然后加上
    setTimeout(() => {
      index = baner1.length - 1;
      banerContainer.style.transition = "left 2s"
      banerContainer.style.left = -banerWidth * index + "px";
    }, 0);
  } else {
    banerContainer.style.transition = "left 2s";
    banerContainer.style.left = -banerWidth * index + "px";
  }
  lock = false;
  setTimeout(() => {
    lock = true;
  }, 2000);
}

//轮播图自动轮播
let banerAutomatic = setInterval(() => {
  banerRightClick();
}, 4000);
//鼠标放上轮播图停止
let banerAll = document.querySelector(".baner");
banerAll.addEventListener('mouseenter', () => {
  clearInterval(banerAutomatic);
});
//鼠拿下开始
banerAll.addEventListener('mouseleave', () => {
  clearInterval(banerAutomatic);//先关闭在打开。防止bug
  banerAutomatic = setInterval(() => {
    banerRightClick();
  }, 6000);
});


let neirong = document.querySelectorAll(".neirong");//获取全部的轮播图内容区域
//获取进入轮播图的起始位置（x，y）
banerContainer.addEventListener("mouseenter", function (e) {
  this.x = e.clientX;
  this.y = e.clientY;
});
//鼠标再轮播图中移动时的效果
banerContainer.addEventListener("mousemove", function (e) {
  // console.log(this);
  this._x = e.clientX;
  this._y = e.clientY;
  let neirong_x = (this.x - this._x) / 10;
  let neirong_y = (this.y - this._y) / 10;
  for (let i = 0; i < neirong.length; i++) {
    let element = neirong[i];
    element.style.marginLeft = neirong_x + "px";
    element.style.marginTop = neirong_y + "px";

    // neirong[0].style.marginLeft = neirong_x + "px";
    // neirong[0].style.marginTop = neirong_y + "px";
    // neirong[1].style.marginLeft = neirong_x + "px";
    // neirong[1].style.marginTop = neirong_y + "px";
  }
});
//鼠标移出时将位置初始化
banerContainer.addEventListener("mouseleave", function (e) {
  for (let i = 0; i < neirong.length; i++) {
    let element = neirong[i];
    element.style.marginLeft = 0;
    element.style.marginTop = 0;
  }
});

/*----------WELCOME区域区域js---------- */
var welcomeRight = document.querySelector(".welcome_right");
var spanWelcome = welcomeRight.querySelector("span");
// console.log(spanWelcome);
welcomeRight.addEventListener("mouseenter", () => {
  spanWelcome.classList.add("span_welcome");
});
welcomeRight.addEventListener("mouseleave", () => {
  spanWelcome.classList.remove("span_welcome");
});

/*----------工作经验区域----------*/
var teamworkButton = document.querySelector(".teamwork_button");
var spanTeamwork = teamworkButton.querySelector("span");
teamworkButton.addEventListener("mouseenter", () => {
  spanTeamwork.classList.add("span_welcome");
});
teamworkButton.addEventListener("mouseleave", () => {
  spanTeamwork.classList.remove("span_welcome");
});

/*----------优秀作品区域----------*/
let outstandingDisplay = document.querySelector(".outstanding_display");
let chooserMain = document.querySelector(".chooser_main");
let chooserBlocklist = document.querySelectorAll(".chooser_blocklist");
let outDisplayWidth = outstandingDisplay.offsetWidth;/*获取元素宽 */
let chosBlistLength = chooserBlocklist.length;

chooserMain.style.width = outDisplayWidth * chosBlistLength + "px";/*设置元素宽是子元素的个数*子元素的宽 */
/*设置每个子元素的宽 */
for (let i = 0; i < chooserBlocklist.length; i++) {
  let element = chooserBlocklist[i];
  element.style.width = outDisplayWidth + "px";
}
/*分区标题的事件*/
let chooser = document.querySelector(".chooser");
let chooserSpan = chooser.querySelectorAll("span");
let choSpanLength = chooserSpan.length;
/*为每一个标题绑定移入事件 */
for (let i = 0; i < choSpanLength; i++) {
  let element = chooserSpan[i];
  element.addEventListener("mouseenter", () => {
    chooserMain.style.left = -i * outDisplayWidth + "px";//当鼠标移动到第i个标题元素时，分区着向左移动i个分区宽
    /*循环判断该给那个标题添加突出样式 */
    for (let j = 0; j < choSpanLength; j++) {
      if (j == i) {
        chooserSpan[j].classList.add("chooserhover");
      } else {
        chooserSpan[j].classList.remove("chooserhover");
      }
    }
  })
}

/*----------回到顶部----------*/
/*处理兼容问题函数：document.documentElement.scrollTop与document.body.scrollTop分别只能在ie与谷歌浏览器上显示高度*/
function getScroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  };
}
let backup = document.querySelector(".backup");
window.addEventListener('scroll', () => {
  /*在最前面返回顶端消失*/
  var backtop = getScroll().top;
  if (backtop > 10) {
    backup.style.display = "block";
    setTimeout(() => {
      backup.style.opacity = "1";
    }, 300);
  } else {
    backup.style.opacity = "0";
    backup.style.display = "none";
  }
});












/**--------浏览器窗口变化---------- */
window.onresize = function () {//轮播图根据浏览器窗口改变
  /*----------轮播图区域----------*/
  banerWidth = document.body.clientWidth;//重新获取页面宽度
  banerContainer.style.width = banerWidth * (baner1.length + 1) + "px";//重新设置
  for (let i = 0; i < baner1.length; i++) {
    let element = baner1[i];
    element.style.width = banerWidth + "px";
  }
  let banershanchu = document.querySelectorAll(".baner1");//重新获取轮播图
  banershanchu[banershanchu.length - 1].remove();//删除前面添加的轮播图最后的子模块
  let banerContainerCopy = banerContainer.firstElementChild.cloneNode(true);//再重新添加
  banerContainer.appendChild(banerContainerCopy);//添加到页面上
  banerContainer.style.left = 0;//轮播图重重设置第一个开始移动
  index = 0;//将移动个数重新设置


  /*----------优秀作品区域----------*/
  /*根据浏览器窗口重新设置元素宽 */
  let outDisplayWidthonsize = outstandingDisplay.offsetWidth;
  chooserMain.style.width = outDisplayWidthonsize * chosBlistLength + "px";
  for (let i = 0; i < chooserBlocklist.length; i++) {
    let element = chooserBlocklist[i];
    element.style.width = outDisplayWidthonsize + "px";
  }

  chooserMain.style.left = 0;/*当浏览器变化时，将分区重新设置为第一个 */
  /*重新加载事件，主要是因为浏览器窗口变化导致元素移动的距离也会发生变化*/
  for (let i = 0; i < choSpanLength; i++) {
    let element = chooserSpan[i];
    element.addEventListener("mouseenter", () => {
      // element.classList.add("chooserhover");
      chooserMain.style.left = -i * outDisplayWidthonsize + "px";
    })
  }
  /*同时将突出标签放回第一个元素 */
  for (let j = 0; j < choSpanLength; j++) {
    if (j == 0) {
      chooserSpan[j].classList.add("chooserhover");
    } else {
      chooserSpan[j].classList.remove("chooserhover");
    }
  }

}