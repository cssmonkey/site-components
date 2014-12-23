;(function ( $, window, document, undefined ) {

	// defaults
	var pluginName = 'stepper',
        defaults = {
        	increment: 1
        };


 	// Plugin constructor
 	function Stepper(element, options) {
 		this.element = element;
 	
 		// merge default options with instance specific options
 		this.options = $.extend( {}, defaults, options);

 		this._defaults = defaults;
 		this._name = pluginName;

 		this.init();
 	};

 	Stepper.prototype.init = function() {
 
 		var _root = this,
 			_opts = this.options,
 			$input = $(this.element),
 			$controls = $('<div class="stepper__controls"><button class="stepper-control stepper-control--decrease">-</button><button class="stepper-control stepper-control--increase">+</button></div>'),
 			$container = $input.wrap('<div class="stepper"></div>').parent(),
 			currentVal = parseInt($input.val()),
 			invalid = false,
 			minVal = $input.attr("min") || _opts.min,
 			maxVal = $input.attr("max") || _opts.max;

 		$container.append($controls);

 		if(!isValid()) {
 			$input.val(minVal);
 			currentVal = parseInt($input.val());
 		}

		var _bindEvents = function() {
			$controls
				.on('click', '.stepper-control--decrease', function(e) {
					e.preventDefault();
					currentVal = parseInt($input.val());

					var newVal = currentVal - _opts.increment;

					if(newVal >= minVal) {
						$input.val(newVal);
					}

				}).on('click', '.stepper-control--increase', function(e) {
					e.preventDefault();
					currentVal = parseInt($input.val());

					var newVal = currentVal + _opts.increment;

					if(newVal <= maxVal) {
						$input.val(newVal);
					}
				});
			$input
				.on('change', function(e){
					currentVal = parseInt($(this).val());

					if(!isValid()) {
						console.log('trigger error message');
					}
					else if (isValid()) {
						console.log('remove error message');
						invalid = false;
					}
				});
		};

 		_bindEvents();

 		function isValid() {
 			if(isNaN(currentVal)) {
 				invalid = true;
 				return false;
 			}
 			else if(currentVal >= minVal && currentVal <= maxVal) {
 				return true;
 			}
 			else {
 				invalid = true;
 				return false;
 			}
 		}

 	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName )) {
                $.data(this, 'plugin_' + pluginName , 
                new Stepper( this, options));
            }
		});
	};

})( jQuery, window, document );