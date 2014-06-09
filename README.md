jQCalendar
==========

A lightweight and simple plugin for jQuery that generates a skeleton calendar.

### Version
0.1 - beta

### Changelog

This is the initial version of the plugin. Any changes and bug-fixes will be published here. 

### Why another calendar plugin?

While working on the calendar for Schoolboard.io, it became apparent that a simple, lightweight and highly customizeable calendar jQuery plugin was hard to find. The problems this plugin attempts to solve are as follows:
- The calendar must be easy to set up, only needing a target element and a provided date;
- The calendar must be lightweight - no cruft features or unnecessary markup should be included;
- Individually targeting dates should be simple, for extensibility with events or other notable dates;
- The calendar must support month-to-month pagination;
- The calendar must not break responsiveness, and should be configurable in a way that it can be made responsive

### Dependencies

Latest version of jQuery is recommended; jQuery version of 1.7.2 or higher is required.

### Credits

This plugin was written by [Andrew Klatzke](http://andrewklatzke.com/), based on [this excellent blog post](http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html) written in 2007 by Scott Andrew LePera. Changes to the calendar prototype present in LaPera's blog post:
- Changed some internal structure and methods;
- Added data- attributes to the dates so that they can be targeted more precisely;
- Added month-to-month pagination feature

### The Code

#### Initialization

Initialization of the plugin is simple - just call the `calendar` method on a jQuery object after the document ready event:
```javascript
$("selector").calendar(new Date());
```
Simple..

Calling it as such will render a calendar beginning at the current date. Any `Date` object can be passed to the plugin, and it will render starting at that date. The calendar is initialized with the pagination by default. If you want to remove the pagination feature, it can be hidden via CSS.
```css
.next-calendar, .previous-calendar{
	display: none;
}
```
#### Markup Details

The main attempt when building this plugin was to build the markup as lean as possible. That being said, the markup structure is as follows:
```
Root Selector : selector targeted by jQuery
	.calendar-display : wrapper element
		.month-display : month/year display as well as pagination controls
		.calendar-header : days of the week wrapper
			.calendar-header-node : each weekday node
		.calendar-row : represents a week, contains individual day nodes
			.calendar-day : numbered days
```
In addition, the days are given a `data-day` attribute so that they can be easily targeted by jQuery attribute selectors:

```javascript
 $("[data-day=5]").css("background-color", "red");
``` 
This would give the fifth day of the month a red background. A forthcoming events library, also on behalf of Schoolboard.io, will leverage this functionality in order to add categorical events and dates to the calendar...

#### Responsiveness

The plugin was designed from the ground up to be responsive friendly, though you may need to change things to fit your specific needs. To quickly turn the calendar responsive, you can use (or tweak) the included CSS file which will make the calendar responsive (but doesn't make any major changes to structure or style so that you can make your own design decisions).

#### Interaction

This plugin emits events that can be leveraged in order to affect the status of the plugin at various stages. 

The following events are emitted by the calendar:

```
	next-calendar		:		emitted upon moving forward a month in the calendar
	previous-calendar	: 		emitted upon moving backwards a month in the calendar
	render 				: 		the start of the render event
	calendar-rendered 	: 		the end of the render event
```

Issues? Bugs? Please use GitHub's built in tracking/wiki.


