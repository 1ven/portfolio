$.fn.imPopup = function() {
	var $this, id;
	$this = this;
	id = '';
	$this.on('click', function(e) {
		e.preventDefault();
		id = $(this).data('id');
		$('body').css({
			overflow: 'hidden',
			paddingRight: window.innerWidth - $(window).width()
		});
		return $(".im-popups " + id).addClass('_visible');
	});
	$('.im-popup .js-close-popup').click(function(e) {
		return e.preventDefault();
	});
	return $('.im-popup').on('click', function(e) {
		if (!$(e.target).hasClass('im-popup-inside') && !$(e.target).parents('.im-popup-inside').length || $(e.target).hasClass('js-close-popup')) {
			$('body').css({
				overflow: '',
				paddingRight: ''
			});
			$('.b-project-popup').removeClass('b-project-popup_hidden_loader')
			return $(".im-popups " + id).removeClass('_visible');
		}
	});
};

// $('.im-popup-link').imPopup();

$('#show-more').click(function(e) {
	e.preventDefault();
	var parent = $(this).parents('section'),
		row = $('.row', parent),
		hiddenRows = $('.row_hidden', parent);
	row.eq(row.length - hiddenRows.length).removeClass('row_hidden');
	if (hiddenRows.length == 1) {
		$(this).remove();
	};
});

$('.s-tent-b .carousel').imSlider({
	paging: true,
	controls: false
});

$('.b-main-slider').imSlider({
	paging: true,
	controls: false,
	autoSlide: 4000,
    autoSlideStopOnHover: true,
    animationDuration: 1200,
	callback: function($this) {
		$('.im-paging-item', $this.root).wrapAll('<div class="container"></div>');
	}
});

var ProjectPopup = (function() {
  function ProjectPopup(id) {
  	var root = $('#project');
  	this.data = {
  		id: id,
  		root: root,
  		project: null,
  		titleNode: $('.b-title', root),
  		logoNode: $('.project-logo', root),
  		sliderNode: $('.b-proj-image-slider', root),
  		loadedImages: []
  	}
  	_this = this;
  	this.showLoader()
  	this.init(function() {
  		_this.fillPopup();
  		_this.handleSlider(_this.data.sliderNode);
  	});
  }
  ProjectPopup.prototype.showLoader = function() {
  	$('.b-project-popup', this.root).removeClass('b-project-popup_hidden_loader');
  };
  ProjectPopup.prototype.hideLoader = function() {
  	$('.b-project-popup', this.root).addClass('b-project-popup_hidden_loader');
  };
  ProjectPopup.prototype.init = function(callback) {
  	this.data.project = projects[this.data.id];
  	callback();
  };
  ProjectPopup.prototype.initImageLoadEvent = function(image, index) {
  	var _this = this;
  	image.on('load', function() {
  		_this.data.loadedImages[index] = true;
  		if (_this.data.loadedImages.indexOf(false) > -1) {
  			_this.hideLoader();
  		};
  	});
  };
  ProjectPopup.prototype.fillPopup = function() {
  	this.data.titleNode.html(this.data.project.title);
  	this.data.logoNode.attr('src', this.data.project.logo);
  	this.data.sliderNode.html('');
  	for (var i = 0; i < this.data.project.images.length; i++) {
  		var slide = $('<div class="slide"></div>'),
  			image = $('<img class="slide-image" src="'+this.data.project.images[i]+'" alt="" />'),
  			slideWithImage = slide.append(image);
  		this.data.loadedImages.push(false);
  		this.initImageLoadEvent(image, i);
  		this.data.sliderNode.append(slideWithImage);
  	};
  };
  ProjectPopup.prototype.handleSlider = function(slider) {
  	slider.imSlider({
  		controls: true,
  		paging: true,
        autoSlide: 4000,
        autoSlideStopOnHover: true,
  	});
  };

  return ProjectPopup;

})();

