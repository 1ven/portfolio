$.fn.imPopup = function() {
  var $this, id;
  $this = this;
  id = '';
  $this.on('click', function(e) {
    e.preventDefault();
    id = $(this).data('id');
    return $(".im-popups " + id).addClass('im-popup_visible');
  });
  return $('.im-popup').on('click', function(e) {
    if (!$(e.target).hasClass('b-popup') && !$(e.target).parents('.b-popup').length || $(e.target).hasClass('close')) {
      return $(".im-popups " + id).removeClass('im-popup_visible');
    }
  });
};

$('.im-popup-link').imPopup();

$('.b-popup .close').click(function(e) {
  return e.preventDefault();
});

$('.s-item-b .col-wrap').owlCarousel({
  items: 4,
  margin: 10,
  responsive: {
    980: {
      items: 4
    },
    1200: {
      items: 5
    }
  },
  nav: true,
  navText: ['', '']
});

if ($('.p-main').length) {
  $('.b-slider').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    navText: ['', '']
  });
}

$(window).load(function() {
  return $('.s-main-b .items-wrap').masonry({
    itemSelector: '.b-item-b',
    singleMode: true,
    isResizable: true
  });
});

$('.b-links .link_menu').click(function() {
  return $('.b-fw-menu').addClass('b-fw-menu_visible');
});

$('.b-links .link_close').click(function() {
  return $('.b-fw-menu').removeClass('b-fw-menu_visible');
});

$('.b-big-item .sm-link').click(function(e) {
  var bigItem, index, smallItem;
  e.preventDefault();
  index = $(this).parent().index();
  bigItem = $('.b-big-item .big');
  smallItem = $('.b-big-item .sm-link');
  bigItem.removeClass('big_active');
  smallItem.removeClass('sm-link_active');
  bigItem.eq(index).addClass('big_active');
  return smallItem.eq(index).addClass('sm-link_active');
});
