var resetDriversView, setRideDetailsPanelWidth, toggleButton;

resetDriversView = function() {
  $('.b-driver-full .hidden-data').hide();
  $('.b-driver').css({
    opacity: ''
  }).show();
  $('.b-driver-full').slideUp(400);
  $('.b-ml-info').text('Show the car photo / More info');
  $('.b-ml-info').removeClass('b-ml-info_less');
  $('.b-ml-info').addClass('b-ml-info_more');
  return $('.b-driver-full .row-a_car .data').removeClass('data_hide-border');
};

$('.b-driver').on('click', function(e) {
  e.preventDefault();
  resetDriversView();
  $(this).css({
    opacity: 0
  }).slideUp(400);
  return $(this).next('.b-driver-full').slideDown(400);
});

(function() {
  return $('.b-ml-info').on('click', function(e) {
    var $this, driverFullBlock;
    e.preventDefault();
    $this = $(this);
    driverFullBlock = $this.parents('.b-driver-full');
    if ($this.hasClass('b-ml-info_more')) {
      $('.hidden-data', $this.parents('.b-driver-full')).slideDown(400);
      $('.row-a_car .data', driverFullBlock).addClass('data_hide-border');
      return setTimeout((function() {
        $this.text('Less info');
        $this.removeClass('b-ml-info_more');
        return $this.addClass('b-ml-info_less');
      }), 400);
    } else if ($this.hasClass('b-ml-info_less')) {
      $('.hidden-data', $this.parents('.b-driver-full')).slideUp(400);
      $('.row-a_car .data', driverFullBlock).removeClass('data_hide-border');
      return setTimeout((function() {
        $this.text('Show the car photo / More info');
        $this.removeClass('b-ml-info_less');
        return $this.addClass('b-ml-info_more');
      }), 400);
    }
  });
})();

$('.b-info-pane').click(function(e) {
  e.preventDefault();
  return $(this).fadeOut(200);
});

setRideDetailsPanelWidth = function() {
  return $('.b-bottom-pane').css({
    width: $('.b-drivers-list').width()
  });
};

$('.b-bottom-pane').on('click', function(e) {
  e.preventDefault();
  return $(this).next('.b-ride-details').fadeIn(130);
});

$('.b-ride-details .close').on('click', function(e) {
  e.preventDefault();
  return $(this).parents('.b-ride-details').fadeOut(130);
});

$(window).ready(function() {
  return $('.b-notifications .notify_bluenote').fadeIn();
});

setTimeout((function() {
  return $('.b-notifications .notify_bluenote').fadeOut();
}), 5000);

$('.b-notifications .notify').click(function() {
  return $(this).fadeOut();
});

$.fn.fixTitleWidth = function(offset) {
  return $(this).each(function() {
    return $(this).css({
      width: $(this).width() + offset,
      display: 'table-cell'
    });
  });
};

$(window).load(function() {
  $('.b-title .inside').fixTitleWidth(14);
  return $('.b-payment-details .inside').fixTitleWidth(14);
});

$(window).ready(setRideDetailsPanelWidth);

$(window).resize(setRideDetailsPanelWidth);

(function() {
  $.fn.imPopup = function() {
    var $this, id, parent;
    $this = this;
    id = '';
    parent = null;
    $this.on('click', function(e) {
      e.preventDefault();
      id = $(this).data('id');
      parent = $(".im-popups " + id);
      return parent.addClass('im-popup_visible');
    });
    $('.im-popup').on('click', function(e) {
      if (!$(e.target).hasClass('b-popup') && !$(e.target).parents('.b-popup').length) {
        return parent.removeClass('im-popup_visible');
      }
    });
    return $('.close', parent).click(function(e) {
      e.preventDefault();
      return parent.removeClass('im-popup_visible');
    });
  };
  if ($('.im-popup-link').length) {
    return $('.im-popup-link').imPopup();
  }
})();

toggleButton = function(button, onText, offText) {
  if (button.hasClass('b-bottom-pane_arr-down')) {
    button.removeClass('b-bottom-pane_arr-down');
    button.addClass('b-bottom-pane_arr-up');
    return button.text(onText);
  } else {
    button.removeClass('b-bottom-pane_arr-up');
    button.addClass('b-bottom-pane_arr-down');
    return button.text(offText);
  }
};

$('#sh-req-form').click(function() {
  $('.b-request-form').slideToggle();
  return toggleButton($(this), 'Show request form', 'Show map');
});

$('#sh-sel-driver').click(function() {
  $('.b-selected-driver').slideToggle();
  return toggleButton($(this), 'Show driver', 'Show map');
});
