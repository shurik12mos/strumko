;($(window).ready(function(){
	//skillbar
	$('.skillbar').appear();
		$('.skillbar').on('appear', function () {			
		$(this).find('.skillbar-bar').animate({
			width: $(this).attr('data-percent')
		}, 3000);			
	});
	
	//prices
	$.getJSON("api/pricelist.json", function(data){		
	    $.each(data, function(i,item){				
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