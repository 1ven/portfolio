$.fn.imDragSlider = function() {
  var $this, container, currentWidth, deltaX, descriptionWidth, draggedLen, firstImage, go, imagePos, imageWidth, imagesArr, index, move, offsetItem, offsetLeft, originalWidth, recomendationWidth, resizeRatio, wrap;
  $this = this;
  container = 0;
  offsetLeft = 0;
  move = 0;
  draggedLen = 0;
  index = $('.gr', $this).length > 0 ? -1 : 0;
  resizeRatio = 1;
  deltaX = null;
  currentWidth = null;
  imageWidth = null;
  descriptionWidth = null;
  recomendationWidth = null;
  originalWidth = $(window).width();
  wrap = $('.im-wrap', $this);
  offsetItem = 14;
  imagePos = 0;
  firstImage = true;
  imagesArr = [];
  if ($this.length > 0) {
    $(window).on('load resize', function() {
      currentWidth = $(window).width();
      imageWidth = $('.slide-src', $this).width();
      recomendationWidth = $('.gr', $this).width();
      descriptionWidth = $('.description', $this).width();
      imagePos = (offsetItem * 2 + descriptionWidth + recomendationWidth) - ((currentWidth - imageWidth) / 2);
      container = $('header .container').width();
      if (currentWidth > container) {
        offsetLeft = (currentWidth - container) / 2;
      } else {
        offsetLeft = 0;
      }
      resizeRatio = currentWidth / originalWidth;
      move = offsetLeft + resizeRatio * draggedLen;
      $('.im-left', $this).addClass('im-left_inactive');
      return wrap.css({
        transform: "translate(" + move + "px, 0px)"
      });
    });
    go = function(position) {
      var sliding;
      sliding = function() {
        $('.im-left, .im-right').removeClass('im-left_inactive im-right_inactive');
        draggedLen = -(imagePos + imageWidth * index + offsetItem * index);
        move = draggedLen;
        wrap.transition({
          transform: "translate(" + move + ", 0px)"
        });
        return console.log(index);
      };
      if (position === 'right') {
        if (index < $('.im-slide', $this).length - 1) {
          index++;
          sliding();
          if (index === $('.im-slide', $this).length - 1) {
            return $('.im-right', $this).addClass('im-right_inactive');
          }
        }
      } else if (position === 'left') {
        if (index > 0) {
          index--;
          return sliding();
        } else if (index === 0) {
          index--;
          move = offsetLeft;
          wrap.transition({
            transform: "translate(" + move + "px, 0px)"
          });
          return $('.im-left', $this).addClass('im-left_inactive');
        }
      }
    };
    wrap.on('dragstart', function(e) {
      return e.preventDefault();
    });
    wrap.on('mousedown', function(e) {
      var startX;
      startX = e.pageX;
      return $(this).on('mousemove', function(e) {
        var moveX;
        moveX = e.pageX;
        deltaX = moveX - startX;
        return wrap.css({
          transform: "translate(" + (move + deltaX) + "px, 0px)"
        });
      });
    });
    wrap.on('mouseup mouseover', function() {
      return $(this).off('mousemove');
    });
    wrap.on('mouseup', function() {
      if (index === -1 && deltaX > 0) {
        move = offsetLeft;
        return wrap.transition({
          x: move
        });
      } else if (index === $('.im-slide', $this).length - 1 && deltaX < 0) {
        draggedLen = -(imagePos + imageWidth * ($('.im-slide', $this).length - 1) + offsetItem * ($('.im-slide', $this).length - 1));
        move = draggedLen;
        return wrap.transition({
          x: move
        });
      } else {
        wrap.transition;
        if (Math.abs(deltaX) > $(window).width() / 7) {
          if (deltaX > 0) {
            return go('left');
          } else if (deltaX < 0) {
            return go('right');
          }
        } else {
          return wrap.transition({
            x: move
          });
        }
      }
    });
    $('.im-right', $this).on('click', function(e) {
      e.preventDefault();
      return go('right');
    });
    return $('.im-left', $this).on('click', function(e) {
      e.preventDefault();
      return go('left');
    });
  }
};
