var getRegularPolygonCoords, setCirclesPosition;

$('.s-main-a .slider').owlCarousel({
  items: 1,
  loop: true
});

(function() {
  var time;
  time = new Date($('.b-counter').data('timestamp') * 1000);
  return $('.b-counter').countdown(time, function(event) {
    $('.item_days .item-val', $(this)).text(event.strftime('%D'));
    $('.item_hours .item-val', $(this)).text(event.strftime('%H'));
    $('.item_minutes .item-val', $(this)).text(event.strftime('%M'));
    return $('.item_seconds .item-val', $(this)).text(event.strftime('%S'));
  });
})();

$('.b-menu .open, .b-menu .menu-close').click(function(e) {
  e.preventDefault();
  $('.b-menu .open').addClass('open_hover');
  return $('.b-menu .menu').fadeToggle(200);
});

$('body').on('click', function(e) {
  return !$(e.target).parents('.b-menu').length && ($('.b-menu .menu').fadeOut(200));
});

$('.b-menu .open').on('mouseover', function() {
  return $(this).addClass('open_hover');
}).on('mouseout', function() {
  return $(this).removeClass('open_hover');
});

$.fn.scrollTo = function() {
  var button, element, offset;
  button = $(this);
  element = $(button.data('scroll-to'));
  offset = element.offset().top;
  return button.click(function(e) {
    e.preventDefault();
    return $('html, body').animate({
      scrollTop: offset
    });
  });
};

$(window).load(function() {
  return $('[data-scroll-to]').each(function() {
    return $(this).scrollTo();
  });
});

$('.s-main-e .im-slider').imSlider();

getRegularPolygonCoords = function(pointsCount, radius) {
  var coordsArray, i, j, ref, x, y;
  coordsArray = [];
  for (i = j = ref = pointsCount; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
    x = -radius * Math.sin(2 * 3.14 * i / pointsCount);
    y = -radius * Math.cos(2 * 3.14 * i / pointsCount);
    coordsArray.push({
      x: radius - Math.round(x),
      y: Math.round(y) + radius
    });
  }
  return coordsArray;
};

setCirclesPosition = function() {
  var bigCircleWidth, coords;
  bigCircleWidth = $('.b-program .icons').outerWidth(true);
  $('.b-program .icons, .b-program .item-image-wrap').css({
    height: bigCircleWidth
  });
  coords = getRegularPolygonCoords(23, bigCircleWidth / 2);
  return $('.b-program').each(function() {
    var i, icons, j, offset, ref, results;
    icons = $('.circle .circle-icon', $(this));
    results = [];
    for (i = j = 0, ref = icons.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      offset = 22;
      results.push(icons.eq(i).css({
        top: coords[i].y - offset,
        left: coords[i].x - offset
      }));
    }
    return results;
  });
};

$(window).on('resize', setCirclesPosition);

$(window).ready(setCirclesPosition);

$('.b-program .circle-icon').click(function(e) {
  var index, parent;
  e.preventDefault();
  parent = $(this).parents('.b-program');
  index = $(this).index();
  $('.circle-icon', parent).removeClass('circle-icon_active');
  $('.circle-icon', parent).eq(index).addClass('circle-icon_active');
  $('.item', parent).removeClass('item_active');
  return $('.item', parent).eq(index).addClass('item_active');
});
