/**
 * Created by godnew on 2016/8/20.
 * 图片预加载
 */
var MyImage = (function(){
    var imgNode = document.createElement( 'img' );
    var img = new Image;
    var callback;//回调函数处理imgNode
    img.onload = function(){
        //图片加载完后设置imgNode的src
        imgNode.src = img.src;
        //回调函数处理该节点
        callback.apply(imgNode,arguments);
    };
    return {
        setSrc: function( loading,src ,fn){//菊花图地址   图片地址   回调函数
            imgNode.src = loading;
            img.src = src;
            callback=fn;
        }
    }
})();

