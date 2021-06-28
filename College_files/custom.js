
$(document).ready(function() {
						   
/*=========================================================================
   Preloader
========================================================================= */

    $('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});

/*=========================================================================
   Icon Text Color Filler
========================================================================= */

	//store service items
	var fillingBlocks = $('.cd-service').not('.cd-service-divider');

	//store service items top position into an array
	var topValueFillingBlocks = [];
	fillingBlocks.each(function(index){
		var topValue = $(this).offset().top;
		topValueFillingBlocks[topValueFillingBlocks.length] = topValue;
	});

	//add the .focus class to the first service item
	fillingBlocks.eq(0).addClass('focus');

	$(window).on('scroll', function(){
		//check which service item is in the viewport and add the .focus class to it
		updateOnFocusItem(fillingBlocks.slice(1));
		//evaluate the $(window).scrollTop value and change the body::after and body::before background accordingly (using the new-color-n classes)
		bodyBackground(topValueFillingBlocks);
	});

function updateOnFocusItem(items) {
	items.each(function(){
		( $(this).offset().top - $(window).scrollTop() <= $(window).height()/2 ) ? $(this).addClass('focus') : $(this).removeClass('focus');
	});
}

function bodyBackground(itemsTopValues) {
	var topPosition = $(window).scrollTop() + $(window).height()/2,
		servicesNumber = itemsTopValues.length;
	$.each(itemsTopValues, function(key, value){
		if ( (itemsTopValues[key] <= topPosition && itemsTopValues[key+1] > topPosition) || (itemsTopValues[key] <= topPosition && key+1 == servicesNumber ) ) {	
			$('.color-fill').removeClass('new-color-'+(key-1)+' new-color-'+(key+1)).addClass('new-color-'+key);
		}
	});
}


/*=========================================================================
   Owl Carousel
========================================================================= */

    $("#owl-demo").owlCarousel({
      items : 6
    });

    $('.link').on('click', function(event){
      var $this = $(this);
      if($this.hasClass('clicked')){
        $this.removeAttr('style').removeClass('clicked');
      } else{
        $this.css('background','#3ADCBC').addClass('clicked');
      }
    });


/*=========================================================================
   Map
========================================================================= */

    $("#map").on('click', function(e) {
		e.preventDefault();
		$(".map-center").addClass("off");
	});


/*=========================================================================
   NiceScroll
========================================================================= */

    $("html").niceScroll({styler:"fb",cursorcolor:"#000",zindex:99999});


/*=========================================================================
   Carousel
========================================================================= */

    jQuery("#carousel-blog").elastislide({
      	imageW 		: 232,
      	minItems	: 1,
      	speed		: 600,
      	easing		: "easeOutQuart",
      	margin		: 30,
      	border		: 0,
      	onClick		: function() {}
    });


/*=========================================================================
   Masonry Portfolio Slider
========================================================================= */

	var slider = $("#SLslider1").mostSlider({
		aniMethod: 'auto',
	});
	var slider = $("#SLslider2").mostSlider({
		aniMethod: 'auto',
	});


/*=========================================================================
   Equal Heights
========================================================================= */

    jQuery(".maxheight").equalHeights();  


/*=========================================================================
   Prettyphoto
========================================================================= */

    $("a[class^='prettyPhoto']").prettyPhoto({theme:'pp_default'});


/*=========================================================================
		PARALLAX
========================================================================= */

  $window = $(window);
 
   $('div[data-type="background"]').each(function(){
     // declare the variable to affect the defined data-type
     var $scroll = $(this);
                     
      $(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                            
        var yPos = -($window.scrollTop() / $scroll.data('speed'));
         
        // background position
        var coords = '50% '+ yPos + 'px';
 
        // move the background
        $scroll.css({ backgroundPosition: coords });   
      }); // end window scroll
   });  // end section function



/*=========================================================================
   Accordion
========================================================================= */
/* -- 1 -- */
  $(function() {
      $( "#f-accordion" ).accordion({
        collapsible: true,
        heightStyle: "content"
      });
    });

/* -- 2 -- */
$(".notaccordion").addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
  .find("h3")
    .addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
    .hover(function() { $(this).toggleClass("ui-state-hover"); })
    .prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
    .click(function() {
      $(this).find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
        
        
        .next().toggleClass("ui-accordion-content-active").slideToggle();
        return false;
    })
    .next()
      .addClass("ui-accordion-content  ui-helper-reset ui-widget-content ui-corner-bottom")
    .hide();





/*=========================================================================
 animated text
========================================================================= */

var TxtRotate = function(el, toRotate, period) { 
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate-inner');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate-inner > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};







/*=========================================================================
   ProgressBars
========================================================================= */

(function( $, undefined ) {

$.widget( "ui.progressbar", {
	version: "1.10.4",
	options: {
		max: 100,
		value: 0,

		change: null,
		complete: null
	},

	min: 0,

	_create: function() {
		// Constrain initial value
		this.oldValue = this.options.value = this._constrainedValue();

		this.element
			.addClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.attr({
				// Only set static values, aria-valuenow and aria-valuemax are
				// set inside _refreshValue()
				role: "progressbar",
				"aria-valuemin": this.min
			});

		this.valueDiv = $( "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" )
			.appendTo( this.element );

		this._refreshValue();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );

		this.valueDiv.remove();
	},

	value: function( newValue ) {
		if ( newValue === undefined ) {
			return this.options.value;
		}

		this.options.value = this._constrainedValue( newValue );
		this._refreshValue();
	},

	_constrainedValue: function( newValue ) {
		if ( newValue === undefined ) {
			newValue = this.options.value;
		}

		this.indeterminate = newValue === false;

		// sanitize value
		if ( typeof newValue !== "number" ) {
			newValue = 0;
		}

		return this.indeterminate ? false :
			Math.min( this.options.max, Math.max( this.min, newValue ) );
	},

	_setOptions: function( options ) {
		// Ensure "value" option is set after other values (like max)
		var value = options.value;
		delete options.value;

		this._super( options );

		this.options.value = this._constrainedValue( value );
		this._refreshValue();
	},

	_setOption: function( key, value ) {
		if ( key === "max" ) {
			// Don't allow a max less than min
			value = Math.max( this.min, value );
		}

		this._super( key, value );
	},

	_percentage: function() {
		return this.indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min );
	},

	_refreshValue: function() {
		var value = this.options.value,
			percentage = this._percentage();

		this.valueDiv
			.toggle( this.indeterminate || value > this.min )
			.toggleClass( "ui-corner-right", value === this.options.max )
			.width( percentage.toFixed(0) + "%" );

		this.element.toggleClass( "ui-progressbar-indeterminate", this.indeterminate );

		if ( this.indeterminate ) {
			this.element.removeAttr( "aria-valuenow" );
			if ( !this.overlayDiv ) {
				this.overlayDiv = $( "<div class='ui-progressbar-overlay'></div>" ).appendTo( this.valueDiv );
			}
		} else {
			this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": value
			});
			if ( this.overlayDiv ) {
				this.overlayDiv.remove();
				this.overlayDiv = null;
			}
		}

		if ( this.oldValue !== value ) {
			this.oldValue = value;
			this._trigger( "change" );
		}
		if ( value === this.options.max ) {
			this._trigger( "complete" );
		}
	}
});

})( jQuery );

