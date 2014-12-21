
window.APP = (function (module, $) {
    "use strict";

    var m = module;

    m.bookingForm = {}; // booking form module

    /**
      * @desc show hide room rows dependent on number of rooms specified
      * each room row contains selects for adult, child & infant
    */
    var roomsSelector = function () {
        var gtThanMaxRoomsBookable = '10+',
            $numRoomsSelect = $('.field--num-rooms'),
            $roomRows = $('.form-row--occupants-select--additional'); // all room rows AFTER the first one


        // bind events
        $numRoomsSelect
            .on('change', function() {
                var number = this.value;
                _showRoomRows(number);  
            });

        // show specified number of room rows
        var _showRoomRows = function(number) {
            $roomRows.removeClass('form-row--occupants-select--visible');

            if(number == gtThanMaxRoomsBookable) {
                return;    
            }

            for(var i = 0; i < number - 1; i++) {
                $roomRows.eq(i).addClass('form-row--occupants-select--visible');
            }
        }
    };

   

    // modules to fire on pageload
    m.bookingForm.init = function () {

        if($('.form--booking-form').length === 0) {
            return true;
        }
        
        roomsSelector();
    };

    return module;

})(window.APP || {}, window.jQuery);