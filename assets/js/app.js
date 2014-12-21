
window.APP = (function (module, $) {
    "use strict";
    
    $(function(){ 
      module.form.init();
      module.bookingForm.init();
      $('input[type="number"]').stepper({min : 1, max: 5});
    });
    
    return module;
    

})(window.APP || {}, window.jQuery);

