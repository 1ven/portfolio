$.fn.imSlider = function() {
  var active, animation, ctrLeft, ctrRight, i, move, moveLeft, moveRight, nav, navItem, pagination, removeExcept, slide, slideActive, slideCount, slider, _i, _ref;
  slider = this;
  ctrLeft = $('.im-controls > .im-left', slider);
  ctrRight = $('.im-controls > .im-right', slider);
  slide = $('.im-wrap > .im-slide', slider);
  slideActive = $('.im-wrap > .im-slide_active', slider);
  active = 'im-slide_active';
  move = 0;
  slide.eq(0).addClass('im-slide_active').css({
    'transition': 'none'
  });
  $(window).load(function() {
    return slide.eq(0).css({
      'transition': ''
    });
  });
  animation = function(direction, current) {
    current.removeClass(active);
    return direction.addClass(active);
  };
  removeExcept = function(el, i, cl, ex) {
    if (!ex) {
      el.eq(i).addClass(cl);
      return el.not(el.eq(i)).removeClass(cl);
    }
  };
  moveRight = function() {
    return $('.im-controls', slider).on('click', '.im-right', function(e) {
      var current;
      e.preventDefault();
      if ($('.im-slide_active', slider).is(':last-child')) {
        if (!slider.data('thumb-nav')) {
          current = $('.im-slide_active', slider);
          animation(slide.eq(0), current);
        }
        if (slider.data('nav') === true) {
          removeExcept($('.im-nav-item', slider), $('.im-slide_active', slider).index(), 'im-nav-item_active');
        }
        if (slider.data('pagination') === true) {
          return pagination();
        }
      } else {
        current = $('.im-slide_active', slider);
        animation(current.next(), current);
        if (slider.data('thumb-nav') === true) {
          $('.im-nav-item_active', slider).next().addClass('im-nav-item_active');
          $('.im-nav-item_active', slider).prev().removeClass('im-nav-item_active');
          if ($('.im-nav-item_active', slider).index() % 4 === 0) {
            move -= 300;
            $('.im-items-wrap', slider).animate({
              top: move
            });
          }
        }
        if (slider.data('nav') === true) {
          removeExcept($('.im-nav-item', slider), $('.im-slide_active', slider).index(), 'im-nav-item_active');
        }
        if (slider.data('pagination') === true) {
          return pagination();
        }
      }
    });
  };
  moveLeft = function() {
    return $('.im-controls', slider).on('click', '.im-left', function(e) {
      var current;
      e.preventDefault();
      if ($('.im-slide_active', slider).is(':first-child')) {
        if (!slider.data('thumb-nav')) {
          current = $('.im-slide_active', slider);
          animation(slide.eq(-1), current);
        }
        if (slider.data('nav') === true) {
          removeExcept($('.im-nav-item', slider), $('.im-slide_active', slider).index(), 'im-nav-item_active');
        }
        if (slider.data('pagination') === true) {
          return pagination();
        }
      } else {
        current = $('.im-slide_active', slider);
        animation(current.prev(), current);
        if (slider.data('thumb-nav') === true) {
          $('.im-nav-item_active', slider).prev().addClass('im-nav-item_active');
          $('.im-nav-item_active', slider).next().removeClass('im-nav-item_active');
          if (($('.im-nav-item_active', slider).index() + 1) % 4 === 0) {
            move += 300;
            $('.im-items-wrap', slider).animate({
              top: move
            });
          }
        }
        if (slider.data('nav') === true) {
          removeExcept($('.im-nav-item', slider), $('.im-slide_active', slider).index(), 'im-nav-item_active');
        }
        if (slider.data('pagination') === true) {
          return pagination();
        }
      }
    });
  };
  if (slider.data('nav') === true) {
    slider.append('<ul class="im-nav"></ul>');
    nav = $('.im-nav', slider);
    for (i = _i = 0, _ref = slide.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      nav.append('<li class="im-nav-item"></li>');
    }
    navItem = $('.im-nav-item', nav);
    navItem.eq(0).addClass('im-nav-item_active');
    $('.im-nav', slider).on('click', '.im-nav-item', function() {
      var index;
      index = $(this).index();
      $(this).addClass('im-nav-item_active');
      $(navItem).not(this).removeClass('im-nav-item_active');
      slide.eq(index).addClass(active);
      return slide.not(slide.eq(index)).removeClass(active);
    });
  }
  if (slider.data('pagination') === true) {
    slider.append('<div class="im-status"><div class="wrap"><span class="disp">Проект&nbsp;</span><span class="current"></span><span class="disp">&nbsp;из&nbsp;</span><span class="amount"></span></div></div>');
    slideCount = $('.im-wrap > .im-slide', slider).length;
    $('.im-status .amount', slider).text(slideCount);
    pagination = function() {
      var activeIndex;
      activeIndex = $('.im-wrap > .im-slide_active', slider).index() + 1;
      return $('.im-status .current', slider).text("" + activeIndex);
    };
    pagination();
  }
  if (slider.data('controls') === 'right') {
    slider.append('<div class="im-controls"><a href="#" class="im-right"></a></div>');
    return moveRight();
  } else if (slider.data('controls') === 'left') {
    slider.append('<div class="im-controls"><a href="#" class="im-left"></a></div>');
    moveLeft();
    return moveRight();
  } else if (slider.data('controls') === 'both') {
    slider.append('<div class="im-controls"><a href="#" class="im-left"></a><a href="#" class="im-right"></div>');
    moveLeft();
    return moveRight();
  }
};
