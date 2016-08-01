var selector, elems, makeActive;

selector = '.navigation li a[href^="/' + location.pathname.split("/")[1] + '"]';
elems = document.querySelectorAll(selector);

makeActive = function () {
  elems[0].classList.add('active');
};
