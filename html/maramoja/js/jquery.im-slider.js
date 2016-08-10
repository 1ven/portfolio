var __slice = [].slice;

(function($) {
  return $.fn.imSlider = function(options) {
    var $this, active, animation, animationTimeout, doSlideElementsAnimation, elementsArray, hideElements, i, main, nav, navActive, nextSlide, removeExcept, removeThisClasses, sumDelay, timeoutsArray, toElementsArray, _i, _ref;
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
      if (main.$this.data('nav') === true) {
        removeExcept(main.navItem, main.index, navActive);
      }
      if (options.moveCallback) {
        return options.moveCallback(main);
      }
    };
    main.nav = function() {
      removeExcept(main.navItem, main.index, navActive);
      removeExcept(main.slide, main.index, active);
      if (options.navCallback) {
        return options.navCallback(main);
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
          return main.nav();
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
        options.callback(main);
      }
      if (options.elementsAnimate) {
        sumDelay = 0;
        elementsArray = [];
        timeoutsArray = [];
        removeThisClasses = '';
        toElementsArray = function(arr) {
          return elementsArray.push(arr);
        };
        $.fn.cssAnimation = function(cl, duration) {
          var _this;
          _this = this;
          _this.css({
            'animation-duration': duration + "ms",
            "opacity": ""
          }).addClass("_animation " + cl);
          return setTimeout((function() {
            return _this.removeClass("_animation " + cl).css({
              'animation-duration': ''
            });
          }), duration);
        };
        main.addTransitionClass = function(el, cl) {
          el.css({
            opacity: ''
          }).addClass(cl);
          return removeThisClasses += " " + cl;
        };
        main.animationStep = function() {
          var delay, element, elements, index, tempArray, _j, _k, _len, _len1;
          index = arguments[0], delay = arguments[1], elements = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
          tempArray = [];
          for (_j = 0, _len = elements.length; _j < _len; _j++) {
            element = elements[_j];
            toElementsArray(element[0]);
          }
          timeoutsArray.push(setTimeout((function() {
            var _k, _len1, _results;
            _results = [];
            for (_k = 0, _len1 = elements.length; _k < _len1; _k++) {
              element = elements[_k];
              if (typeof element[2] === 'string') {
                _results.push(element[0].cssAnimation(element[2], element[1]));
              } else if (typeof element[2] === 'function') {
                _results.push(element[2](element[0], element[1]));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }), index === 1 ? delay : sumDelay + delay));
          for (_k = 0, _len1 = elements.length; _k < _len1; _k++) {
            element = elements[_k];
            tempArray.push(element[1]);
          }
          return sumDelay += delay + Math.min.apply(Math, tempArray);
        };
        hideElements = function(elements) {
          var element, _j, _len, _results;
          _results = [];
          for (_j = 0, _len = elements.length; _j < _len; _j++) {
            element = elements[_j];
            _results.push(element.css({
              opacity: 0
            }));
          }
          return _results;
        };
        doSlideElementsAnimation = function(slide, type, steps) {
          var element, step, timeout, _j, _k, _l, _len, _len1, _len2;
          if (type === 'in') {
            timeoutsArray = [];
            removeThisClasses = '';
            sumDelay = 0;
            elementsArray = [];
            for (i = _j = 0, _len = steps.length; _j < _len; i = ++_j) {
              step = steps[i];
              step(i + 1, slide);
            }
            return hideElements(elementsArray);
          } else if (type === 'out') {
            for (_k = 0, _len1 = timeoutsArray.length; _k < _len1; _k++) {
              timeout = timeoutsArray[_k];
              clearTimeout(timeout);
            }
            for (_l = 0, _len2 = elementsArray.length; _l < _len2; _l++) {
              element = elementsArray[_l];
              element.css({
                transition: "all 550ms ease-out",
                opacity: 0
              });
            }
            $('*', slide).removeClass(removeThisClasses);
            return setTimeout((function() {
              var _len3, _m, _results;
              _results = [];
              for (_m = 0, _len3 = elementsArray.length; _m < _len3; _m++) {
                element = elementsArray[_m];
                _results.push(element.css({
                  transition: '',
                  opacity: ''
                }));
              }
              return _results;
            }), 550);
          }
        };
        $('.im-slide, .im-controls, .im-nav', main.$this).on('click', '.im-right, .im-left, .im-nav-item', function(e) {
          var _this;
          _this = $(this);
          e.preventDefault();
          if (!_this.hasClass('im-nav-item_active')) {
            if (_this.hasClass('im-nav-item')) {
              main.index = _this.index();
            }
            doSlideElementsAnimation(main.slide.eq(main.index), 'out');
            return setTimeout((function() {
              if (_this.hasClass('im-left')) {
                main.move('left');
                if ($('.im-nav-item', $this).length > 0) {
                  removeExcept(main.navItem, main.index, navActive);
                }
              } else if (_this.hasClass('im-right')) {
                main.move('right');
                if ($('.im-nav-item', $this).length > 0) {
                  removeExcept(main.navItem, main.index, navActive);
                }
              } else if (_this.hasClass('im-nav-item')) {
                main.nav();
              }
              return doSlideElementsAnimation(main.slide.eq(main.index), 'in', options.elementsAnimate(main)[main.index]);
            }), 550);
          }
        });
        return doSlideElementsAnimation(main.slide.eq(0), 'in', options.elementsAnimate(main)[0]);
      }
    }
  };
})(jQuery);
