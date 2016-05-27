;($(window).ready(function(){

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