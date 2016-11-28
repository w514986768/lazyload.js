/**
 * Created by wangliang on 16-11-28.
 */

!function (window) {
    // exports to global
    window.Lazyload = Lazyload;

    function Lazyload(opts) {
        this.distance = 200;
        this.time = 30;
        this.elements = $("img.lazy,textarea.lazy");

        for (var key in opts) {
            this[key] = opts[key];
        }

        this.init();
    }

    Lazyload.prototype.init = function () {
        this.destoryElementIfInScreen();

        var timer, self = this;

        addEventListener("scroll", function () {
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                self.destoryElementIfInScreen()
            }, self.time)
        });

        addEventListener("resize", function () {
            timer && clearTimeout(timer);
            self.destoryElementIfInScreen()
        })
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
                i--; len--;
            }
        }
    };

    // load image or textarea value
    Lazyload.prototype.loadImg = function (ele) {
        if(ele.nodeName === "IMG"){
            var src = ele.getAttribute("data-src");
            ele.setAttribute("src", src)
        } else if(ele.nodeName === "TEXTAREA") {
            var val = ele.value, parentNode = ele.parentNode;
            parentNode.innerHTML = val;
        }

    };

    function addEventListener(evt, fn){
        window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent)
            ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
    }

    //return dom array
    function $(query) {
        var elements = document.querySelectorAll(query),
            ret = [];

        for(var i = 0, len = elements.length; i < len; i++){
            ret.push(elements[i]);
        }

        return ret
    }
}(window);
