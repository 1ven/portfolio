var timeout;

$('.b-slider').imSlider({
  paging: true
});

$('.b-item .text').dotdotdot();

$('.b-review .text').dotdotdot();

timeout = void 0;

$(window).on('resize', function() {
  clearTimeout(timeout);
  return timeout = setTimeout((function() {
    $('.b-item .text').dotdotdot();
    return $('.b-review .text').dotdotdot();
  }), 300);
});

$('.b-work_slider .slider').imSlider({
  paging: true
});

$('.b-win-slider').each(function() {
  return $(this).imSlider({
    paging: true,
    controls: true
  });
});

$('.b-box-b .tab').click(function(e) {
  var index, parent;
  e.preventDefault();
  parent = $(this).parents('.b-box-b');
  index = $(this).index();
  $('.tab', parent).removeClass('tab_active');
  $(this).addClass('tab_active');
  $('.tab-inside').removeClass('tab-inside_active');
  return $('.tab-inside').eq(index).addClass('tab-inside_active');
});
