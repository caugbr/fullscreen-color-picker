(function($) {
	
	var defaults = {
			colors: ['#cccccc', '#999999', '#666666', '#333333', '#272727', '#000000', '#f1e713', '#ccff33', '#88cd04', '#339966', '#006633', '#66ccff', '#00ccff', '#0066ff', '#003399', 
			         '#ff9900', '#bc7d5b', '#764b34', '#993300', '#cc3300', '#ff6633', '#ff0000', '#cf0000', '#990000', '#c61458', '#ba019a', '#a6029a', '#9999ff', '#3300ff', '#6700ff'],
 			color: '',
			cols: 5,
			title: 'Clique sobre a cor desejada',
			input: true,
			onSelect: null
	};
	
	function fullScreenColorPicker(elem, cfg) {
		this.element = elem;
		this.config = $.extend({}, defaults, cfg || {});
	}
	
	fullScreenColorPicker.prototype = {
		init: function() {
			$(this.element).click(function() {
				var $this = $(this), instance = $this.data('colorPickerInstance');
				instance.build();
				instance.open();
			});
		},
		
		build: function() {		
			var iniColor = /rgb/.test(this.config.color) ? this.rgb2hex(this.config.color) : typeof this.config.color ? this.config.color() : this.config.color;
			this.wrapper = $('<div id="fs-color-picker" style="display: none"></div>').data('colorPickerInstance', this);
			this.table = $(this.tableHtml());
			this.wrapper.append('<table><tr><td class="header"></td></tr><tr><td class="stage"></td></tr><tr><td class="panel"></td></tr></table>');
			this.header = $('.header', this.wrapper).text(this.config.title);
			this.stage = $('.stage', this.wrapper).append(this.table).wrapInner('<div class="scrollable" />');
			this.panel = $('.panel', this.wrapper);
			this.panel.html('<span class="oldcolor" style="background-color: ' + iniColor + '" /><span class="newcolor" />');
			this.input = $('<input type="' + (this.config.input ? 'text' : 'hidden') + '" value="' + iniColor + '" id="color-picker-input">');
			this.panel.append(this.input).append('<a href="javascript://" class="color-picker-ok"></a> <a href="javascript://" class="color-picker-close"></a>');
			
			$('body').append(this.wrapper);
			
			$('td', this.table).click(function(ev) {
				var $this = $(this);
				if($this.is('.disabled')) return;
				var color = $this.attr('data-color'), instance = $this.parents('#fs-color-picker').data('colorPickerInstance');
				instance.highlight(this);
				instance.input.val(color);
				instance.panel.find('.newcolor').css('background-color', color);
			});
			
			$('.color-picker-ok', this.panel).click(function(ev) {
				var $this = $(this), instance = $this.parents('#fs-color-picker').data('colorPickerInstance');
				instance.setValue(instance.input.val());
				instance.close();
			});
			
			$('.color-picker-close', this.panel).click(function(ev) {
				var $this = $(this), instance = $this.parents('#fs-color-picker').data('colorPickerInstance');
				instance.close();
			});
		},
		
		setValue: function(color) {
			if(/rgb/.test(color)) color = this.rgb2hex(color);
			this.input.val(color);
			if(typeof this.config.onSelect == 'function') this.config.onSelect.call(this.element, color);
		},
		
		open: function() {
			var iniColor = /rgb/.test(this.config.color) ? this.rgb2hex(this.config.color) : typeof this.config.color ? this.config.color() : this.config.color;
			$('.oldcolor', this.panel).css('', iniColor);
			$('#color-picker-input', this.panel).val(iniColor);
			this.wrapper.fadeIn(300);
			this.oldBodyOverflow = document.body.style.overflow || '';
			$('body').css('overflow', 'hidden');
		},
		
		close: function() {
			this.wrapper.fadeOut(300, function() { $(this).remove(); });
			$('body').css('overflow', this.oldBodyOverflow);
		},
		
		highlight: function(td) {
			$('td', this.table).removeClass('highlighted');
			td.className = 'highlighted';
		},
		
		rgb2hex: function(rgb){
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			return (rgb && rgb.length === 4) ? "#" +
			       ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			       ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			       ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		},
		
		tableHtml: function() {
			while(this.config.colors.length % this.config.cols != 0) {
				this.config.colors.push('disabled');
			}
			var table = '<table id="color-picker-table" cellpadding="0" cellspacing="1">';
			table += '<tbody>';
			table += '<tr>';
			for(var i = 0; i < this.config.colors.length; i++) {
				if(i && i % this.config.cols == 0) table += '</tr><tr>';
				if(this.config.colors[i] == 'disabled') {
					table += '<td class="disabled">&nbsp;</td>';
				} else {
					table += '<td style="background-color: ' + this.config.colors[i] + '" data-color="' + this.config.colors[i] + '">&nbsp;</td>';
				}
			}
			table += '</tr>';
			table += '</tbody>';
			table += '</table>';
			return table;
		}
	};
	
	$.fn.fullScreenColorPicker = function(o) {
		var instance;
		return this.each(function(index, element) {
			if(typeof o == 'string') {
				if(!(instance = $(element).data('colorPickerInstance'))) {
					$.error('O plugin ainda não foi instanciado para este elemento.');
					return false;
				}
				if(typeof instance[o] != 'function') {
					$.error('O método fullScreenColorPicker.' + o + ' não existe.');
					return false;
				}
				return instance[o].apply(instance, Array.prototype.slice(arguments, 1));
			}
			
			var instance = new fullScreenColorPicker(element, o);
			$(element).data('colorPickerInstance', instance);
			instance.init();
		});
	};
	
})(jQuery);