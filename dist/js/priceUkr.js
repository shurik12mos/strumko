$(window).ready(function(){$.getJSON("../api/pricelist.json",function(t){$.each(t,function(e,p){if(0!=e&&p["разделукр"]==t[e-1]["разделукр"]){var d="<tr><td>"+p["Наименованиеукр"]+"</td><td>"+p["еденицы измерения"]+"</td><td>"+p["Стоимость"]+"</td></tr>";$(".table").append(d)}else{var d="<tr><td colspan='3'>"+p["разделукр"]+"</td></tr>",d=d+"<tr><td>"+p["Наименованиеукр"]+"</td><td>"+p["еденицы измерения"]+"</td><td>"+p["Стоимость"]+"</td></tr>";$(".table").append(d)}"8.2.2"==p["артикул"]&&$(".price p").eq(1).text("").text(p["Стоимость"]+" грн"),"2.5.1"==p["артикул"]&&$(".price p").eq(3).text("").text(p["Стоимость"]+" грн"),"7.1.1"==p["артикул"]&&$(".price p").eq(5).text("").text(p["Стоимость"]+" грн"),"11.1.1"==p["артикул"]&&$(".price p").eq(7).text("").text(p["Стоимость"]+" грн"),"1.1.1"==p["артикул"]&&$(".price p").eq(9).text("").text(p["Стоимость"]+" грн"),"15.1.1"==p["артикул"]&&$(".price p").eq(11).text("").text(p["Стоимость"]+" грн")})})});