//	Visible, Sam Sehnert, samatdf, TeamDF
//	================================================================================
(function(e) {
    e.fn.visible = function(t, n, r) {
        var i = e(this).eq(0),
            s = i.get(0),
            o = e(window),
            u = o.scrollTop(),
            a = u + o.height(),
            f = o.scrollLeft(),
            l = f + o.width(),
            c = i.offset().top,
            h = c + i.height(),
            p = i.offset().left,
            d = p + i.width(),
            v = t === true ? h : c,
            m = t === true ? c : h,
            g = t === true ? d : p,
            y = t === true ? p : d,
            b = n === true ? s.offsetWidth * s.offsetHeight : true,
            r = r ? r : "both";
        if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
        else if (r === "vertical") return !!b && m <= a && v >= u;
        else if (r === "horizontal") return !!b && y <= l && g >= f
    }
})(jQuery)


//	ProBars
//	===============================================================================

	function animateProgressBar() {
		$('.pro-bar').each(function(i, elem) {
			var	elem = $(this),
				percent = elem.attr('data-pro-bar-percent'),
				delay = elem.attr('data-pro-bar-delay');

			if (!elem.hasClass('animated'))
				elem.css({ 'width' : '0%' });

			if (elem.visible(true)) {
				setTimeout(function() {
					elem.animate({ 'width' : percent + '%' }, 2000, 'easeInOutExpo').addClass('animated');
				}, delay);
			} 
		});
	}

	$(function() {
		animateProgressBar();
	});

	$(window).resize(function() {
		animateProgressBar();
	});

	$(window).scroll(function() {
		animateProgressBar();

		if ($(window).scrollTop() + $(window).height() == $(document).height())
			animateProgressBar();
	});


			
/*=========================================================================
		GALLERY QUICKSAND
========================================================================= */
var $filterType = $('#filterOptions li.active a').attr('class');
var $holder = $('ul.holder');
var $data = $holder.clone();

$('#filterOptions li a').click(function(e) {
	
	$('#filterOptions li').removeClass('active');
	
	var $filterType = $(this).attr('class');
	$(this).parent().addClass('active');
	
	if ($filterType == 'all') {
		var $filteredData = $data.find('li');
	} 
	else {
		var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
	}
	
	// call quicksand
	$holder.quicksand($filteredData, {
		duration: 800,
		easing: 'easeInOutQuad'
		},
		function() {
			callprettyPhoto();
			galleryHover();
	});
	return false;
});



/*=========================================================================
 Tabs
========================================================================= */

;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale'
        };

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.find('a');
            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabulousclear"></span>');

            if (this.options.effect == 'scale') {
             tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideflip');
            }

            var firstdiv = this.$elem.find('.tabs_container, .tabs_container_right');
            var firstdivheight = firstdiv.find('div:first').height();

            var alldivs = this.$elem.find('div:first').find('div');

            alldivs.css({'position': 'absolute','top':'30px'});

            firstdiv.css('height',firstdivheight+'px');

            firstchild.addClass('tabulous_active');

            links.bind('click', {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = $options.effect;

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');


                firstdiv.addClass('transition');

                links.removeClass('tabulous_active');
                mythis.addClass('tabulous_active');
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'scale') {
                    alldivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscale');
                } else if (effect == 'slideLeft') {
                    alldivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showleft');
                } else if (effect == 'scaleUp') {
                    alldivs.removeClass('showscaleup').addClass('make_transist').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscaleup');
                } else if (effect == 'flip') {
                    alldivs.removeClass('showflip').addClass('make_transist').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showflip');
                }


                firstdiv.css('height',thisdivwidth+'px');

                


            });

           


         
            
        },

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );


    

    $('#tabs, #tabs5, #tabs9, #tabs13').tabulous({
    	effect: 'scale'
    });

     $('#tabs2, #tabs6, #tabs10, #tabs14').tabulous({
    	effect: 'slideLeft'
    });

     $('#tabs3, #tabs7, #tabs11, #tabs15').tabulous({
    	effect: 'scaleUp'
    });

    $('#tabs4, #tabs8, #tabs12, #tabs16').tabulous({
    	effect: 'flip'
    });




    // Left Nav
		$('ul.left-tabulus li a, ul.right-tabulus li a, ul.bottom-tabulus li a').click(
			function(e) {
				e.preventDefault(); // prevent the default action
				e.stopPropagation; // stop the click from bubbling
				$(this).closest('ul').find('.active').removeClass('active');
				$(this).parent().addClass('active');
			});


/*=========================================================================
 Close Message box
========================================================================= */

