(function ($) {
    $(document).ready(function () {
    
        $('.date-start-input').datepicker({
        format:'YYYY-MM-DD'
        });

        $('.date-end-input').datepicker({
            format:'YYYY-MM-DD'
            });
        


        var dataurl = '/analisis-chart'
        var datasets = {}
        $.ajax({
            method:'GET',
            url: dataurl,
            success: function(data){
                datasets = data
                
                
            }
        })
    });
})(jQuery);