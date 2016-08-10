var alignDropdown, eqHeight, projectPopupWidth;

$('.p-main > .im-slider').imSlider({
  callback: function(main) {
    main.navItem.on('click', function() {
      main.wrap.removeClass();
      return main.wrap.addClass("im-wrap im-id-" + ($(this).index()));
    });
    return main.$this.on('touchstart', function(e) {
      var startY;
      startY = event.targetTouches[0].pageY;
      return $(this).on('touchmove', function(e) {
        var deltaY;
        deltaY = event.targetTouches[0].pageY - startY;
        if (Math.abs(deltaY) > 10) {
          if (deltaY < 0 && main.index < main.slideLength - 1) {
            main.move('right');
          } else if (deltaY > 0 && main.index > 0) {
            main.move('left');
          }
        }
        return $(this).off('touchmove');
      });
    });
  },
  moveCallback: function(main) {
    main.wrap.removeClass();
    return main.wrap.addClass("im-wrap im-id-" + main.index);
  }
});

projectPopupWidth = function() {
  if ($('.p-projects').length > 0) {
    return $('.b-popup-b').each(function() {
      var $this, imageRatio, recomendationRatio, sliderHeight, subHeight, topHeight, windowHeight, wrapMargin;
      $this = $(this);
      imageRatio = $('.slide-src').width() / $('.slide-src').height();
      recomendationRatio = $('.gr-src').width() / $('.gr-src').height();
      topHeight = $('.top', $this).outerHeight(true);
      subHeight = $('.sub', $this).outerHeight(true);
      wrapMargin = $('.wrap', $this).outerHeight(true) - $('.wrap', $this).height();
      windowHeight = $(window).height();
      sliderHeight = windowHeight - (topHeight + subHeight + wrapMargin);
      $('.inside-wrap', $this).css({
        height: sliderHeight
      });
      $('.slide-src', $this).parent().css({
        width: sliderHeight * imageRatio
      });
      return $('.gr-src', $this).parent().css({
        width: sliderHeight * recomendationRatio
      });
    });
  }
};

$(window).on('load resize', function() {
  return projectPopupWidth();
});

$('.b-compl .im-slider').imSlider();

$('.s-systems-c .im-slider').imSlider();

$('.b-popup-b .im-drag-slider').each(function() {
  return $(this).imDragSlider();
});

$('.p-main .b-proj-slider.im-slider').imSlider();

$('.p-main .b-service-slider.im-slider').imSlider();

$('#move-up').on('click', function(e) {
  e.preventDefault();
  return $('body, html').animate({
    scrollTop: 0
  });
});

eqHeight = function() {
  var arr, i, item, len, max, _i;
  item = $('.b-compl .im-slide_active .item');
  len = item.length;
  arr = [];
  for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
    arr.push(Math.round(item.eq(i).height()));
  }
  max = Math.max.apply(Math, arr);
  return item.height(max);
};

$('.b-compl .im-nav').on('click', '.im-nav-item', function() {
  return eqHeight();
});

eqHeight();

(function() {
  $('.b-items-d .left-link').on('click', function(e) {
    var parent;
    e.preventDefault();
    $('body').css({
      overflow: 'hidden'
    });
    parent = $(this).parents('.item');
    return $('.b-popup-a', parent).addClass('_visible');
  });
  return $('.b-popup-a .back').on('click', function(e) {
    e.preventDefault();
    $('body').css({
      overflow: ''
    });
    return $(this).parents('.b-popup-a').removeClass('_visible');
  });
})();

(function() {
  $('.b-proj .b-btn-a').on('click', function(e) {
    var parent;
    e.preventDefault();
    parent = $(this).parents('.b-proj');
    return $('.b-popup-b', parent).addClass('_visible');
  });
  return $('.b-proj .back').on('click', function(e) {
    e.preventDefault();
    return $(this).parents('.b-popup-b').removeClass('_visible');
  });
})();

(function() {
  var needWrap;
  needWrap = true;
  return $(window).on('load resize', function() {
    if (window.innerWidth < 1150) {
      if (needWrap === true) {
        $('header nav > .link:lt(3)').wrapAll('<div class="dropdown _dr-wrapped"></div>');
        $('header nav .dropdown._dr-wrapped').wrapAll('<span class="link _drop _wrapped">Продукция</span>');
        return needWrap = false;
      }
    } else {
      $('header nav ._dr-wrapped .link').unwrap();
      $('header nav > ._wrapped > .link').unwrap();
      $('header nav').contents().filter(function() {
        return this.nodeType === 3;
      }).remove();
      return needWrap = true;
    }
  });
})();

$.fn.imPopup = function() {
  var $this, id;
  $this = this;
  id = '';
  $this.on('click', function(e) {
    e.preventDefault();
    id = $(this).data('id');
    return $(".im-popups " + id).addClass('_visible');
  });
  return $('.im-popup').on('click', function(e) {
    if (!$(e.target).hasClass('b-popup') && !$(e.target).parents('.b-popup').length) {
      return $(".im-popups " + id).removeClass('_visible');
    }
  });
};

$('.b-popup .close').on('click', function(e) {
  e.preventDefault();
  return $(this).parents('.im-popup').removeClass('_visible');
});

$('.im-popup-link').imPopup();

alignDropdown = function() {
  return $('nav .dropdown').each(function() {
    var align, dropdownWidth, linkWidth;
    dropdownWidth = $(this).outerWidth();
    linkWidth = $(this).parent('.link').width();
    align = (dropdownWidth - linkWidth) / 2;
    return $(this).css({
      left: -align
    });
  });
};

$(window).on('load resize', function() {
  return alignDropdown();
});

$.fn.imScrollTo = function() {
  var $this, element, offset;
  $this = this;
  if ($this.length > 0) {
    element = $($this.data('scroll'));
    offset = element.offset().top;
    return $this.on('click', function(e) {
      var speed;
      e.preventDefault();
      if ($this.data('speed')) {
        speed = $this.data('speed');
      } else {
        speed = 400;
      }
      return $('body, html').animate({
        scrollTop: offset
      }, speed);
    });
  }
};

$(window).load(function () {
    $('.im-scroll-to').each(function() {
      return $(this).imScrollTo();
    });
});

$('.b-items-d .item .left-link').each(function() {
  var item;
  item = $(this).parents('.item');
  return $(this).on('click', function() {
    if (window.innerWidth < 1601) {
      return $('.b-popup-a', item).on('scroll', function() {
        if ($($('.b-popup-a', item)).scrollTop() > 60) {
          return $('.top').addClass('_gradient');
        } else {
          return $('.top').removeClass('_gradient');
        }
      });
    }
  });
});
