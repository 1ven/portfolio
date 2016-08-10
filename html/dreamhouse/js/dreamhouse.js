jQuery(function($) {
  (function() {
    var nextIndex, prevIndex;
    prevIndex = null;
    nextIndex = null;
    return $('.p-project .b-slider, .p-main .s-tmpl-b .b-slider').imSlider({
      callback: function(main) {
        var addPrevNextClasses;
        addPrevNextClasses = function(el) {
          if (main.index === main.slideLength - 1) {
            nextIndex = 0;
          } else {
            nextIndex = main.index + 1;
          }
          prevIndex = main.index - 1;
          main.slide.removeClass('im-slide_prev im-slide_next');
          main.slide.eq(prevIndex).addClass('im-slide_prev');
          return main.slide.eq(nextIndex).addClass('im-slide_next');
        };
        addPrevNextClasses($('.im-slide_active', main.wrap));
        return $(' > .im-controls, > .im-nav', main.$this).on('click', '.im-left, .im-right, .im-nav-item', function() {
          return addPrevNextClasses($('.im-slide_active', main.wrap));
        });
      }
    });
  })();
  $('.p-project .b-slider-a').imSlider();
  $.fn.projectSlider = function() {
    var $this, index;
    $this = this;
    index = 0;
    if ($this.length > 0) {
      return $(window).on('load resize', function() {
        var imgHeight, move, slide;
        slide = $('.slides-inside > a', $this);
        $('.slides-wrap, .slides-wrap-a', $this).css({
          height: ''
        });
        imgHeight = $('.main-img', $this).height();
        $('.slides-wrap-a', $this).css({
          height: (slide.eq(1).outerHeight(true) - slide.eq(1).outerHeight()) + (slide.eq(1).outerHeight() * 2)
        });
        $('.slides-wrap', $this).css({
          height: imgHeight
        });
        $('.slides-wrap', $this).animate({
          opacity: 1
        });
        $('.slides-inside', $this).css({
          top: -slide.eq(1).outerHeight(true) * index
        });
        move = function(direction) {
          if (direction === 'up' && index > 0) {
            index--;
          } else if (direction === 'down' && index >= 0 && index < slide.length - 2) {
            index++;
          }
          return $('.slides-inside', $this).stop().animate({
            top: -slide.eq(1).outerHeight(true) * index
          }, 200);
        };
        $('.go_down', $this).on('click', function(e) {
          e.preventDefault();
          return move('down');
        });
        return $('.go_up', $this).on('click', function(e) {
          e.preventDefault();
          return move('up');
        });
      });
    }
  };
  $('.b-project').each(function() {
    return $(this).projectSlider();
  });
  $('.p-projects .s-projects-a select').each(function() {
    return $(this).imSbox();
  });
  $('.p-constructor .b-constructor select').each(function() {
    return $(this).imSbox();
  });
  (function() {
    if ($('.b-expl').length > 0) {
      $(window).on('load', function() {
        return $('.b-project .b-expl').fadeIn();
      });
      return $('.b-expl .list').each(function() {
        var $this, li, liHeight;
        $this = $(this);
        li = $('li', $this);
        liHeight = null;
        return $(window).on('load resize', function() {
          var allowedLen;
          $this.removeClass('list_overflow');
          if (window.innerWidth < 1280) {
            allowedLen = 12;
          } else if (window.innerWidth >= 1280 && window.innerWidth <= 1600) {
            allowedLen = 8;
          } else if (window.innerWidth > 1600) {
            allowedLen = 9;
          }
          if (li.length > allowedLen) {
            return $this.addClass('list_overflow');
          }
        });
      });
    }
  })();
  (function() {
    if ($('.b-comment').length > 0) {
      return $('.b-comment .b-btn-a_comment').on('click', function(e) {
        e.preventDefault();
        return $('form', $(this).parents('.b-comment')).slideToggle();
      });
    }
  })();
  (function() {
    if ($('.s-profile-b').length > 0) {
      return $('.s-profile-b .submit').on('click', function(e) {
        e.preventDefault();
        return $('.s-profile-b').slideToggle();
      });
    }
  })();
  (function() {
    var i, leftBlock, len, listItem, sum, _i, _results;
    if ($('.p-main').length > 0) {
      leftBlock = $('.s-main-a .left-a');
      listItem = $('.b-list li', leftBlock);
      len = listItem.length;
      sum = null;
      _results = [];
      for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
        sum = 40 * len;
        _results.push(listItem.eq(i).css({
          right: sum - (i * 40)
        }));
      }
      return _results;
    }
  })();
});
