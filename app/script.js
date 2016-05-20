;($(window).ready(function(){
	
	//Block with opportunities. Hide,show all description
	$('.fa-angle-down').click(function(){		
		var opportunity = $(this).parents('.opportunity');
		opportunity.find('.fa').eq(0).css("color","rgb(0, 164, 226)");
		opportunity.find('p').animate({maxHeight: "400px"}, 800);
		opportunity.find('.fa-angle-down').fadeOut(400, function(){opportunity.find('.fa-angle-double-up').fadeIn(400);});
				
	});
	
	$('.fa-angle-double-up').click(function(){
		var opportunity = $(this).parents('.opportunity');
		opportunity.find('.fa').eq(0).css("color","rgb(153, 153, 153)");
		opportunity.find('p').animate({maxHeight: "60px"}, 500);
		opportunity.find('.fa-angle-double-up').fadeOut(400, function(){opportunity.find('.fa-angle-down').fadeIn(400);});			
	});
	
	
	//Show menu when scrolling page
	$(window).scroll(function(){		
		changeMainMenuPosition();					
	});
	function changeMainMenuPosition (){			
		if ($(window).width()>792) {			
			if ($(window).scrollTop()>=160) {				
				$('#navbar').css({position: "fixed", top: "0px", opacity: "1", zIndex: "1001"});
				$('#navbar #phone2').css({display: "inline-block"}).animate({right: "0px"}, 500);
				$('#navbar .logo').css({display: "block"}).animate({left: "-170px"}, 600);
			} else{				
				$('#navbar #phone2').css({display: "none", right: "-300px"});
				$('#navbar .logo').css({display: "none", left: "-450px"});
				$('#navbar').css({position: "relative", top: "0px", opacity: "1", zIndex: "1"});				
			};	
		} else {
			$('#navbar').css({position: "relative", top: "0px", opacity: "1", zIndex: "1"});			
		}			
	}
	changeMainMenuPosition();	
	
	
	// recall Form	
	$('#recall_button').click(function(){
		var inputs = $(this).parents('form').find("input");
		var valid = true;
		inputs.each(function(){				
			if ($(this).val()) {
				$(this).parent().addClass('has-success').removeClass("has-error");				
			} else {
				$(this).after("<span>Заполните это поле</span>");
				$(this).parent().addClass("has-error");
				valid = false;
			}
		});
		
		var name = $("#recall-name").val();
		var phone = $("#recall-phone").val();
		var time = new Date().toLocaleString();
		if (valid) {
			$.post("recall.php", {
	            name_recall: name,	                   
	            phone_recall: phone,						
				time: time
			},
	        function(result) {				
	            $('#successMessageRecall').text('').append(result);						
				$('#recall_button').text('Закрыть').attr('type',"button").attr('data-dismiss', 'modal');											
	        });
		};
	});
	
	
	//Inputs in recall Form
	$('#recall-form input').change(function(){			
		if ($(this).val()) {			
			$(this).parent().removeClass("has-error").addClass('has-success');
			$(this).parent().find("span").text("");
		} else {
			$(this).parent().removeClass('has-success').addClass("has-error");			
		}
	});
	
	//contact Form
	$('#consult-submit').click(function(){		
		var inputs = $(this).parents('form').find("input");
		var valid = true;
		inputs.each(function(){				
			if ($(this).val()) {
				console.log($(this).val());
				$(this).parent().addClass('has-success').removeClass("has-error");				
			} else {
				$(this).after("<span>Заполните это поле</span>");
				$(this).parent().addClass("has-error");
				valid = false;
			}
		});
		
		var name = $("#consult-name").val();
		var phone = $("#consult-phone").val();
		var time = new Date().toLocaleString();
		if (valid) {
			$.post("recall.php", {
	            name_recall: name,	                   
	            phone_recall: phone,						
				time: time
			},
	        function(result) {				
	            $('#successMessageContact').text('').append(result);					
				$("#consult-name").val("");
				$("#consult-phone").val("");
	        });
		};
	});
	
	//button up
	$(window).scroll(function () {
      if ($(window).scrollTop()>$(window).height()) {
		  $('#up').fadeIn(1000);		  
	  } else {
		 $('#up').fadeOut(500);	
	  }
    });
	
	//Slider
	var slider = $('#comments');	
	var x=0;
	var container = $('.container').width();
	var nav = $('.slideNav>.nav');	
	var slideTo, currentPos;
	var click = false;
	
	
	function activeNav (pos) {		
					
		switch(pos){
			case 0: 
				nav.removeClass('active');
				nav.eq(0).addClass('active');
				break;
			case -100:
				nav.removeClass('active');
				nav.eq(1).addClass('active');
				break;
			case -200:
				nav.removeClass('active');
				nav.eq(2).addClass('active');
				break;
			default:
				nav.removeClass('active');
				nav.eq(0).addClass('active');
				break;
		}			
	};
	
	function slide(e){		
		x = e.clientX || e.pageX;			
		currentPos = slider.css('left').replace('px', '')*300/slider.width();		
		slider.bind("mousemove", move);			
		click = true;		
	}
	
	function move(event){
		if (event) {
			var curPos;
			if ('changedTouches' in event) {
				curPos = event.changedTouches[0].clientX || event.changedTouches[0].pageX
			} else {
				curPos = event.clientX || event.pageX;			
			}
			
			slideTo = (curPos-x)*100*1.5/container;		
			slider.css({left: (currentPos+slideTo)+"%"});	
		}		
	}
	
	function toSlide(pos) {		
		var toSlide;
		if (pos<=0) {
			toSlide = pos;
		} else {
			toSlide = currentPos+slideTo;
		}		
		if (toSlide>0) {			
			toSlide = 0;
		} else if (toSlide<-200) {			
			toSlide = -200;
		} else {			
			toSlide = Math.round((toSlide)/100)*100; 
		}
		activeNav(toSlide);
		slider.animate({left: toSlide+"%"}, 500);		
	}
	
	slider.bind("mousedown", slide);	
	$(document).mouseup(function(){		
		slider.unbind("mousemove", move);
		if (click) {
			toSlide();			
		}
		click = false;
	});
	nav.click(function(){
		var slide = $(this).attr('data-slide');			
		var pos;
		switch(slide) {
			case "0":
				pos = 0;
				break;
			case "1":
				pos = -100;
				break;
			case "2": 
				pos = -200;
				break;
			default:				
				pos = 0;
		}		
		toSlide(pos);
	});
	
	//touch events for slider
	var sliderX = document.getElementById('comments');
	function slideX(){

		if (event) {
			
			if ('changedTouches' in event) {
				x = event.changedTouches[0].clientX || event.changedTouches[0].pageX
			} else {
				x = event.clientX || event.pageX;			
			}
			currentPos = slider.css('left').replace('px', '')*300/slider.width();		
			sliderX.addEventListener('touchmove',move, false);	
			click = true;	
		}		
	}
	
	sliderX.addEventListener('touchstart', function(event){			
		slideX();	
	}, false);
	document.addEventListener('touchend', function(event){		
		sliderX.removeEventListener('touchmove', move, false);
		if (click) {
			toSlide();			
		}
		click = false;
	},false);
//end Slider

}));