var ProjectsSwitcher = (function() {
	function ProjectsSwitcher() {
		this.data = {
			projectsNode: $('.b-project'),
			index: null,
			projectsLength: null
		};
		this.data.projectsLength = this.data.projectsNode.length;
		this.initProjectClickEvent();
		this.initMoveEvent('right');
		this.initMoveEvent('left');
	}

	ProjectsSwitcher.prototype.initProjectClickEvent = function() {
		var _this = this;
		// $('[data-id="#project"]').click(function() {
		// 	var id = $(this).parents('.b-project').data('id'),
		// 		rowIndex = $(this).parents('.row').index(),
		// 		index = $(this).parents('.col').index() + (rowIndex * 8);
		// 	new ProjectPopup(id);
		// 	_this.data.index = index;
		// });
	};
	ProjectsSwitcher.prototype.initMoveEvent = function(type) {
		var _this = this;
		$('.b-ctrl-proj_'+type).click(function(e) {
			e.preventDefault();
			if (type == 'right') {
				if (_this.data.index < _this.data.projectsLength - 1) {
					_this.data.index++;
				} else {
					_this.data.index = 0;
				}
			} else if (type == 'left') {
				if (_this.data.index == 0) {
					_this.data.index = _this.data.projectsLength - 1;
				} else {
					_this.data.index--;
				}
			}
			var id = $('.s-tmpl-c .b-project').eq(_this.data.index).data('id');
			new ProjectPopup(id);
		});
	};

	return ProjectsSwitcher;

})();

var projectsSwitcher = new ProjectsSwitcher();

(function() {
	var isHovered = false;
	if ($('.b-project').length) {
		var timeouts = [];
		$('body').on('mouseover', function(e) {
			var target = $(e.target),
				$this;
			if (timeouts.length) {
				for (var i = timeouts.length - 1; i >= 0; i--) {
					clearTimeout(timeouts[i]);
				};
			};
			if (target.hasClass('b-project') || target.parents('.b-project').length) {
				$this = target.hasClass('b-project') ? target : target.parents('.b-project');
				if (!isHovered) {
					var title = $('.caption-title', $this);
					var overflow = title[0].scrollWidth - title.width();
					var titleAnimation = function() {
						timeouts.push(setTimeout(function() {
								if (overflow) {
									title.stop().animate({
										left: -overflow
									}, 1000);
								};
								isHovered = true;
								timeouts.push(setTimeout(function() {
										title.stop().animate({
											left: 0
										}, 1000);
										timeouts.push(setTimeout(titleAnimation, 1000));
									}, 1800)
								);
							}, 800)
						)
					};
					titleAnimation();
				}
			} else {
				var title = $('.caption-title', $this);
				title.css({
					left: 0
				});
				isHovered = false;
			}
		});
	}
	// $('.b-project').on('mouseover', function() {
	// 	if (!isHovered) {
	// 		console.log('hover')
	// 		var title = $('.caption-title', $(this));
	// 		var overflow = title[0].scrollWidth - title.width();
	// 		var titleAnimation = function() {
	// 			setTimeout(function() {
	// 				if (overflow) {
	// 					title.stop().animate({
	// 						left: -overflow
	// 					}, 1000);
	// 				};
	// 				isHovered = true;
	// 				setTimeout(function() {
	// 					title.stop().animate({
	// 						left: 0
	// 					}, 1000);
	// 					setTimeout(titleAnimation, 1000)
	// 				}, 1800);
	// 			}, 800);
	// 		};
	// 		titleAnimation();
	// 	}
	// });
	// $('.b-project').on('mouseout', function() {
	// 	console.log('out')
	// 	var title = $('.caption-title', $(this));
	// 	title.css({
	// 		left: 0
	// 	});
	// 	isHovered = false;
	// });
})();
$('.b-menu-link').click(function () {
	$('.b-menu').slideToggle();
	return false;
});
$('body').on('click', function (e) {
	if (
		!$(e.target).hasClass('.b-menu') &&
		!$(e.target).parents('.b-menu').length &&
		$('.b-menu').is(':visible') &&
		window.innerWidth < 992
	) {
		$('.b-menu').slideUp();
	}
})
$('table').each(function () {
	$(this).wrap('<div class="b-table"></div>');
})
