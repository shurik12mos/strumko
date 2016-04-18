"use strict"

;($(window).ready(function(){
	var dueDate = new Date();
	var thuesday;		
	var clock = $('.clock');
	var day = $('.day>.time');
	var hour = $('.hour>.time');
	var minute = $('.minute>.time');
	var second = $('.second>.time');
	
// Set dueDate to thuesday
	thuesday = dueDate.getDay()>2 ? 9-dueDate.getDay() : 2- dueDate.getDay();		
	dueDate.setHours(23,59,59,99);	
	dueDate.setDate(dueDate.getDate()+thuesday);
	
	function supports_html5_storage() {
	  try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	  }
	}
// get date parameters	
	function getDays(time) {
		time = time/1000/60/60;
		
		time = time/24;
		return Math.floor(time);			
		
	}
	
	function getHours(time) {
		time = time/1000/60/60;
		
		time = time%24;
		return Math.floor(time);
		
	}
	
	function getMinutes(time) {
		time = time/1000/60;
		
		time = time%(60);
		return Math.floor(time);
	}
	
	function getSeconds(time) {
		time = time/1000;
		
		time = time%60;
		return Math.floor(time);
	}
	
// add "0" if it have less than 2 characters	
	function getStringTime(time) {
		if (time>9) {
			return time
		} else {
			time = "0"+time;
			return time;
		}
	}
	
	
// clock working
	var clockOn = setInterval(function(){
		var timeEl = dueDate-Date.now();
		if (timeEl>0) {
			var dayEl = getDays(timeEl);
			var hourEl = getHours(timeEl);
			var minuteEl = getMinutes(timeEl);
			var secondEl = getSeconds(timeEl);
		} else {
			var dayEl = 0;
			var hourEl = 0;
			var minuteEl = 0;
			var secondEl = 0;
		}		
		
		day.text("").text(getStringTime(dayEl));
		hour.text("").text(getStringTime(hourEl));
		minute.text("").text(getStringTime(minuteEl));
		second.text("").text(getStringTime(secondEl));
		
	},1000);
	
}));