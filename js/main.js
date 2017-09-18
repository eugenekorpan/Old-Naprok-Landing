/*  $(document).ready(function() {
      $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage'],
        sectionsColor: ['', '#153F65', '#EDF4FE', '#70BDF2', '#EDF4FE', '#70BDF2'],
        scrollOverflow: true,
        navigation: true,
        slidesNavigation: true,
        controlArrows: false,
        menu: '#menu'
      });
    });

*/

$(document).ready(function() {
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
});