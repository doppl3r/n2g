/**	
	* Template Name: Biziness
	* Version: 1.0	
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS
	
	1. FIXED MENU
	2. FEATURED SLIDE ( SLICK SLIDER )
	3. MENU SMOOTH SCROLLING
	4. PORTFOLIO GALLERY
	5. GOOGLE MAP
	6. PORTFOLIO POPUP VIEW ( IMAGE LIGHTBOX )
	7. CLIENT TESTIMONIALS ( SLICK SLIDER )
	
**/



(function( $ ){


	/* ----------------------------------------------------------- */
	/*  2. FIXED MENU
	/* ----------------------------------------------------------- */


	jQuery(window).bind('scroll', function () {
    if ($(window).scrollTop() > 150) {
        $('#mu-header').addClass('mu-fixed-nav');
        
	    } else {
	        $('#mu-header').removeClass('mu-fixed-nav');
	    }
	});


	/* ----------------------------------------------------------- */
	/*  3. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

		//MENU SCROLLING WITH ACTIVE ITEM SELECTED

		// Cache selectors
		var lastId,
		topMenu = $(".mu-menu"),
		topMenuHeight = topMenu.outerHeight()+13,
		// All list items
		menuItems = topMenu.find('a[href^=\\#]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+22;
		  jQuery('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 1500);
		  e.preventDefault();
		});

		// Bind to scroll
		jQuery(window).scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .parent().removeClass("active")
		         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
		   }           
		})


	/* ----------------------------------------------------------- */
	/*  4. PORTFOLIO GALLERY
	
		$('.filtr-container').filterizr();

		//Simple filter controls

	    $('.mu-simplefilter li').click(function() {
	        $('.mu-simplefilter li').removeClass('active');
	        $(this).addClass('active');
	    });
	/* ----------------------------------------------------------- */ 
	/* ----------------------------------------------------------- */
	/*  5. GOOGLE MAP
	/* ----------------------------------------------------------- */ 
		    
	    $('#mu-google-map').click(function () {
		    $('#mu-google-map iframe').css("pointer-events", "auto");
		});
		
		$("#mu-google-map").mouseleave(function() {
		  $('#mu-google-map iframe').css("pointer-events", "none"); 
		});
		
		

	/* ----------------------------------------------------------- */




	
	
})( jQuery );

function mobileMenu() {
    var $opener = $(this).find('.nw-mm__opener');
    var $content = $(this).find('.nw-mm__content');
    var $menus = $(this).find('.nw-mm-menu');
    var $shade = $(this).find('.nw-mm__shade');
    var $hamburger = $(this).find('.nw-mm__ham');
    var $search = $('#nw-mm-search');
    var previous = [];
    var $current = $(this).find('#nw-mm-menu-0');
    var redirect = '<div class="nw-mm__refocus" tabindex="0"></div>';
    var redirectLi = '<li class="nw-mm__refocus" tabindex="0"></li>';
    
    // give all links tabindexes (ones without href get ignored)
    $shade.find('a').attr('tabindex', 0);

    $menus.each(function(i) {
        // add in the focus redirects to beginning and end of each submenu

        var $links = $(this).find('a');

        if (i > 0) {
            // all but the top level menu start as descendants and display none
            $(this).addClass('nw-mm-menu--descendant').attr('aria-hidden', true).hide();
        }

        // redirector to TAB from last tabbable element in dropdown goes back to hamburger
        $(redirectLi).focus(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $opener.focus();
        }).appendTo($(this));
    });

    function onClickEnter($elem, func) {
        $elem.click(function() { func.call(this); })
            .keydown(function(e) {
                if (e.which === 13) {
                    // stop propagation and prevent default to make click and enter not happen simultaneously
                    e.stopPropagation();
                    e.preventDefault();
                    func.call(this);
                }
            });
    }

    // add deadend hrefs for screen readers to speak properly
    $(this).find('.nw-mm-menu__category a, .nw-mm-menu__title a').attr('href', '#').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // going down
    $(this).find('.nw-mm-menu__category a').each(function() {
        $(this).attr('aria-expanded', false);
        onClickEnter($(this), goDown);
    });

    function goDown() {
        var $to = $('#nw-mm-menu-' + $(this).data('goto'));

        // make display block, then add animation class on a small delay
        $to.attr('aria-hidden', false).show();
        // animate out existing immediately, then display none after animation
        $current.addClass('nw-mm-menu--ancestor').attr('aria-hidden', true);

        setTimeout(function() {
            $to.removeClass('nw-mm-menu--descendant');
        }, 20);

        // do this on a timer otherwise it messes with animation
        setTimeout((function($current, to) {
            $to.find('a').eq(0).focus();
            $current.hide();
        }).bind(this, $current, $to), 220);

        previous.push($current);
        $current = $to;
    }

    // going back
    $(this).find('.nw-mm-menu__title a').each(function() {
        $(this).attr('aria-expanded', true);
        onClickEnter($(this), goBack);
    });

    function goBack() {
        var $previous = previous.pop();

        // make display block, then add animation class on a short delay
        $previous.attr('aria-hidden', false).show();
        // animate out existing immediately, then display none after animation
        $current.addClass('nw-mm-menu--descendant').attr('aria-hidden', true);

        setTimeout((function($previous) {
            $previous.removeClass('nw-mm-menu--ancestor');
        }).bind(this, $previous), 20);

        // do this on a timer otherwise it messes with animation
        setTimeout((function($current, $previous) {
            $previous.find('a').first().focus();
            $current.hide();
        }).bind(this, $current, $previous), 220);

        $current = $previous;
    }

    var menuOpen = false;
    var menuTimer = null;
    $opener.click(toggleMenu);

    function toggleMenu() {
    	menuOpen = !menuOpen;
    	var menuHeight = '430px';

        // all these things can happen independent of the animation block/none stuff
    	$opener.toggleClass('menu-dropdown--selected').attr({
            'aria-label': (menuOpen ? 'Close' : 'Open') + ' Menu',
            'aria-expanded': menuOpen
        });
        $hamburger.toggleClass('nw-mm__ham--open');
        $('body').toggleClass('no-scroll');

    	clearTimeout(menuTimer);

    	if (!menuOpen) {
//            $opener.find('span').text('Menu');
            $content.css('top', 61);

            $shade.removeClass('nw-mm__shade--open').attr('aria-hidden', true);
            $shade.removeClass('nw-mm__shade--height');
//            menuOpen = true;

    		// reset menu to top level after it has animated out
    		menuTimer = setTimeout(function() {
                // display none on finish
                $shade.hide();
    			$menus.removeClass('nw-mm-menu--ancestor').addClass('nw-mm-menu--descendant').attr('aria-hidden', true);
    			$('#nw-mm-menu-0').removeClass('nw-mm-menu--descendant').attr('aria-hidden', false);
                $menus.hide();
                $current = $('#nw-mm-menu-0').show();
    		}, 500);

            previous = [];

    	} else {
            // first show it, then on a small delay do the animation class
          menuOpen = true;
            $shade.show();
            menuTimer = setTimeout(function() {
                $shade.addClass('nw-mm__shade--open').attr('aria-hidden', false);
                $shade.addClass('nw-mm__shade--height');
            }, 20);

//            $opener.find('span').text('Close');
            $('html, body').animate({scrollTop: 0});

        }
    }
}

$(function() {
    $('.nw-mm').each(mobileMenu);
});
  
	