(function ($) {
	"use strict";

	$.fn.wTimeline = function () {

		return this.each(function () {
			var timeline = $(this),
				items = timeline.find('.ser-tab-item'),
				sections = timeline.find('.ser-tab-section'),
				running = false,
				sectionsWrapper = timeline.find('.ser-tab-sections'),
				sumWidth = 0,
				sectionsContainer = $('<div></div>', {id: 'section_container'}).css({position: 'relative'}),
				resizeTimer = null,
				sectionsPadding = $(sections[0]).innerWidth() - $(sections[0]).width(),
				activeIndex = 0,
				sectionsContainerPresent;

			$(sections).css({display: 'block'});
			$(sectionsWrapper).css({position: 'relative'});

			function timeline_resize(){
				sectionsWrapper.css({width: timeline.innerWidth()-sectionsWrapper.css('border-left-width')-sectionsWrapper.css('border-right-width')+'px'});
				$(sections).css({width: sectionsWrapper.innerWidth()-sectionsPadding+'px'});

				if ($(window).width() < 768) {
					if ( ! timeline.hasClass('type_vertical')) {
						timeline.addClass('type_vertical');
					}
					if (sectionsContainerPresent === true || sectionsContainerPresent === undefined ){
						sectionsWrapper.css({ height: 'auto', overflow: 'visible'});
						$(sections).css({float: 'none'});
						$(sections).each(function(sectionIndex, section) {
							var section_content = $(section).find('.ser-tab-section-content');
							if (!$(section).hasClass('active')) {
								section_content.css('display', 'none');
							}
							sectionsWrapper.append(section);
						});
						sectionsContainer.remove();
						sectionsContainerPresent = false;
					}
				} else {
					if (timeline.hasClass('type_vertical')) {
						timeline.removeClass('type_vertical');
					}
					sectionsWrapper.css({ height: $(sections[activeIndex]).outerHeight()+'px', overflow: 'hidden'});
					sumWidth = sections.length*(sectionsWrapper.innerWidth());
					var leftPos = -activeIndex*(sectionsWrapper.innerWidth());
					sectionsContainer.css({width: sumWidth+'px', height: $(sections[activeIndex]).outerHeight()+'px', left: leftPos});
					if (sectionsContainerPresent === false || sectionsContainerPresent === undefined){
						sectionsContainer = $('<div></div>', {id: 'section_container'}).css({position: 'relative'});
						$(sections).css({float: 'left'});
						$(sections).each(function(sectionIndex, section) {
							var section_content = $(section).find('.ser-tab-section-content');
							section_content.css({'display': 'block', 'height': 'auto'});
							sectionsContainer.append(section);
						});

						sectionsContainer.css({width: sumWidth+'px', height: $(sections[activeIndex]).outerHeight()+'px', left: leftPos});
						sectionsWrapper.append(sectionsContainer);
						sectionsContainerPresent = true;
					}
				}
			}

			timeline_resize();

			$(window).resize(function(){
				window.clearTimeout(resizeTimer);
				resizeTimer = window.setTimeout(function(){
					timeline_resize();
				}, 50);

			});

			sections.each(function(index, element){
				var section = $(element),
					item = $(items[index]),
					section_title = section.find('.ser-tab-section-title'),
					section_content = section.find('.ser-tab-section-content');

				if(item.length)
				{
					item.click(function(){
						if (( ! section.hasClass('active')) && ( ! running)) {
							running = true;
							items.each(function(){
								if ($(this).hasClass('active')) {
									$(this).removeClass('active');
								}
							});
							if (item.length) {
								item.addClass('active');
							}

							var leftPos = -index*(sectionsWrapper.innerWidth());
							sectionsWrapper.animate({height: section.outerHeight()}, 300);
							sectionsContainer.animate({left: leftPos}, 300, function(){
								sections.each(function(){
									if ($(this).hasClass('active')) {
										$(this).removeClass('active');
									}
								});
								section.addClass('active');
								activeIndex = index;
								running = false;
							});

						}
					});
				}

				if(section_title.length)
				{
					section_title.click(function() {
						if (( ! section.hasClass('active')) && ( ! running)) {
							running = true;
							var currentHeight, newHeight;
							items.each(function(){
								if ($(this).hasClass('active')) {
									$(this).removeClass('active');
								}
							});
							if (item.length) {
								item.addClass('active');
							}

							sections.each(function(){
								if ($(this).hasClass('active')) {
									currentHeight = $(this).find('.ser-tab-section-content').height();
									$(this).find('.ser-tab-section-content').slideUp();
								}
							});

							newHeight = section_content.height();

							if (activeIndex < index) {

								$('html').animate({scrollTop: $('html').scrollTop() - currentHeight});
							}

							section_content.slideDown(null, function(){
								sections.each(function(){
									if ($(this).hasClass('active')) {
										$(this).removeClass('active');
									}
								});
								section.addClass('active');
								activeIndex = index;
								running = false;
							});

						}
					});
				}


			});

		});
	};
})(jQuery);

jQuery(document).ready(function() {
	"use strict";

	jQuery('.ser-tab').wTimeline();
});






/*=========================================================================
 Search Field
========================================================================= */

jQuery(document).ready(function(){
	var searchHolder = jQuery('#search-header');
	var searchInput = jQuery('.search-form_it', searchHolder);
	var timeoutId;

	searchHolder.hover(
		function(){
			over();
		}
		,function(){
            out();
		}
	);
    searchInput.hover(
		function(){
			over();
		}
		,function(){
            out();
		}
	);
    function over(){
        searchOpen = true;
		searchInput.css({display:'block'}).stop().animate({
	        width: "285px",
	    }, 200 );
	    clearTimeout(timeoutId);
    }
    function out(){
		timeoutId = setTimeout(function(){
			searchInput.stop().animate({
		        width: "0px"
		    }, 200, function(){
		      searchInput.css({display:'none'});
		    } )
		},700);
    }
});









/*=========================================================================
 Close Message box
========================================================================= */

$('.message-box').find('.closemsg').click(function() {
        $(this).parent('.message-box').slideUp(500);
    });



