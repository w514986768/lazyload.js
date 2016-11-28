# lazyload.js
原生JS的懒加载，支持图片和textarea

#usage
公共class:"lazy",如果是图片需要增加data-src="图片路径";
参数,distance:距离多远距离开始加载;

<code>
<script src="Lazyload.js"></script>
<div class="screen"><img data-src="banner1.jpg" class="lazy"></div>
<div class="screen"><img data-src="banner2.jpg" class="lazy"></div>
<div class="screen"><textarea class="lazy"><div>111222</div></textarea></div>
<div class="screen"><img data-src="banner3.jpg" class="lazy"></div>
<div class="screen"><textarea class="lazy"><img src="banner3.jpg" ></textarea></div>
<script>
    var lazy = new Lazyload({distance: 500})
</script>
</code>
