;($(window).ready(function(){	
//all about type projects
	function getSpreadSheet(data) {		
		var sheet = {
			object: '',
			contractor: 'ООО "Струмко" т.(099)049 39 11, (067)708 15 36',
			designer: '',
			sum: 0,
			sum_jobs: 0,
			sum_materials: 0,
			human_hour: 0,
			materials: [],
			jobs: []
		}
		
		function getDataFromSheet(entry) {
			var alreadyMaterials = false, alreadyJobs = false, alreadyDescription = false;
			var nameCol, job_start_row, material_start_row, jobCodeCol, measureCol, numberCol, priceCol, sumCol, temp; 
			var sheet_in_rows = [];
			
			function toFloat(n) {				
				n = n.replace(/,/g, ".");
				n = n.replace(/[^\.0-9]/g, "");
				n = parseFloat(n);
				return n;
			}
			
			$.each(entry, function(i, cell){
				var content = cell.content.$t;
				var wideValue = cell.gs$cell;				
				
				switch(content.toLowerCase()) {
					case 'монтажные работы':
						if (toFloat(entry[i+1].content.$t)>0 && sheet.sum_jobs == 0) {							
							temp = entry[i+1].content.$t;							
							temp = toFloat(temp).toFixed(2);							
							sheet.sum_jobs = temp;							
						}						
						break;

					case 'материалы':  
						if (toFloat(entry[i+1].content.$t)>0 && sheet.sum_materials == 0) {
							temp = entry[i+1].content.$t;
							temp = toFloat(temp).toFixed(2);
							sheet.sum_materials = temp;
						}	
						break;
						
					case 'итого':  
						if (toFloat(entry[i+1].content.$t)>0 && sheet.sum == 0) {
							temp = entry[i+1].content.$t.replace(",", ".").replace(" ", "");
							temp = toFloat(temp).toFixed(2);
							sheet.sum = temp;							
						}	
						break;
						
					case 'трудозатраты:':  
						if (entry[i+1].content.$t != "" && sheet.human_hour == 0) {
							temp = entry[i+1].content.$t.replace(",", ".").replace(" ", "");
							temp = toFloat(temp);
							sheet.human_hour = temp;
							alreadyDescription = true;
						}	
						break;					
					
					case 'Проект:':  
						if (entry[i+1].content.$t != "" && sheet.designer == '') {
							sheet.designer = entry[i+1].content.$t;							
						}	
						break;

					default:						
						break;
				}//end switch				
				
				//block where determine position of important value of sheetData. Like Наименование, артикул работы, количество и прочее
				if (content.toLowerCase().indexOf("наименование") !== -1 && !alreadyJobs) {
					nameCol = wideValue.col;
					job_start_row = wideValue.row;
				}
				
				if (content.toLowerCase().indexOf("наименование") !== -1 && alreadyJobs && nameCol === wideValue.col) {					
					material_start_row = wideValue.row;
				}
				
				if (content.toLowerCase().indexOf("артикул работы") !== -1 && !alreadyJobs && job_start_row === wideValue.row) {
					jobCodeCol = wideValue.col;
				}
				
				if (content.toLowerCase().indexOf("ед.изм.") !== -1 && !alreadyJobs && job_start_row === wideValue.row) {
					measureCol = wideValue.col;
				}
				
				if (content.toLowerCase().indexOf("кол-во") !== -1 && !alreadyJobs && job_start_row === wideValue.row) {
					numberCol = wideValue.col;
				}
				
				if (content.toLowerCase().indexOf("ст.ед.") !== -1 && !alreadyJobs && job_start_row === wideValue.row) {
					priceCol = wideValue.col;
				}
				
				if (content.toLowerCase().indexOf("сумма") !== -1 && !alreadyJobs && job_start_row === wideValue.row) {
					sumCol = wideValue.col;
					alreadyJobs = true;
				}				
				
				//fill sheet_in_rows
				if (sheet_in_rows[wideValue.row] && sheet_in_rows[wideValue.row].length) {
					sheet_in_rows[wideValue.row][wideValue.col] = wideValue;
				}else {
					sheet_in_rows[wideValue.row] = [];
					sheet_in_rows[wideValue.row][wideValue.col] = wideValue;
				}				
			});
			
			//get job 
			sheet_in_rows.forEach(function(item, i){
				var job = {};
				if (i>job_start_row && i<material_start_row && item[priceCol] && item[nameCol].$t !== "") {
					job = {
						name: item[nameCol].$t,
						code: item[jobCodeCol].$t,
						measure: item[measureCol].$t,
						number: toFloat(item[numberCol].$t),
						price: toFloat(item[priceCol].$t),
						sum: toFloat(item[sumCol].$t)
					}
					sheet.jobs.push(job);					
				}
			});
			
			//get materials
			sheet_in_rows.forEach(function(item, i){
				
				var material = {};
				if (i>material_start_row && item[priceCol] && item[nameCol].$t !== "") {
					material = {
						name: item[nameCol].$t,						
						measure: item[measureCol].$t,
						number: toFloat(item[numberCol].$t),
						price: toFloat(item[priceCol].$t),
						sum: toFloat(item[sumCol].$t)
					}
					sheet.materials.push(material);					
				}
			});
			
		}
		
		getDataFromSheet(data);
			
		return sheet;
	}
	
	
	//get list of type project and for each get google spreadsheets.
	function getTypeProject() {		
		var type_project = [];
		var way_to_project = "api/type_project.json";
		var imagesWay = "images/type_project/", sheetWaystart = "http://spreadsheets.google.com/feeds/cells/", sheetWayEnd = "/4/public/values?alt=json";
				
		function getSheetFromURL(data) {			
			var count = 0, length = data.length;
			
			function countSheets() {
				count = count + 1;
				if (count >= length) {
					done_projects.resolve(type_project);
				}
			}
			
			function requestSheet(item) {
				if (item.spreadSheet && typeof item.spreadSheet === "string"){
					var url, startID, endID, project;
					startID = item.spreadSheet.indexOf("/d/") + 3;
					endID = item.spreadSheet.indexOf("/", startID);
					url = item.spreadSheet.slice(startID, endID);				
					url = sheetWaystart + url + sheetWayEnd;
					
					$.getJSON(url, function(spread_sheet){				
						var project = getSpreadSheet(spread_sheet.feed.entry);								
						project.name = item.name;
						project.object = item.name;
						project.image = imagesWay + item.image;
						project.description = item.description;
						project.spreadSheet = url;
						type_project.push(project);						
						countSheets();				
					}, function(error){
						countSheets();	
					});	
				}else {
					countSheets();
				}					
			}
			
			for (var i = 0; i<length; i++) {
				requestSheet(data[i]);
			}
		}
		
		$.getJSON(way_to_project, function(data){				
			var imagesWay = "images/type_project/", sheetWaystart = "http://spreadsheets.google.com/feeds/cells/", sheetWayEnd = "/4/public/values?alt=json";
			console.log("done type_project ", data);
			getSheetFromURL(data);
		}, function(error){console.log("error", error)});
	}
	
	function addProjectsInDOM(projects) {
		function showCalulation() {			
			var project = projects[$(this).data("number")];
			var modal = $('#type_project_modal'),
				name = $('#type_project_object'),
				designer = $('#type_project_designer'),
				sum_jobs = $('#type_project_modal .type_project_modal_summary_jobs>span'),
				sum_materials = $('#type_project_modal .type_project_modal_summary_materials>span'),
				sum = $('#type_project_modal .type_project_modal_summary_all>span'),
				human_hour = $('#type_project_modal .type_project_modal_table_hh>span'),
				jobs = $('#type_project_modal .type_project_modal_jobs>table'),
				materials = $('#type_project_modal .type_project_modal_materials>table'),
				heightItem = 0;
				
			function insertIntoTable(data, table) {
				var sum = 0, reserve = 0, reserve_delivery = 0;
				var insert = "<tr><th>№</th><th>Наименование</th><th>ед.изм.</th><th>кол-во</th><th>ст.ед., грн</th><th>сумма, грн</th></tr>";
				if (!data || !data.length) return;
				data.forEach(function(item, i){
					insert += "<tr><td>" + (i+1) +"</td><td>" + item.name + "</td><td>" + item.measure;
					insert += "</td><td>" + item.number + "</td><td>" + item.price.toFixed(2) + "</td><td>" + item.sum.toFixed(2) + "</td></tr>";	
					sum += item.sum;
				});
				sum = Math.round(sum*100)/100;
				
				if (table.hasClass("table_jobs")) {	
					reserve = Math.round(sum*0.2*100)/100;
					insert += "<tr><td></td><td colspan = '4'>Запас на работы (не используемая часть возвращается)</td><td>" + reserve + "</td></tr>";
					sum += reserve;
					insert += "<tr><td></td><td colspan = '4'>Итого строительно-монтажные и пусконаладочные работы</td><td>" + project.sum_jobs + "</td></tr>";
				}else if(table.hasClass("table_materials")) {
					reserve = reserve = Math.round(sum*0.2*100)/100;
					insert += "<tr><td></td><td colspan = '4'>Запас на материалы  (не используемая часть возвращается)</td><td>" + (sum = Math.round(sum*0.2*100)/100) + "</td></tr>";
					sum += reserve;
					reserve_delivery = Math.round(sum*0.1*100)/100;
					insert += "<tr><td></td><td colspan = '4'>Расходы по оформлению и доставке материалов</td><td>" + reserve_delivery + "</td></tr>";					
					insert += "<tr><td></td><td colspan = '4'>Итого материалы</td><td>" + project.sum_materials + "</td></tr>";
				}
				
				table.empty();
				table.append(insert);				
			}
			
			//insert current data
			name.text(project.name);
			project.designer = project.designer || 'Виктор т. (096)497 04 85';
			designer.text(project.designer);
			sum_jobs.text(project.sum_jobs);
			sum_materials.text(project.sum_materials);
			sum.text(project.sum);
			human_hour.text(project.human_hour + "чел*час");
			
			insertIntoTable(project.jobs, jobs);
			insertIntoTable(project.materials, materials);
			
			modal.slideDown(500);			
		}
		projects.forEach(function(item, i){			
			var el = "";
			el = '<div class="type_project_item col-md-3 col-sm-6 col-xs-12" >\n';
			el +='	<div class="type_project_img">\n';
			el +='		<img src = "' + item.image + '" alt = "' + item.name + '"/> \n';
			el +='		<div class="type_project_img_more sliding fromtop"  data-number = "' + i + '"><span><i class="fa fa-ellipsis-h" aria-hidden="true"></i>Подробней</span></div> \n';			
			el +='	</div> \n';
			el +='	<div class="type_project_description">' + item.description + '</div> \n';
			el +='	<div class="type_project_name">' + item.name + '</div> \n';
			el +='	<div class="type_project_line"></div> \n';
			el +='	<div class="type_project_price">' + parseInt(item.sum_jobs).toLocaleString() + ' грн</div> \n';
			el +='</div> \n';
			
			$('#type_project .itemBlock').append(el);			
		});
			var widthJustItem, widthItem, padding, items, heightItem, slider,
				leftArrow, rightArrow, itemsBlock, widthBlock,left=0, done=true;
			
			slider = $('#type_project');	
			leftArrow = $('.type_project .left');
			rightArrow = $('.type_project .right');			
			itemsBlock = $('#type_project .itemBlock');
				
			function sliderOptions(n) {	
				items = $('#type_project .type_project_item');
				widthJustItem = items.width();				
				padding = parseFloat(items.css('paddingLeft'));
				padding += parseFloat(items.css('paddingRight'));
				if (!n) {
					var sliderWidth = slider.width()
					if(sliderWidth>992) {
						n = 4;
					} else if (sliderWidth>640 && sliderWidth<=992) {
						n = 2;
					} else {
						n = 1;
					}									
				}
				widthItem = slider.width()/n;
				
				heightItem = items.width(widthItem-padding).height();	
				$('#type_project .itemBlock').width(projects.length*widthItem);
				//heightItem = $('#type_project .type_project_item').height();
				$('#type_project').height(heightItem);					
			}
			
			sliderOptions();
						
			rightArrow.click(function(){				
				if (!done) return;
				left -= widthItem;
				console.log('widthItem', widthItem, 'left', left);
				if (itemsBlock.width()+left<slider.width()) {
					left=0;
				}
				done = false;
				itemsBlock.animate({left: left+"px"}, 700, function(){done=true});
			});
			
			leftArrow.click(function(){
				if (!done) return;
				left += widthItem;		
				if (left>0) {
					left=slider.width()-itemsBlock.width();			
				}
				done = false;
				itemsBlock.animate({left: left+"px"}, 700, function(){done=true});
			});
			
			$(window).resize(function(){
				var width = $(window).width();
				if (width>=1200) {
					itemsBlock.animate({'left': '0px'}, 500);
					sliderOptions(4);					
					left = 0;
					leftArrow.css({left: '-20px', backgroundColor: 'transparent', borderRadius: '50%'});
					rightArrow.css({right: '-20px', backgroundColor: 'transparent', borderRadius: '50%'});
				}else if (width>640 && width<1200){
					itemsBlock.animate({'left': '0px'}, 500);
					sliderOptions(2);					
					left = 0;
					leftArrow.css({left: 0, backgroundColor: '#fff', borderRadius: '50%'});
					rightArrow.css({right: 0, backgroundColor: '#fff', borderRadius: '50'});
				}else {
					itemsBlock.animate({'left': '0px'}, 500);
					sliderOptions(1);					
					left = 0;
					leftArrow.css({left: 0, backgroundColor: '#fff', borderRadius: '50%'});
					rightArrow.css({right: 0, backgroundColor: '#fff', borderRadius: '50'});
				}				
			});
			
			
			//touchEvents
			var sliderX = document.getElementById('type_project');	
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
			
		
		$('#type_project .type_project_img_more').on("click", showCalulation);	
		$('#type_project_modal .type_project_modal_dismiss').on("click", function() {
			$('#type_project_modal').slideUp(500);			
		});
	};	
	
	var done_projects = $.Deferred();
	done_projects.then(function(projects){			
			addProjectsInDOM(projects);
			$('.spinner').hide();
		}, function(error){
			
		}
	);
	
	getTypeProject();
	
	// PRINT
	$('#printIt').on('click', function() {
		var visibleElement = [], hiddenElement = [];
		var target = $('#printIt').attr('data-target');	
		target = $(target).children().clone();		
		$('body >*').each(function (i, el){			
			if ($(this).css && $(this).css('display') !== 'none') {
				visibleElement.push($(this));
				$(this).hide();
			}else {
				hiddenElement.push($(this));
			}			
		});
			
		$('body').append(target);
		target.css({'maxWidth': '100%', 'zIndex': 10000});		
		$(target).show();		
		
		setTimeout(function() {
			window.print();
			setTimeout(unprint, 0);
			
			function unprint() {
				$(target).remove();
				visibleElement.forEach(function(el) {
					el.show();
				});
			}
		}, 0);
		
	});
}));