/*=========================================================================
 Testimonials slider
========================================================================= */
/*
 * jQuery Quovolver v1.0 - http://sandbox.sebnitu.com/jquery/quovolver
 *
 * By Sebastian Nitu - Copyright 2009 - All rights reserved
 * 
 */

(function($) {
	$.fn.quovolver = function(speed, delay) {
		
		/* Sets default values */
		if (!speed) speed = 500;
		if (!delay) delay = 6000;
		
		// If "delay" is less than 4 times the "speed", it will break the effect 
		// If that's the case, make "delay" exactly 4 times "speed"
		var quaSpd = (speed*4);
		if (quaSpd > (delay)) delay = quaSpd;
		
		// Create the variables needed
		var	quote = $(this),
			firstQuo = $(this).filter(':first'),
			lastQuo = $(this).filter(':last'),
			wrapElem = '<div id="quote_wrap"></div>';
		
		// Wrap the quotes
		$(this).wrapAll(wrapElem);
		
		// Hide all the quotes, then show the first
		$(this).hide();
		$(firstQuo).show();
		
		// Set the hight of the wrapper
		$(this).parent().css({height: $(firstQuo).height()});		
		
		// Where the magic happens
		setInterval(function(){
			
			// Set required hight and element in variables for animation
			if($(lastQuo).is(':visible')) {
				var nextElem = $(firstQuo);
				var wrapHeight = $(nextElem).height();
			} else {
				var nextElem = $(quote).filter(':visible').next();
				var wrapHeight = $(nextElem).height();
			}
			
			// Fadeout the quote that is currently visible
			$(quote).filter(':visible').fadeOut(speed);
			
			// Set the wrapper to the hight of the next element, then fade that element in
			setTimeout(function() {
				$(quote).parent().animate({height: wrapHeight}, speed);
			}, speed);
			
			if($(lastQuo).is(':visible')) {
				setTimeout(function() {
					$(firstQuo).fadeIn(speed*2);
				}, speed*2);
				
			} else {
				setTimeout(function() {
					$(nextElem).fadeIn(speed);
				}, speed*2);
			}
			
		}, delay);
	
	};
})

(jQuery);

	(function() {
		
		$('.quote-text').quovolver();
		
	});



/*=========================================================================
   Animated circle loader
========================================================================= */


