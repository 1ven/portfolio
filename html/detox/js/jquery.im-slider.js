$.fn.imSlider = function(options) {
  var $this, active, animation, animationTimeout, i, main, nav, navActive, nextSlide, removeExcept, _i, _ref;
  $this = this;
  active = 'im-slide_active';
  navActive = 'im-nav-item_active';
  animationTimeout = null;
  main = {};
  main.slide = $(' > .im-wrap > .im-slide', $this);
  main.index = 0;
  main.prevIndex = null;
  main.nextIndex = null;
  main.navItem = null;
  main.$this = $this;
  main.slideLength = main.slide.length;
  main.wrap = $(' > .im-wrap', $this);
  main.move = function(direction) {
    if (direction === 'left') {
      if (main.index === 0) {
        main.index = main.slideLength - 1;
      } else {
        main.index--;
      }
      if (main.$this.data('animation')) {
        animation('left');
      }
    } else if (direction === 'right') {
      if (main.index === main.slideLength - 1) {
        main.index = 0;
      } else {
        main.index++;
      }
      if (main.$this.data('animation')) {
        animation('right');
      }
    }
    removeExcept(main.slide, main.index, active);
    if ($this.data('nav') === true) {
      return removeExcept(main.navItem, main.index, navActive);
    }
  };
  if ($this.length > 0) {
    if (typeof options === 'undefined') {
      options = {};
    }
    main.slide.eq(0).addClass('im-slide_active');
    if ($this.data('transtitionDuration')) {
      main.transitionDuration = $this.data('transtitionDuration');
    } else {
      main.transitionDuration = 1000;
    }
    animation = function(direction) {
      var current, movingSlide;
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      movingSlide = main.slide.eq(main.index);
      if (direction === 'right') {
        current = movingSlide.prev();
      } else if (direction === 'left') {
        current = movingSlide.next();
      }
      current.css({
        transition: "all " + main.transitionDuration + "ms ease-out"
      });
      movingSlide.css({
        transition: "all " + main.transitionDuration + "ms ease-out"
      });
      return animationTimeout = setTimeout((function() {
        current.css({
          transition: ""
        });
        return movingSlide.css({
          transition: ""
        });
      }), main.transitionDuration);
    };
    removeExcept = function(el, i, cl, ex) {
      if (!ex) {
        el.eq(i).addClass(cl);
        return el.not(el.eq(i)).removeClass(cl);
      }
    };
    if ($this.data('nav') === true && main.slideLength > 1) {
      $this.append('<div class="im-nav"><div class="im-nav-wrap"></div></div>');
      nav = $('.im-nav-wrap', $this);
      for (i = _i = 0, _ref = main.slideLength; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        nav.append('<a href="#" class="im-nav-item"></a>');
      }
      main.navItem = $(' > .im-nav > .im-nav-wrap > .im-nav-item', $this);
      main.navItem.eq(0).addClass(navActive);
      $(' > .im-nav', $this).on('click', '.im-nav-item', function(e) {
        e.preventDefault();
        main.index = $(this).index();
        removeExcept(main.navItem, main.index, navActive);
        return removeExcept(main.slide, main.index, active);
      });
    }
    if ($this.data('mousewheel') === true) {
      nextSlide = true;
      $this.on('mousewheel wheel', function(e) {
        var timer;
        e.preventDefault();
        clearTimeout(timer);
        if (nextSlide === true) {
          if (e.originalEvent.deltaY > 0 && main.index < main.slideLength - 1) {
            main.move('right');
          } else if (e.originalEvent.deltaY < 0 && main.index > 0) {
            main.move('left');
          }
        }
        nextSlide = false;
        return timer = setTimeout((function() {
          return nextSlide = true;
        }), 400);
      });
    }
    if ($this.data('controls') === true) {
      $this.append('<div class="im-controls"><a href="#" class="im-left"></a><a href="#" class="im-right"></a></div>');
      $(' > .im-controls', $this).on('click', '.im-left', function(e) {
        e.preventDefault();
        return main.move('left');
      });
      $(' > .im-controls', $this).on('click', '.im-right', function(e) {
        e.preventDefault();
        return main.move('right');
      });
    }
    if (options.callback) {
      return options.callback(main);
    }
  }
};
