# Fullscreen Color Picker

Designed for mobile devices, this plugin creates a simple color picker that fills the entire screen, with a responsive layout. 

### How to use it:

HEAD
```html
<style type="text/css">
.color-picker {
	background-color:#0C6;
	padding: 4px 12px;
	text-decoration: none;
	cursor: pointer;
}
</style>
<link rel="stylesheet" type="text/css" href="css/colorPicker.jquery.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="js/colorPicker.jquery.js"></script>
```
Javascript
```javascript
$(function() {
	$('.color-picker').fullScreenColorPicker({
		color: '#FFF',
		cols: 10,
		onSelect: function(color) { $('.color-picker').css('background-color', color); }
	});
});
```
BODY
```html
<a class="color-picker">Color Picker</a>
```
This is [on GitHub](https://github.com/caugbr/fullscreen-color-picker)