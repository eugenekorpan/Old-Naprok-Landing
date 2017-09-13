  $(document).ready(function() {
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