(function(c, e, l, j) {
    var d = function(a, b) {
        arguments.length && this.init(a, b);
    };
    d.CANVAS_NAMES = [ "back", "fill", "front" ];
    var i = d, f;
    f = l.createElement("canvas");
    f.getContext ? (f = f.getContext("2d"), f = (e.devicePixelRatio || 1) / (f.webkitBackingStorePixelRatio || f.mozBackingStorePixelRatio || f.msBackingStorePixelRatio || f.oBackingStorePixelRatio || f.backingStorePixelRatio || 1)) : f = 1;
    i.PIXEL_RATIO = f;
    i = [ "ms", "moz", "webkit", "o" ];
    for (f = 0; f < i.length && !e.requestAnimationFrame; f++) e.requestAnimationFrame = e[i[f] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[f] + "CancelAnimationFrame"] || e[i[f] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(a) {
        return e.setTimeout(function() {
            a();
        }, 16);
    });
    e.cancelAnimationFrame || (e.cancelAnimationFrame = function(a) {
        clearTimeout(a);
    });
    var q = function(a) {
        arguments.length && this.init(a);
    };
    q.prototype = {
        attributes: {
            onLoop: null,
            afterStop: null,
            afterStopRequest: null,
            params: {},
            owner: null
        },
        init: function(a) {
            this.options = c.extend({}, this.attributes, a);
            this.animationHandle = null;
            this.loops = 0;
            this.stopRequested = !1;
        },
        start: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) && a._loop();
            });
        },
        _getThreadInfo: function() {
            return {
                loops: ++this.loops,
                params: this.options.params,
                stopRequested: this.stopped
            };
        },
        _kill: function() {
            this.animationHandle && e.cancelAnimationFrame(this.animationHandle);
            c.isFunction(this.options.afterStop) && this.options.afterStop.call(this.options.owner);
            c.isFunction(this.options.afterStopRequest) && this.options.afterStopRequest.call(this.options.owner);
        },
        _loop: function() {
            var a = this;
            this.animationHandle = e.requestAnimationFrame(function() {
                a.options.onLoop.apply(a.options.owner, [ a._getThreadInfo() ]) ? a._loop() : a._kill();
            });
        },
        stop: function(a) {
            this.stopped = !0;
            this.options.afterStopRequest = a;
        }
    };
    d.prototype = {
        defaults: {
            initialValue: 0,
            maxValue: 100,
            label: "",

            labelClassName: "text-label",
            title: "",
            
            titleClassName: "text-title",
            dates: "",
            datesClassName: "text-dates",
            
            percent: !1,
            decimals: 0,
            digitClassName: "digit-label",
            format: null,
            duration: 4e3,
            fillColor: "#eeeeee",
            wrapperClassName: "circular-stat",
            outerThickness: 8,
            fillThickness: 10
        },
        init: function(a, b) {
            this.element = c(a);
            this.options = c.extend({}, this.defaults, b, this.element.data());
            this.attributes = {};
            this.labels = {};
            this.canvases = {};
            this.activeAnimationThread = null;
            this._parseOptions();
            if (this.canvases = this._build()) this._drawBackside(this.canvases.back), this._drawFrontside(this.canvases.front), this.labels = this._attachLabels(), this._updateVal(0), this.animate(this.options.initialValue, !1);
            return this;
        },
        _parseOptions: function() {
            var a = Math.max(this.element.width(), this.element.height()) / 2, b = this.options.outerThickness;

            this.attributes = c.extend({}, this.attributes, {
                currentValue: 0,
                radius: {
                    back: a,
                    fill: a - b,
                    front: a - b - this.options.fillThickness
                }
            });
        },
        _createCanvas: function(a, b) {
            if (0 === a || 0 === b) return console.log("Invalid canvas dimensions"), !1;
            var g = l.createElement("canvas");
            g.width = a * d.PIXEL_RATIO;
            g.height = b * d.PIXEL_RATIO;
            1 < d.PIXEL_RATIO && (g.style.width = a + "px", g.style.height = b + "px");
            if (!g.getContext) if ("undefined" !== typeof G_vmlCanvasManager) G_vmlCanvasManager.initElement(g); else return console.log("Your browser does not support HTML5 Canvas, or excanvas is missing on IE"), !1;
            return g;
        },
        _attachLabels: function() {
            var a = c("<span></span>").addClass(this.options.digitClassName), b = c("<span></span>").addClass(this.options.labelClassName).text(this.options.label),  z = c("<span></span>").addClass(this.options.titleClassName).text(this.options.title), y = c("<span></span>").addClass(this.options.datesClassName).text(this.options.dates);;
            
            this.element.append([ a, b, z, y ]);
            return {
                digit: a,
                text: b,
                text: z,
                text: y
            };
        },
        _build: function() {
            for (var a = {}, b, g = 2 * this.attributes.radius.back, m = 0; m < d.CANVAS_NAMES.length; ++m) {
                if (!(b = this._createCanvas(g, g))) return !1;
                b.style.position = "absolute";
                b.style.top = 0;
                b.style.left = 0;
                b.className = d.CANVAS_NAMES[m];
                a[d.CANVAS_NAMES[m]] = b;
            }
            this.element.addClass(this.options.wrapperClassName).append(c.map(a, function(a) {
                return a;
            }));
            return a;
        },
        _drawBackside: function(a) {
            var b = this.attributes.radius.back, g = this.attributes.radius.fill, a = a.getContext("2d"), c = a.createLinearGradient(0, 0, 0, 2 * b);
            c.addColorStop(0, "#d5d5d5");
            c.addColorStop(1, "#ffffff");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, b);
            a.fillStyle = c;
            a.fill();
            this._drawCircle(a, b, b, g);
            a.fillStyle = "#eeeeee";
            a.fill();
        },
        _drawFrontside: function(a) {
            var b = this.attributes.radius.back, c = this.attributes.radius.front, a = a.getContext("2d");
            1 < d.PIXEL_RATIO && a.scale(d.PIXEL_RATIO, d.PIXEL_RATIO);
            this._drawCircle(a, b, b, c);
            a.shadowColor = "rgba(0, 0, 0, 0.3)";
            a.shadowBlur = 3;
            a.shadowOffsetY = 1;
            a.fillStyle = "#ffffff";
            a.fill();
        },
        _drawCircle: function(a, b, c, d) {
            a.beginPath();
            a.arc(b, c, d, 0, 2 * Math.PI, !1);
            a.closePath();
        },
        _updateVal: function(a, b, d) {
            c.isNumeric(a) && c.isNumeric(b) && c.isNumeric(d) ? (d = (d - b) * a, a = Math.max(0, Math.min(b + 100 * d / this.options.maxValue, 100)), b = Math.max(0, Math.min(b + d, this.options.maxValue))) : (a = Math.min(this.attributes.currentValue / this.options.maxValue, 100), b = Math.min(this.attributes.currentValue, this.options.maxValue));
            this.labels.digit[0].innerHTML = (c.isFunction(this.options.format) ? this.options.format : function(a, b, c) {
                return this.options.percent ? a.toFixed(this.options.decimals) + "%" : b.toFixed(this.options.decimals) + "/" + c.toFixed(this.options.decimals);
            }).apply(this, [ a, b, this.options.maxValue ]);
        },
        _redraw: function() {
            var a = this.canvases.fill, b = a.getContext("2d"), c = this.attributes.radius.back, f = this.attributes.radius.fill, e = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI;
            b.fillStyle = this.options.fillColor;
            b.clearRect(0, 0, a.width, a.height);
            0 !== e && (b.save(), 1 < d.PIXEL_RATIO && b.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), b.translate(c, c), b.rotate(-Math.PI / 2), b.beginPath(), b.arc(0, 0, f, 0, e, !1), b.lineTo(0, 0), b.closePath(), b.fill(), b.restore());
            this._updateVal();
        },
        animate: function(a, b) {
            function f(b) {
                1 === b.loops && (j = (new Date).getTime(), r = 2 * (a / this.options.maxValue) * Math.PI, p = 2 * (this.attributes.currentValue / this.options.maxValue) * Math.PI);
                var c = Math.min(((new Date).getTime() - j) / this.options.duration, 1), e = p + (r - p) * c;
                h.clearRect(0, 0, n.width, n.height);
                0 !== e && (h.save(), 1 < d.PIXEL_RATIO && h.scale(d.PIXEL_RATIO, d.PIXEL_RATIO), h.translate(i, i), h.rotate(-Math.PI / 2), h.beginPath(), h.arc(0, 0, l, 0, e, !1), h.lineTo(0, 0), h.closePath(), h.fill(), h.restore());
                k._updateVal(c, k.attributes.currentValue, a);
                return b.stopRequested || 1 <= c ? (k.attributes.currentValue += (a - k.attributes.currentValue) * c, !1) : !0;
            }
            function e(a) {
                c(this).queue("circular", function(a) {
                    (this.activeAnimationThread = new q({
                        onLoop: function() {
                            return f.apply(this, arguments);
                        },
                        afterStop: function() {
                            a();
                            0 === c(this).queue("circular").length && (this.activeAnimationThread = null);
                        },
                        owner: this
                    })).start();
                });
                a && c(this).dequeue("circular");
            }
            if (c.isNumeric(a) && !(0 > a || a > this.options.maxValue)) {
                var k = this, n = this.canvases.fill, h = n.getContext("2d"), i = this.attributes.radius.back, l = this.attributes.radius.fill, j, r, p;
                h.fillStyle = this.options.fillColor;
                !b && this.activeAnimationThread ? (c(this).clearQueue("circular"), this.activeAnimationThread.stop(function() {
                    e.apply(this, [ !0 ]);
                })) : e.apply(this, [ !this.activeAnimationThread ]);
            }
        },
        option: function(a, b) {
            if (0 === arguments.length) return c.extend({}, this.options);
            if ("string" === typeof a) {
                if (b === j) return this.options[a];
                switch (a) {
                  case "label":
                    this.options[a] = b;
                    this.labels.text.html(b);
                    break;
                  case "maxValue":
                    this.options.percent || (this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, b), 0), this.options[a] = b, this._redraw());
                    break;
                  case "percent":
                    b && (this.options.maxValue = 100, this.attributes.currentValue = Math.max(Math.min(this.attributes.currentValue, 100), 0));
                  case "format":
                  case "decimals":
                  case "fillColor":
                  case "duration":
                    this.options[a] = b, this._redraw();
                }
            }
            return this;
        }
    };
    d.defaults = d.prototype.defaults;
    c.fn.CircularStat = function(a) {
        var b = "string" === typeof a, e = Array.prototype.slice.call(arguments, 1), f = this;
        if (b && "_" === a.charAt(0)) return f;
        b ? this.each(function() {
            var b = c.data(this, "circular-stat"), d = b && c.isFunction(b[a]) ? b[a].apply(b, e) : b;
            if (d !== b && d !== j) return f = d, !1;
        }) : this.each(function() {
            c.data(this, "circular-stat") || c.data(this, "circular-stat", new d(this, a));
        });
        return f;
    };
    c(function() {
        c('[data-provide="circular"]').each(function() {
            var a = c(this);
            a.CircularStat(a.data());
        });
    });
})(jQuery, window, document);


