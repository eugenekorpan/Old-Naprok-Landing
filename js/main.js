$(document).ready(function() {
      $('#fullpage').fullpage({
        anchors: ['home', 'about', 'why', 'screening', 'partners', 'contact'],
        sectionsColor: ['', '#6869BB', '#fff', '#6869BB', '#e7e6e6', '#6869BB'],
        navigation: true,
        slidesNavigation: true,
        controlArrows: false,
        menu: '#menu',
        responsiveWidth: 900,
        afterResponsive: function(isResponsive){
          
        }
      });

var movementStrength = 25;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
$(".header").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 - 25;
          var newvalueY = height * pageY * -1 - 50;
          $('.header').css("background-position", newvalueX+"px     "+newvalueY+"px");
});

(function($){
  $(function() {
    $('.menu__icon').on('click', function() {
      $(this).closest('.menu').toggleClass('menu_state_open');
    });
  });
})(jQuery);
});

