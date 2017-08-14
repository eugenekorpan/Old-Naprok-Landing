function myFunction() {
    var x = document.getElementById('nav');
    if (x.className === 'nav') {
        x.className += ' responsive';
    } else {
        x.className = 'nav';
    }
}

 $(document).ready(function(){
    $(".nav, .button").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });

        $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("success!");
            $("#form").trigger("reset");
        });
        return false;
    });
});

jQuery(function($) {
            $(window).scroll(function(){
                if($(this).scrollTop()>690){
                    $('.top-line').addClass('fixed');

                }
                else if ($(this).scrollTop()<690){
                    $('.top-line').removeClass('fixed');
                }
            });
        });