/*=========================================================================
 Animated DIV
========================================================================= */

/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    //trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                }
            };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                //trigger the original fn
                fn.apply(this, arguments);
            };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
        });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);

jQuery(function($){
	
	/*** Elements Animation ***/
	$('.animated').appear(function(){
		var el = $(this);
		var anim = el.data('animation');
		var animDelay = el.data('delay');
		if (animDelay) {

			setTimeout(function(){
				el.addClass( anim + " in" );
				el.removeClass('out');
			}, animDelay);

		}

		else {
			el.addClass( anim + " in" );
			el.removeClass('out');
		}    
		},{accY: -150});			


});

/*=========================================================================
   Login / Register
========================================================================= */

(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);


	$("#modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });

	$(function(){
		// Calling Login Form
		$("#login_form").click(function(){
			$(".social_login").hide();
			$(".user_login").show();
			return false;
		});

		// Calling Register Form
		$("#register_form").click(function(){
			$(".social_login").hide();
			$(".user_register").show();
			$(".header_title").text('Register');
			return false;
		});

		// Going back to Social Forms
		$(".back_btn").click(function(){
			$(".user_login").hide();
			$(".user_register").hide();
			$(".social_login").show();
			$(".header_title").text('Login');
			return false;
		});

	})


/*=========================================================================
   Contact Form Popup bottom of the page
========================================================================= */

jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "menu" link is shown
	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-pop-form .cd-wrap-form');

	//hide or show the "menu" link
	checkMenu();
	$(window).scroll(function(){
		checkMenu();
	});

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function(){
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	function checkMenu() {
		if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
			navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				mainNavigation.addClass('has-transitions');
			});
		} else if ($(window).scrollTop() <= offset) {
			//check if the menu is open when scrolling up
			if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
				//close the menu with animation
				mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//wait for the menu to be closed and do the rest
					mainNavigation.removeClass('is-visible is-hidden has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
				});
			//check if the menu is open when scrolling up - fallback if transitions are not supported
			} else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
					mainNavigation.removeClass('is-visible has-transitions');
					navigationContainer.removeClass('is-fixed');
					$('.cd-nav-trigger').removeClass('menu-is-open');
			//scrolling up with menu closed
			} else {
				navigationContainer.removeClass('is-fixed');
				mainNavigation.removeClass('has-transitions');
			}
		} 
	}
});


/*=========================================================================
   Progress Bar
========================================================================= */

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


$(function () {
    
    function animateSkills() {
        if ($('.skill').length > 0) {
            var counter = 1;
            $('.skill').each(function () {
                var el = $(this);
                var level = el.find('.level').attr('data-level');
                el.find('.level').delay(counter * 400).animate({
                    width: level + "%"
                }, 500, "easeOutBack");
                counter++;
            });
        }
    }
    
    animateSkills();
    
});






/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 (function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()};l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\
*/

/*=========================================================================
   Icon iparallax
========================================================================= */

