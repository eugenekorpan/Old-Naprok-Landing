$(document).ready(function(){
          var touch = $('#touch-menu');
             var menu = $('.top_menu');
          
             $(touch).on('click', function(e) {
                 e.preventDefault();
                 menu.slideToggle();
             });
             $(window).resize(function(){
                 var wid = $(window).width();
                 if(wid > 760 && menu.is(':hidden')) {
                     menu.removeAttr('style');
                 }
             });

                $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "../mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("success!");
            $("#form").trigger("reset");
        });
        return false;
    });
         });
      
 

 
