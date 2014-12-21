
window.APP = (function (module, $) {
    "use strict";

    var m = module;

    m.form = {}; // form module

    /**
      * @desc form tooltip
    */
    var tooltip = function () {
        var $input = $('[data-hastooltip]');

        // for each input with tooltip. add trigger to show/hide tooltip
        $input.each(function(i) {
            var id = $(this).attr('id'),
                $label = $('label[for="' + id + '"]');

            $('<a href="#" data-index="' + i + '" class="tooltip-trigger"><span class="icon-help"></span><span>more information</span></a>').insertAfter($label);
        });


        // bind events
        $input
            .on('focus', function() {
                var $tooltip = $(this).next('.tooltip');

                $tooltip.addClass('tooltip--active-focus');
            })
            .on('focusout', function() {
                var $tooltip = $(this).next('.tooltip');

                $tooltip.removeClass('tooltip--active-focus');
            });
     

        $('.tooltip-trigger').on('click', function(e) {
            e.preventDefault();

            var i = $(this).data('index'),
                $tooltip = $('.tooltip').eq(i);

            if($tooltip.hasClass('tooltip--active')) {
                $tooltip.removeClass('tooltip--active');
            }
            else {
                $tooltip.addClass('tooltip--active');
            }
        })

    };

    /**
      * @desc setup form datepicker
    */
    var formDatepicker = function () {
        if ($.fn.datepicker) {
            $('.form .field--datepicker').datepicker({
                dateFormat: 'dd/mm/yy',
                minDate: '+0d',
                onClose: function (dateText, inst) {
                    $(this).attr("readonly", false);
                },
                beforeShow: function (input, inst) {
                    $(this).attr("readonly", true).blur();
                }
            });
        }

    };

    // modules to fire on pageload
    m.form.init = function () {

        if($('.form').length === 0) {
            return true;
        }
        
        tooltip();
        formDatepicker();
    };

    return module;

})(window.APP || {}, window.jQuery);