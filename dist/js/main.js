!function(e){function t(){n=!1;for(var t=0;t<i.length;t++){var a=e(i[t]).filter(function(){return e(this).is(":appeared")});if(a.trigger("appear",[a]),r){var p=r.not(a);p.trigger("disappear",[p])}r=a}}var r,i=[],a=!1,n=!1,p={interval:250,force_process:!1},o=e(window);e.expr[":"].appeared=function(t){var r=e(t);if(!r.is(":visible"))return!1;var i=o.scrollLeft(),a=o.scrollTop(),n=r.offset(),p=n.left,f=n.top;return f+r.height()>=a&&f-(r.data("appear-top-offset")||0)<=a+o.height()&&p+r.width()>=i&&p-(r.data("appear-left-offset")||0)<=i+o.width()},e.fn.extend({appear:function(r){var o=e.extend({},p,r||{}),f=this.selector||this;if(!a){var c=function(){n||(n=!0,setTimeout(t,o.interval))};e(window).scroll(c).resize(c),a=!0}return o.force_process&&setTimeout(t,o.interval),i.push(f),e(f)}}),e.extend({force_appear:function(){return a?(t(),!0):!1}})}(jQuery),$(window).ready(function(){$(".skillbar").appear(),$(".skillbar").on("appear",function(){$(this).find(".skillbar-bar").animate({width:$(this).attr("data-percent")},3e3)}),$.getJSON("api/pricelist.json",function(e){$.each(e,function(e,t){"8.2.2"==t["артикул"]&&$(".price p").eq(1).text("").text(t["Стоимость"]+" грн"),"2.5.1"==t["артикул"]&&$(".price p").eq(3).text("").text(t["Стоимость"]+" грн"),"7.1.1"==t["артикул"]&&$(".price p").eq(5).text("").text(t["Стоимость"]+" грн"),"11.1.1"==t["артикул"]&&$(".price p").eq(7).text("").text(t["Стоимость"]+" грн"),"1.1.1"==t["артикул"]&&$(".price p").eq(9).text("").text(t["Стоимость"]+" грн"),"15.1.1"==t["артикул"]&&$(".price p").eq(11).text("").text(t["Стоимость"]+" грн")})})});