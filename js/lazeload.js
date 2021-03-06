/**
 * Created by godnew on 2016/8/19.
 * 图片懒加载
 */
(function(){
    //整个插件放入自执行函数中，避免变量全局污染
    function LazyLoad(){}

    //存放需要懒加载的img元素，及其数量
    var imgs=[],
        count=0;

    LazyLoad.prototype={
        constructor : LazyLoad,
        init: function(){
            this.getImages();//获取需要懒加载的img存入imgs中
            this.lazy();//执行一次懒加载检测
            this.loading();//当事件触发时执行懒加载检测
        },
        //储存懒加载图片
        getImages:function(){
            var ele = document.getElementsByTagName('img');
            for (var i = 0, len = ele.length; i < len; i++) {
                //判断img是否有lazy标志
                if (typeof (ele[i].getAttribute("lazy"))) {
                    imgs.push(ele[i]);
                    count++;
                }
            }
        },
        lazy: function () {
            if (!count) return;//没图片了就不往下执行了
            var innerHeight = this.getPosition.Viewport();//屏幕高
            for (var i = 0, len = imgs.length; i < len; i++) {
                var t_index = this.getPosition.ElementViewTop(imgs[i]); //得到图片相对窗口的顶部距离
                if (t_index  < innerHeight) {//判断图片是否出现在屏幕中
                    imgs[i].src = imgs[i].getAttribute("lazy");//加载图片
                    delete imgs[i];//从保存的数组中删除已加载的图片
                    count--;//数量减一
                }
            }
        },
        loading: function () {
            //当滚动时则判断图片是否要加载
            window.onscroll = window.onload = window.onload = function () {
                setTimeout(function () {
                    LazyLoad.prototype.lazy();
                }, 1000)
            }
        },
        getPosition:{
            /*该方法可获取3个高度*/
            /*
             1.获取窗口的高度
             2.获取当前元素相对于窗口的顶部的距离
             3.滚动卷去的高度
             */
            Viewport: function () {
                //获取可视区域的高度
                if (document.compatMode == "BackCompat") {//兼容性检测 IE和谷歌支持
                    var Height = document.body.clientHeight;
                } else {
                    var Height = document.documentElement.clientHeight;
                }
                return Height;
            },
            ElementViewTop: function (ele) {
                //获取元素距离最窗口顶部的距离
                if (ele) {
                    var actualTop = ele.offsetTop;//距父元素高度
                    var current = ele.offsetParent;//父元素
                    while (current !== null) {
                        //获取到document顶部的距离
                        actualTop += current.offsetTop;
                        current = current.offsetParent;
                    }
                    return actualTop - this.ScrollTop();
                }
            },
            ScrollTop: function () {
                //获取卷去的高度
                if (document.compatMode == "BackCompat") {
                    var elementScrollTop = document.body.scrollTop;
                } else {
                    var elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop:document.documentElement.scrollTop;
                }
                return elementScrollTop;
            }
        }
    };
    window.LazyLoad=LazyLoad;//将lazyload暴露给window
})();