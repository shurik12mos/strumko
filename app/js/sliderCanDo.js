;$(window).ready(function(){
	var slider = $('#listCanDo');	
	var leftArrow = $('#listCanDo .left');
	var rightArrow = $('#listCanDo .right');
	var items = $('#listCanDo .itemCanDo');
	var itemsBlock = $('#listCanDo>.itemBlock');
	var widthItem, widthBlock,left=0, done=true;
	widthItem = items.width();
	items.width(widthItem+'px');
	itemsBlock.width(widthItem*items.length+'px');
	
	rightArrow.click(function(){
		if (!done) return;
		left -=widthItem;		
		if (itemsBlock.width()+left<slider.width()) {
			left=0;
		}
		done = false;
		itemsBlock.animate({left: left+"px"}, 700, function(){done=true});
	});
	leftArrow.click(function(){
		if (!done) return;
		left +=widthItem;		
		if (left>0) {
			left=slider.width()-itemsBlock.width();			
		}
		done = false;
		itemsBlock.animate({left: left+"px"}, 700, function(){done=true});
	});
	
	$(window).resize(function(){
		var width = $(window).width();
		if (width>=1200) {
			widthItem = slider.width()/4;
		}else if (width>=792 && width<1200){
			widthItem = slider.width()/2;
		}else {
			widthItem = slider.width()/1;
		}	
		
		items.width(widthItem+'px');
		itemsBlock.width(widthItem*items.length+'px');		
	});
	
	
	//touchEvents
	var sliderX = document.getElementById('listCanDo');	
	var curPosStart=0, curPosEnd = 0;
	sliderX.addEventListener('touchstart', swipStart, false);
	sliderX.addEventListener('touchend', swipEnd, false);
	
	function swipStart(event){
		if (event) {			
			if ('changedTouches' in event) {
				curPosStart = event.changedTouches[0].clientX || event.changedTouches[0].pageX
			} else {
				curPosStart = event.clientX || event.pageX;			
			}			
		}	
	}
	
	function swipEnd(event){
		if (event) {			
			if ('changedTouches' in event) {
				curPosEnd = event.changedTouches[0].clientX || event.changedTouches[0].pageX
			} else {
				curPosEnd = event.clientX || event.pageX;			
			}
			
			if ((curPosStart-curPosEnd)>30) {
				rightArrow.click();
			} else if ((curPosStart-curPosEnd)<-30) {
				leftArrow.click();
			}
		}	
	}
	
});