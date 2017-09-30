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

(function($){
  $(function() {
    $('.menu__icon').on('click', function() {
      $(this).closest('.menu').toggleClass('menu_state_open');
    });
  });
})(jQuery);
});

