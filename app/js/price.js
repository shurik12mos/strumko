;($(window).ready(function(){
	//get pricelist.json
	$.getJSON("api/pricelist.json", function(data){		
	    $.each(data, function(i,item){	  
			if (i!=0 && item["раздел"] == data[i-1]["раздел"]) {
				var str = "<tr><td>"+item['Наименование']+"</td><td>"+item['еденицы измерения']+"</td><td>"+item['Стоимость']+"</td></tr>";
				$('.table').append(str);  
			}else {
				var str = "<tr><td colspan='3'>" + item["раздел"] + "</td></tr>";
				var str = str + "<tr><td>"+item['Наименование']+"</td><td>"+item['еденицы измерения']+"</td><td>"+item['Стоимость']+"</td></tr>";
				$('.table').append(str);
			}	
			
			if (item["артикул"]=="8.2.2") {
				$('.price p').eq(1).text("").text(item['Стоимость']+" грн");
			};
			if (item["артикул"]=="2.5.1") {
				$('.price p').eq(3).text("").text(item['Стоимость']+" грн");
			};
			if (item["артикул"]=="7.1.1") {
				$('.price p').eq(5).text("").text(item['Стоимость']+" грн");
			};
			if (item["артикул"]=="11.1.1") {
				$('.price p').eq(7).text("").text(item['Стоимость']+" грн");
			};
			if (item["артикул"]=="1.1.1") {
				$('.price p').eq(9).text("").text(item['Стоимость']+" грн");
			};
			if (item["артикул"]=="15.1.1") {
				$('.price p').eq(11).text("").text(item['Стоимость']+" грн");
			};
			
        });
	});
}));