# imgLazyLoading
#图片懒加载及图片预加载
在现在绝大部分网站，尤其是一些图片比较多的网站上，为了增加用户的体验网站在加载图片的时候都使用了图片懒加载或图片预加载，两种技术的
本质是完全相反的，一个是迟缓的加载（可能不加载），另一个是是通过提前加载实现的，两者的具体实现的技术并不复杂，下面分别对其分别说明。
##图片懒加载
也叫延迟加载，对网站中出现的图片延迟加载或符合某种条件时才加载某些图片。根据不同的情况的实现的方式也有几种，大致上可分为以下的三种：

1. 使用定时器对图片进行延时加载（纯粹的延时加载，使用情况不多）
2. 当符合某些条件，或者触发了某些事件时开始异步的加载图片
3. 可视区域的延时加载，其实就是对第二条的延伸，即加载图片的条件是在可视区域中，这个实现主要是监听页面的滚动实现的，一般设置是页面滚
动到该图片的头部时开始加载图片（该方式是是大部分网站使用的懒加载），所以趁热打铁，自己手动写一下该方式的图片懒加载。

首先，简单的讲一下其实现的过程：当访问网站的时候，先把页面的上所有的img元素或是背景图片路径替换成loading图片地址，这样就只需请求一
次，等到页面滚动到一定区，用实际存放img地址的laze-load属性的值去替换src属性，这就可实现根据滚动的图片懒加载。**这里提醒大家一点，也
算是一个知识点（雅虎军规中的一条），不要设置空src，就算是src为空，浏览器也会对服务器发送请求。所以平时项目中，尽量不要有空src的script
和img标签。**

实现：

1.将页面中需要懒加载的图片保存起来
```javascript
    function getImages() {
          var ele = document.getElementsByTagName('img');
          for (var j = 0, len2 = ele.length; j < len2; j++) {
      //判断当前图片是否要懒加载
              if (typeof (ele[j].getAttribute("lazy_src"))) {
      //保存进数组
                  imgs.push(ele[j]);
                  count++;
              }
          }
     }
```

2.遍历数组对满足要求的img设置其src
```javascript
    function lazy() {
    //图片数量数量为0时则退出
        if (!count) return;
    //获取当前可视区域的高
        var innerHeight = getViewport();
        for (var i = 0, len = imgs.length; i < len; i++) {
    //获取图片距最顶部的距离（document的最顶部）
            var imgTop = getElementViewTop(imgs[i]);   
    //判断图片是否进入了可视区域
            if (imgTop - getScrollTop() < innerHeight) {
                imgs[i].src = imgs[i].getAttribute("lazy");
    //已加载的图片从数组中删除，数量减一
                delete imgs[i];
                count--;
            }
        }
    }
```

3.页面滚动时判断图片是否进入了可视区域
```javascript
    window.onscroll = window.onload = function () {
      lazy();//此处应设节流，滚动一下触发了n次   消耗太大。。。
    }
```

具体代码在github上了，地址是：[https://github.com/godnew/imgLazyLoading](https://github.com/godnew/imgLazyLoading)，欢迎star。

使用方法：src不设设置loading的图片，具体图片（宽高已设好）地址写在lazy属性里。在外部调用  lazyLoad.init();
