
window.APP = (function (module, $) {
    "use strict";

    var m = module;

    m.progressBar = {}; // progress bar module

    /**
      * @desc count how many items within progress bar list and apply css class
    */
    var setupLayout = function () {
        var cssClass = 'progress-bar--items_',
            i = 1;

        while(i < $('.progress-bar__list-item').length) {
            i++;
        }

        $('.progress-bar').addClass(cssClass + i);
    };

    var currentSection = 5; // assuming this will come from angular
    var updateProgressBar = function() {
        var progressWidth = (currentSection / $('.progress-bar__list-item').length) * 100;

        progressWidth = Math.floor(progressWidth) + '%'

        $('.progress-bar .progress').width(progressWidth);
    }

    // modules to fire on pageload
    m.progressBar.init = function () {

        if($('.progress-bar').length === 0) {
            return true;
        }
        
        setupLayout();
        updateProgressBar();
    };

    return module;

})(window.APP || {}, window.jQuery);