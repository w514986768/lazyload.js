/**
 * Created by wangliang on 16-11-28.
 */

!function (window) {
    // exports to global
    window.Lazyload = Lazyload;

    function Lazyload(opts) {
        this.distance = 200;
        this.elements = $("img.lazy,textarea.lazy");
        for (var key in opts) {
            this[key] = opts[key];
        }
        this.init();
    }

    Lazyload.prototype.init = function () {
        this.destoryElementIfInScreen();
        var self = this;
        function scrollFun() {
            self.destoryElementIfInScreen()
        }
        function resizeFun() {
            self.destoryElementIfInScreen()
        }
        addEventListener("scroll", throttle(scrollFun, 30, 30));
        addEventListener("resize", throttle(resizeFun, 30, 30))
    };

    //is in screen
    Lazyload.prototype.destoryElementIfInScreen = function () {
        if (!this.elements.length) {
            return
        }
        var h = window.innerHeight || document.documentElement.clientHeight;
        for (var i = 0, len = this.elements.length; i < len; i++) {
            var tag = this.elements[i];
            var rect = tag.getBoundingClientRect();
            if ((h + this.distance) > rect.top) {
                this.loadImg(tag);
                this.elements.splice(i, 1);
                i--;
                len--;
            }
        }
    };

    // load image or textarea value
    Lazyload.prototype.loadImg = function (ele) {
        if (ele.nodeName === "IMG") {
            var src = ele.getAttribute("data-src");
            ele.setAttribute("src", src)
        } else if (ele.nodeName === "TEXTAREA") {
            var val = ele.value, parentNode = ele.parentNode;
            parentNode.innerHTML = val;
        }
    };

    function addEventListener(evt, fn) {
        window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent)
            ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
    }

    //return dom array
    function $(query) {
        return [].slice.call(document.querySelectorAll(query));
    }

    // 简单的节流函数
    //fun 要执行的函数
    //delay 延迟
    //time  在time时间内必须执行一次
    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {
            var context = this,
                args = arguments,
                curTime = new Date();
            timeout && clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fun, delay);
            }
        };
    }
}(window);
