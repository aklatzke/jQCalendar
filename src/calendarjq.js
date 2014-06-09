$(function(){
	// Calendar Object inspired by:  http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html
	/* Initial Setup, defaults */
	 var Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// these are human-readable month name labels, in order
	  var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// these are the days of the week for each month, in order
	var DaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// this is the current date
	var CurrentDate = new Date(); 


	/* START calendar methods */
	/**
	 * Calendar Prototype
	 * Generates a calendar object based on current month and year, can be overwritten
	 * by passing month and  year as arguments
	 * @param {integer} month, optional
	 * @param {integer} year, optional
	 */
	function Calendar(month, year) {
		  this.month = (isNaN(month) || month == null) ? CurrentDate.getMonth() : month;
		  this.year  = (isNaN(year) || year == null) ? CurrentDate.getFullYear() : year;
		  this.html = '';
		  return this;
	}

	/**
	 *  Increments the calendar's current date by one month
	 *  in order to generate a new month view
	 *  @return {Calendar Object}
	 */
	Calendar.prototype.addMonth = function(){
		this.year = this.month === 11 ? this.year + 1 : this.year;
		this.month = this.month === 11 ? 0 : this.month + 1;
		return this;
	}
	/**
	 * Decrements the calendar's current date by one month
	 * in order to generate a new month view
	 * @return {Calendar Object}
	 */
	Calendar.prototype.subtractMonth = function(){
		this.year = this.month === 0 ? this.year - 1 : this.year;
		this.month = this.month === 0 ? 11 : this.month - 1;
		return this;
	}
	/**
	 * Generates the HTML of the calendar based on the current month of the calendar
	 * must use the Calendar.getHTML() function to return it.
	 * @return {Calendar Object}
	 */
	Calendar.prototype.generateHTML = function(){
	  // get first day of month
	  var firstDay = new Date(this.year, this.month, 1),
			startingDay = firstDay.getDay();
	  
	  // find number of days in month
	  var monthLength = DaysPerMonth[this.month];
	  
	  // compensate for leap year
	  if (this.month == 1) { // February only!
		if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
		  monthLength = 29;
		}
	  }
	  
	  // do the header
	  var monthName = Months[this.month]
	  var html = '<div class="calendar-display">';
	  html += '<div class=month-display><div><div class="previous-calendar"><i class="fa fa-arrow-left"></i> &nbsp;Previous</div>';
	  html +=  "<span class='month-year-wrap'>" + monthName + "&nbsp;" + this.year + "</span>";
	  html += '</div><span class="next-calendar">Next &nbsp;<i class="fa fa-arrow-right"></i></span></div>';
	  html += '<div class="calendar-header">';
	  for(var i = 0; i <= 6; i++ ){
		html += '<div class="calendar-header-node">';
		html += Days[i];
		html += '</div>';
	  }

	  html += '</div><div class="calendar-row">';

	  // fill in the days
	  var day = 1;
	  // this loop is for is weeks (rows)
	  for (var i = 0; i < 9; i++) {
		// this loop is for weekdays (cells)
		for (var j = 0; j <= 6; j++) { 
		  html += '<div class="calendar-day" data-day="' + day + '">';
		  if (day <= monthLength && (i > 0 || j >= startingDay)) {
			html += day;
			day++;
		  }
		  else{
			html += "&nbsp;"
		  }
		  html += '</div>';
		}
		// stop making rows if we've run out of days
		if (day > monthLength) {
		  break;
		} else {
		  html += '</div><div class="calendar-row">';
		}
	  }
	  html += '</div></div>';

	  this.html = html;
	  return this;
	}

	/**
	 * Returns the HTML currently stored in the calendar object
	 * @return {string}
	 */
	Calendar.prototype.getHTML = function(){
		return this.html;
	}

	/**
	 * jQuery integration for the calendar
	 * @param  {Date Object} date
	 * @return {jQuery Object}
	 */
	$.fn.calendar = function(date){
		if( !date ) throw "Calendar Error: Must provide a date.";
		
		var selector =$(this);
		var jQueryCalendar = new Calendar(date.getMonth(), date.getFullYear());

		$(document).on("click", ".next-calendar", function(){
			selector.html(jQueryCalendar.addMonth().generateHTML().getHTML()).trigger("render");
			selector.trigger("next-calendar");
			$(document).trigger("next-calendar");
		})

		$(document).on("click", ".previous-calendar", function(){
			selector.html(jQueryCalendar.addMonth().generateHTML().getHTML()).trigger("render");
			selector.trigger("previous-calendar");
			$(document).trigger("previous-calendar");
		})

		selector.on("render", function(){
			var rowAreaSize = $(window).height() - ($(".calendar-header").position().top + $(".calendar-header").height()),
				rowCount = $(this).find(".calendar-row").length,
				rowHeight = rowAreaSize/rowCount;
			$("document").trigger("calendar-render");
			$(this).find(".calendar-row").css("height", rowHeight);
		})

		selector.html(jQueryCalendar.generateHTML().getHTML()).trigger("render");
		selector.trigger("calendar-rendered");

		return selector;
	}
})