if ("undefined" != typeof jQuery) {
	(function(a) {
		a.imgpreload = function(b, c) {
			c = a.extend({}, a.fn.imgpreload.defaults, c instanceof Function ? {
				all: c
			} : c);
			if ("string" == typeof b) {
				b = [b]
			}
			var d = [];
			var e = b.length;
			for (var f = 0; f < e; f++) {
				var g = new Image;
				a(g).bind("load error", function(b) {
					d.push(this);
					a.data(this, "loaded", "error" == b.type ? false : true);
					if (c.each instanceof Function) {
						c.each.call(this)
					}
					if (d.length >= e && c.all instanceof Function) {
						c.all.call(d)
					}
				});
				g.src = b[f]
			}
		};
		a.fn.imgpreload = function(b) {
			var c = [];
			this.each(function() {
				c.push(a(this).attr("src"))
			});
			a.imgpreload(c, b);
			return this
		};
		a.fn.imgpreload.defaults = {
			each: null,
			all: null
		}
	})(jQuery)
}
// DOM ready
$(function() {
	var _ParallaxHover = function(el) {
			// Set up handle
			var t = this,
				$orig = $(el);
			// Extend object with handy variables
			t.$link = $orig.clone().addClass('enhanced');
			t.levels = parseInt(t.$link.data('levels'));
			t.space = parseInt(t.$link.data('space'));
			t.imgName = t.$link.data('imgname');
			t.images = new Array();
			t.pos = $orig.offset();
			t.dim = {
				w: $orig.outerWidth(),
				h: $orig.outerHeight()
			};
			t.$levels = $();
			t.threshold = 1;
			t.cPos = {
				x: t.dim.w / 2,
				y: t.dim.h / 2
			};
			t.tPos = {
				x: t.cPos.x,
				y: t.cPos.y
			};
			t.vPos = {
				x: 0,
				y: 0
			};
			t.interval;
			t.isLooping = false;
			// Set up elements and bind events
			if (t.levels > 0 && t.space > 0 && t.imgName.indexOf('*') > -1) {
				for (var i = 0; i < t.levels; i++) {
					(function() {
						var levelImgName = t.imgName.replace('*', i),
							index = i + 1,
							mid = Math.round(t.levels / 2),
							dist = (index - mid) / (t.levels - mid),
							$level = $('<span />').addClass('level').data('dist', dist).css('background-image', 'url(' + levelImgName + ')').prependTo(t.$link);
						t.$levels.push($level);
						t.images.push(levelImgName);
					})();
				}
				t.$link.mousemove(function(e) {
					var mPos = {
						x: e.pageX,
						y: e.pageY
					},
						xPos = mPos.x - t.pos.left,
						yPos = mPos.y - t.pos.top;
					t.tPos = {
						x: xPos,
						y: yPos
					};
					t.startAnimationLoop();
				}).mouseenter(function() {
					t.startAnimationLoop();
				}).mouseleave(function() {
					t.tPos.x = t.dim.w / 2;
					t.tPos.y = t.dim.h / 2;
				});
				$.imgpreload(t.images, function() {
					$orig.replaceWith(t.$link);
				});
			}
			// Return object
			return this;
		};
	_ParallaxHover.prototype.animateTo = function(x, y) {
		var t = this;
		t.tPos = {
			x: x,
			y: y
		};
		t.startAnimationLoop();
	};
	_ParallaxHover.prototype.startAnimationLoop = function() {
		var t = this;
		if (!t.isLooping) {
			t.isLooping = true;
			t.interval = setInterval(function() {
				t.animationLoop();
			}, 35);
		}
	};
	_ParallaxHover.prototype.setPosition = function() {
		var t = this;
		t.$levels.each(function() {
			var $level = $(this);
			$level.css({
				'top': -((t.cPos.y / t.dim.h) * 2 - 1) * t.space * $level.data('dist'),
				'left': -((t.cPos.x / t.dim.w) * 2 - 1) * t.space * $level.data('dist')
			});
		});
		return t.cPos;
	};
	_ParallaxHover.prototype.animationLoop = function() {
		var t = this,
			x = (t.tPos.x - t.cPos.x),
			y = (t.tPos.y - t.cPos.y);
		t.vPos.x *= 0.7;
		t.vPos.y *= 0.7;
		x *= 0.10;
		y *= 0.10;
		t.vPos.x += x;
		t.vPos.y += y;
		t.cPos.x += t.vPos.x;
		t.cPos.y += t.vPos.y;
		if (t.vPos.x >= t.threshold || t.vPos.y >= t.threshold || t.vPos.x <= -t.threshold || t.vPos.y <= -t.threshold) {
			t.setPosition();
		} else {
			t.isLooping = false;
			clearInterval(t.interval);
		}
	};
	$('.iparallax').each(function() {
		window.parallaxHover = new _ParallaxHover(this);
	});
});

/*=========================================================================
   flat shadow
========================================================================= */

