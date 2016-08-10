$('.s-team .im-slider').imSlider();

$('.s-cost .im-slider').imSlider();

$('.s-reviews .im-slider').imSlider();

$('.s-bonus .im-slider').imSlider();

$('.s-cost .im-slider .im-slide ul').each(function() {
  var i, li, pad, parent, _i, _ref, _results;
  parent = $(this);
  li = $('li', parent);
  pad = 0;
  _results = [];
  for (i = _i = 0, _ref = li.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    pad += 4;
    _results.push(li.eq(i).css({
      paddingLeft: pad
    }));
  }
  return _results;
});

$('.s-team .im-controls, .s-bonus .im-controls').addClass('_orng');

$('.s-team .im-nav, .s-bonus .im-nav').addClass('_wht');

$.fn.brigadaPopup = function() {
  var $this;
  $this = this;
  $this.on('click', function(e) {
    var id;
    e.preventDefault();
    id = $(this).data('id');
    return $(".g-popups " + id).addClass('_visible');
  });
  return $('.g-popups .popup').on('click', function(e) {
    if (!$(e.target).hasClass('popup-wrap') && !$(e.target).parents('.popup-wrap').length) {
      return $('.g-popups .popup').removeClass('_visible');
    }
  });
};

$('.g-pop').brigadaPopup();

$.fn.cDown = function() {
  var $this, date;
  $this = this;
  date = new Date($this.data('time') * 1000);
  return $this.countdown({
    until: date
  });
};

$('.s-poster .count').cDown();

$('.s-bonus .im-wrap > .im-slide').each(function() {
  return $('.count-wrap', $(this)).cDown();
});
