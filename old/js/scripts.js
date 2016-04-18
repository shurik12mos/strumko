$(window).ready(function(){
	//main-menu fixed on top when scroll
	$(window).scroll(function(){
		changeMainMenuPosition();					
	});
	function changeMainMenuPosition (){	
		if ($(window).width()>768) {
			if ($(window).scrollTop()>160) {
				$('#header').css({position: "fixed", top: "0px", opacity: "0.6", z-index: "1001"}, 500);
			} else if ($(window).scrollTop()<160){
				$('#header').css({position: "relative", top: "0px", opacity: "1", z-index: "1"}, 500);
			};	
		}			
	}
	changeMainMenuPosition();	
	
	$('button[data-target=".modal-benefit-more"]').click(function(){
		var parentTable = $(this).parents('.benefit');
		var header = parentTable.find('.text').text();
		var desc = parentTable.find('.desc').text();
		$('.benefit-details').find('.h1>h1').eq(0).text('').text(header);
		$('.benefit-details').find('.about-benefit>p').eq(0).text('').text(desc);
		$('.benefit-details').show();
		$('body').css({"overflow-y": "hidden"});
	})
	
	$('.close-benefit>p').click(function(){
		$('.benefit-details').hide();
		$('body').css({"overflow-y": "auto"});
	})
	
	
	
});