$(window).ready(function(){$("[class*='flat']").hide(function(){$("[class*='flat']").addClass("animated fadeInLeft");$(this).fadeIn()})});!function(e){function s(e,t){e=e.replace("#","");r=parseInt(e.substring(0,2),16);g=parseInt(e.substring(2,4),16);b=parseInt(e.substring(4,6),16);result="rgba("+r+","+g+","+b+","+t/100+")";return result}function o(e,t){e=String(e).replace(/[^0-9a-f]/gi,"");if(e.length<6){e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]}t=t||0;var n="#",r,i;for(i=0;i<3;i++){r=parseInt(e.substr(i*2,2),16);r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16);n+=("00"+r).substr(r.length)}return n}var t=new Array("#3498DB","#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c");var n=new Array("NE","SE","SW","NW");var i={fade:false,color:"random",boxShadow:false,angle:"random"};e.fn.flatshadow=function(r){var u=e.extend({},i,r);return this.each(function(){el=e(this);if(u.fade==true){width=Math.round(el.outerWidth()/3);height=Math.round(el.outerHeight()/3)}else{width=Math.round(el.outerWidth());height=Math.round(el.outerHeight())}if(u.boxShadow!=false){var r=u.boxShadow}if(u.color!="random"&&!el.attr("data-color")){var i=u.color}else{var i=t[Math.floor(Math.random()*t.length)];if(el.attr("data-color")){var i=el.attr("data-color")}}if(u.angle!="random"&&!el.attr("data-angle")){var a=u.angle}else{var a=n[Math.floor(Math.random()*n.length)];if(el.attr("data-angle")){var a=el.attr("data-angle")}}var f=o(i,-.3);var l="";if(u.boxShadow!=false){var c=""}else{var c="none"}switch(a){case"N":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+="0px "+h*2*-1+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+="0px "+h*-1+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"NE":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+=h*2+"px "+h*2*-1+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h+"px "+h*-1+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"E":for(var h=1;h<=width;h++){if(u.boxShadow!=false)c+=h*2+"px "+"0px 0px "+s(r,50-h/width*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h+"px "+"0px 0px "+p;if(h!=width){l+=", ";c+=", "}}break;case"SE":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+=h*2+"px "+h*2+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h+"px "+h+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"S":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+="0px "+h*2+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+="0px "+h+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"SW":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+=h*2*-1+"px "+h*2+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h*-1+"px "+h+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"W":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+=h*2*-1+"px "+"0px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h*-1+"px "+"0px 0px "+p;if(h!=height){l+=", ";c+=", "}}break;case"NW":for(var h=1;h<=height;h++){if(u.boxShadow!=false)c+=h*2*-1+"px "+h*2*-1+"px 0px "+s(r,50-h/height*100);if(u.fade!=false){var p=s(f,100-h/height*100)}else{var p=f}l+=h*-1+"px "+h*-1+"px 0px "+p;if(h!=height){l+=", ";c+=", "}}break}el.css({background:i,color:o(i,1),"text-shadow":l,"box-shadow":c})})}}(window.jQuery);$(function(){RandHexVal="#"+("000000"+(Math.random()*16777215<<0).toString(16)).slice(-6);
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			/* $("[class*='flat']").flatshadow({color:"#c0392b",angle:"SE",fade:false,boxShadow:"#222"}); */
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						$(".flat-green").flatshadow({color:"#74c32d",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						$(".flat-green2").flatshadow({color:"#32ba55",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												$(".flat-turq").flatshadow({color:"#3cc3cb",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												$(".flat-blue").flatshadow({color:"#449ed7",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											$(".flat-pink").flatshadow({color:"#ED7271",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																$(".flat-orange").flatshadow({color:"#fa8819",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						$(".flat-grey").flatshadow({color:"#ccc",angle:"SE",fade:false,boxShadow:"#333"});
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						$(".flat-random").flatshadow({color:RandHexVal,angle:"SE",fade:false,boxShadow:"#333"})})


});




/*=========================================================================
 Header Login , Select Langusge, Cart etc...
========================================================================= */


( function( window ) {
	
	'use strict';

	var document = window.document,
		docElem = document.documentElement;

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function getViewportH() {
		var client = docElem['clientHeight'],
			inner = window['innerHeight'];
		if( client < inner )
			return inner;
		else
			return client;
	}

	function getOffset( el ) {
		return el.getBoundingClientRect();
	}

	function isMouseLeaveOrEnter(e, handler) { 
		if (e.type != 'mouseout' && e.type != 'mouseover') return false; 
		var reltg = e.relatedTarget ? e.relatedTarget : 
		e.type == 'mouseout' ? e.toElement : e.fromElement; 
		while (reltg && reltg != handler) reltg = reltg.parentNode; 
		return (reltg != handler); 
	}

	function owlTooltipMenu( el, options ) {	
		this.el = el;
		this.options = extend( this.defaults, options );
		this._init();
	}

	owlTooltipMenu.prototype = {
		defaults : {
			delayMenu : 100
		},
		_init : function() {
			this.touch = Modernizr.touch;
			this.menuItems = document.querySelectorAll( '#' + this.el.id + ' > li' );
			this._initEvents();
		},
		_initEvents : function() {
			
			var self = this;

			Array.prototype.slice.call( this.menuItems ).forEach( function( el, i ) {
				var trigger = el.querySelector( 'a' );
				if( self.touch ) {
					trigger.addEventListener( 'click', function( ev ) { self._handleClick( this, ev ); } );
				}
				else {
					trigger.addEventListener( 'click', function( ev ) {
						if( this.parentNode.querySelector( 'ul.owl-tt-submenu' ) ) {
							ev.preventDefault();
						}
					} );
					el.addEventListener( 'mouseover', function(ev) { if( isMouseLeaveOrEnter( ev, this ) ) self._openMenu( this ); } );
					el.addEventListener( 'mouseout', function(ev) { if( isMouseLeaveOrEnter( ev, this ) ) self._closeMenu( this ); } );
				}
			} );

		},
		_openMenu : function( el ) {

			var self = this;
			clearTimeout( this.omtimeout );
			this.omtimeout = setTimeout( function() {
				var submenu = el.querySelector( 'ul.owl-tt-submenu' );

				if( submenu ) {
					el.className = 'owl-tt-show';
					if( self._positionMenu( el ) === 'top' ) {
						el.className += ' owl-tt-show-above';
					}
					else {
						el.className += ' owl-tt-show-below';
					}
				}
			}, this.touch ? 0 : this.options.delayMenu );

		},
		_closeMenu : function( el ) {
			
			clearTimeout( this.omtimeout );

			var submenu = el.querySelector( 'ul.owl-tt-submenu' );

			if( submenu ) {
				el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show" + "(\\s+|$)"), ' ');
				el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show-below" + "(\\s+|$)"), ' ');
				el.className = el.className.replace(new RegExp("(^|\\s+)" + "owl-tt-show-above" + "(\\s+|$)"), ' ');
			}

		},
		_handleClick : function( el, ev ) {
			var item = el.parentNode,
				items = Array.prototype.slice.call( this.menuItems ),
				submenu = item.querySelector( 'ul.owl-tt-submenu' )

			// first close any opened one..
			if( typeof this.current !== 'undefined' &&  items.indexOf( item ) !== this.current ) {
				this._closeMenu( this.el.children[ this.current ] );
				this.el.children[ this.current ].querySelector( 'ul.owl-tt-submenu' ).setAttribute( 'data-open', 'false' );
			}

			if( submenu ) {
				ev.preventDefault();

				var isOpen = submenu.getAttribute( 'data-open' );

				if( isOpen === 'true' ) {
					this._closeMenu( item );
					submenu.setAttribute( 'data-open', 'false' );
				}
				else {
					this._openMenu( item );
					this.current = items.indexOf( item );
					submenu.setAttribute( 'data-open', 'true' );
				}
			}

		},
		_positionMenu : function( el ) {
			// checking where's more space left in the viewport: above or below the element
			var vH = getViewportH(),
				ot = getOffset(el),
				spaceUp = ot.top ,
				spaceDown = vH - spaceUp - el.offsetHeight;
			
			return ( spaceDown <= spaceUp ? 'top' : 'bottom' );
		}
	}

	// add to global namespace
	window.owlTooltipMenu = owlTooltipMenu;
	


var menu = new owlTooltipMenu( document.getElementById( 'owl-tt-menu' ) );

	

} )( window );










