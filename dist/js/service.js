"use strict";$(window).ready(function(){function t(t){return t=t/1e3/60/60,t/=24,Math.floor(t)}function e(t){return t=t/1e3/60/60,t%=24,Math.floor(t)}function n(t){return t=t/1e3/60,t%=60,Math.floor(t)}function r(t){return t/=1e3,t%=60,Math.floor(t)}function o(t){return t>9?t:t="0"+t}var a,u=new Date,i=($(".clock"),$(".day>.time")),f=$(".hour>.time"),c=$(".minute>.time"),s=$(".second>.time");a=u.getDay()>2?9-u.getDay():2-u.getDay(),u.setHours(23,59,59,99),u.setDate(u.getDate()+a);setInterval(function(){var a=u-Date.now();if(a>0)var x=t(a),l=e(a),D=n(a),$=r(a);else var x=0,l=0,D=0,$=0;i.text("").text(o(x)),f.text("").text(o(l)),c.text("").text(o(D)),s.text("").text(o($))},1e3)});