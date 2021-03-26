(function($) {
	"use strict";
	
	
	// ______________Active Class
	$(".app-sidebar .toggle-menu.side-menu a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	// ______________Cover Image
	$(".cover-image").each(function() {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});
	

	// ______________Ms Menu Trigger
	$(function(e) {
		if ($('#ms-menu-trigger')[0]) {
			$('body').on('click', '#ms-menu-trigger', function() {
				$('.ms-menu').toggleClass('toggled');
			});
		}
	});
	
	// ______________Full Screen
	$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})
	
	// ______________ PAGE LOADING
	$(window).on("load", function(e) {
		$("#global-loader").fadeOut("slow");
	})
	
	// ______________ BACK TO TOP BUTTON
	$(window).on("scroll", function(e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function(e) {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	// ______________ Star Rating
	var ratingOptions = {
		selectors: {
			starsSelector: '.rating-stars',
			starSelector: '.rating-star',
			starActiveClass: 'is--active',
			starHoverClass: 'is--hover',
			starNoHoverClass: 'is--no-hover',
			targetFormElementSelector: '.rating-value'
		}
	};
	$(".rating-stars").ratingStars(ratingOptions);
	
	
	/* boYSIqMee+p4uAjskftSrErYaF9PDNDn+EGSzR9N2BspYI8=
		feCz66HNQhyoUIndT6pXQpWta+PA3e1h3yExMyH1EsOo6f8PXnNPyHGLRfchOSF9WSX7exs= */
	// ______________Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function() {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(119, 119, 142, 0.2)',
				lineCap: 'round'
			});
		});
	}

	const DIV_CARD = 'div.card';
	// ______________Tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// ______________Popover
	$('[data-toggle="popover"]').popover({
		html: true
	});
	
	// ______________Remove Card
	$(document).on('click', '[data-toggle="card-remove"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});
	
	// ______________Card Collapse
	$(document).on('click', '[data-toggle="card-collapse"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________Card Fullscreen
	$(document).on('click', '[data-toggle="card-fullscreen"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________Search
	$('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
		console.log(event.currentTarget);
		if (event.which == 27 && $('.navbar-collapse form[role="search"]').hasClass('active') ||
		$(event.currentTarget).attr('type') == 'reset') {
			closeSearch();
		}
	});
	function closeSearch() {
		var $form = $('.navbar-collapse form[role="search"].active')
		$form.find('input').val('');
		$form.removeClass('active');
	}
	$(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
		event.preventDefault();
		var $form = $(this).closest('form'),
		$input = $form.find('input');
		$form.addClass('active');
		$input.focus();
	});
	$(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
		event.preventDefault();
		var $form = $(this).closest('form'),
		$input = $form.find('input');
		$('#showSearchTerm').text($input.val());
		closeSearch()
	});
	
	//Date range as a button
	$('#daterange-btn').daterangepicker({
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		startDate: moment().subtract(29, 'days'),
		endDate: moment()
	}, function(start, end) {
		$('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
	})
	
	
	/*Skin modes*/
	$(document).on("click", '#myonoffswitch', function () {    
		if (this.checked) {
			$('body').addClass('light-mode');
			$('body').removeClass('dark-mode');
			$('body').removeClass('pattern1');
			  $('body').removeClass('pattern2');
			  $('body').removeClass('pattern3');
			  $('body').removeClass('pattern4');
			  $('body').removeClass('pattern5');
			  $('body').removeClass('pattern6');
			  $('body').removeClass('pattern7');
			  $('body').removeClass('pattern8');
			  $('body').removeClass('pattern9');
			  $('body').removeClass('pattern10');
			localStorage.setItem("light-mode", "True");
		}
		else {
			$('body').removeClass('light-mode');
			localStorage.setItem("light-mode", "false");
		}
	});
	$(document).on("click", '#myonoffswitch1', function () {    
		if (this.checked) {
			$('body').addClass('dark-mode');
			$('body').removeClass('light-mode');
			$('body').removeClass('pattern1');
			$('body').removeClass('pattern2');
			$('body').removeClass('pattern3');
			$('body').removeClass('pattern4');
			$('body').removeClass('pattern5');
			$('body').removeClass('pattern6');
			$('body').removeClass('pattern7');
			$('body').removeClass('pattern8');
			$('body').removeClass('pattern9');
			$('body').removeClass('pattern10');
			localStorage.setItem("dark-mode", "True");
		}
		else {
			$('body').removeClass('dark-mode');
			localStorage.setItem("dark-mode", "false");
		}
	});
	
	$(document).on("click", '#myonoffswitch7', function () {    
		if (this.checked) {
			$('body').addClass('body-default');
			$('body').removeClass('body-style1');
			localStorage.setItem("body-default", "True");
		}
		else {
			$('body').removeClass('body-default');
			localStorage.setItem("body-default", "false");
		}
	});
	$(document).on("click", '#myonoffswitch6', function () {    
		if (this.checked) {
			$('body').addClass('body-style1');
			$('body').removeClass('body-default');
			localStorage.setItem("body-style1", "True");
		}
		else {
			$('body').removeClass('body-style1');
			localStorage.setItem("body-style1", "false");
		}
	});
	
	/*Horizontal Styles*/
	$(document).on("click", '#myonoffswitch2', function () {    
		if (this.checked) {
			$('body').addClass('horizontal-light');
			$('body').removeClass('horizontal-color');
			$('body').removeClass('horizontal-dark');
			$('body').removeClass('horizontal-gradient');
			localStorage.setItem("horizontal-light", "True");
		}
		else {
			$('body').removeClass('horizontal-light');
			localStorage.setItem("horizontal-light", "false");
		}
	});
	$(document).on("click", '#myonoffswitch3', function () {    
		if (this.checked) {
			$('body').addClass('horizontal-color');
			$('body').removeClass('horizontal-light');
			$('body').removeClass('horizontal-dark');
			$('body').removeClass('horizontal-gradient');
			localStorage.setItem("horizontal-color", "True");
		}
		else {
			$('body').removeClass('horizontal-color');
			localStorage.setItem("horizontal-color", "false");
		}
	});
	$(document).on("click", '#myonoffswitch4', function () {    
		if (this.checked) {
			$('body').addClass('horizontal-dark');
			$('body').removeClass('horizontal-color');
			$('body').removeClass('horizontal-light');
			$('body').removeClass('horizontal-gradient');
			localStorage.setItem("horizontal-dark", "True");
		}
		else {
			$('body').removeClass('horizontal-dark');
			localStorage.setItem("horizontal-dark", "false");
		}
	});
	$(document).on("click", '#myonoffswitch5', function () {    
		if (this.checked) {
			$('body').addClass('horizontal-gradient');
			$('body').removeClass('horizontal-color');
			$('body').removeClass('horizontal-light');
			$('body').removeClass('horizontal-dark');
			localStorage.setItem("horizontal-gradient", "True");
		}
		else {
			$('body').removeClass('horizontal-gradient');
			localStorage.setItem("horizontal-gradient", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch8', function () {    
		if (this.checked) {
			$('body').addClass('reset');
			$('body').removeClass('horizontal-color');
			$('body').removeClass('horizontal-light');
			$('body').removeClass('horizontal-dark');
			$('body').removeClass('horizontal-gradient');
			localStorage.setItem("reset", "True");
		}
		else {
			$('body').removeClass('reset');
			localStorage.setItem("reset", "false");
		}
	});
	
	/*Leftmenu Styles*/
	$(document).on("click", '#myonoffswitch9', function () {    
		if (this.checked) {
			$('body').addClass('leftmenu-light');
			$('body').removeClass('leftmenu-color');
			$('body').removeClass('leftmenu-dark');
			$('body').removeClass('leftmenu-gradient');
			localStorage.setItem("leftmenu-light", "True");
		}
		else {
			$('body').removeClass('leftmenu-light');
			localStorage.setItem("leftmenu-light", "false");
		}
	});
	$(document).on("click", '#myonoffswitch10', function () {    
		if (this.checked) {
			$('body').addClass('leftmenu-color');
			$('body').removeClass('leftmenu-light');
			$('body').removeClass('leftmenu-dark');
			$('body').removeClass('leftmenu-gradient');
			localStorage.setItem("leftmenu-color", "True");
		}
		else {
			$('body').removeClass('leftmenu-color');
			localStorage.setItem("leftmenu-color", "false");
		}
	});
	$(document).on("click", '#myonoffswitch11', function () {    
		if (this.checked) {
			$('body').addClass('leftmenu-dark');
			$('body').removeClass('leftmenu-color');
			$('body').removeClass('leftmenu-light');
			$('body').removeClass('leftmenu-gradient');
			localStorage.setItem("leftmenu-dark", "True");
		}
		else {
			$('body').removeClass('leftmenu-dark');
			localStorage.setItem("leftmenu-dark", "false");
		}
	});
	$(document).on("click", '#myonoffswitch12', function () {    
		if (this.checked) {
			$('body').addClass('leftmenu-gradient');
			$('body').removeClass('leftmenu-color');
			$('body').removeClass('leftmenu-light');
			$('body').removeClass('leftmenu-dark');
			localStorage.setItem("leftmenu-gradient", "True");
		}
		else {
			$('body').removeClass('leftmenu-gradient');
			localStorage.setItem("leftmenu-gradient", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch13', function () {    
		if (this.checked) {
			$('body').addClass('reset');
			$('body').removeClass('leftmenu-color');
			$('body').removeClass('leftmenu-light');
			$('body').removeClass('leftmenu-dark');
			$('body').removeClass('leftmenu-gradient');
			localStorage.setItem("reset", "True");
		}
		else {
			$('body').removeClass('reset');
			localStorage.setItem("reset", "false");
		}
	});
	/*Boxed Styles*/
	$(document).on("click", '#myonoffswitch14', function () {    
		if (this.checked) {
			$('body').addClass('default');
			$('body').removeClass('boxed');
			localStorage.setItem("reset", "True");
		}
		else {
			$('body').removeClass('default');
			localStorage.setItem("default", "false");
		}
	});
	$(document).on("click", '#myonoffswitch15', function () {    
		if (this.checked) {
			$('body').addClass('boxed');
			$('body').removeClass('default');
			localStorage.setItem("reset", "True");
		}
		else {
			$('body').removeClass('boxed');
			localStorage.setItem("boxed", "false");
		}
	});
	
	//Pattern
	$("a[data-theme]").click(function() {
		$("head link#theme").attr("href", $(this).data("theme"));
		$(this).toggleClass('active').siblings().removeClass('active');
	});
	
	$('#background1').on('click', function() {
	  $('body').addClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background2').on('click', function() {
	 $('body').removeClass('pattern1');
	  $('body').addClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background3').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').addClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background4').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').addClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background5').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').addClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background6').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').addClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background7').on('click', function() {
	 $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').addClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background8').on('click', function() {
	 $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').addClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background9').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').addClass('pattern9');
	  $('body').removeClass('pattern10');
	  return false;
	});
	
	$('#background10').on('click', function() {
	  $('body').removeClass('pattern1');
	  $('body').removeClass('pattern2');
	  $('body').removeClass('pattern3');
	  $('body').removeClass('pattern4');
	  $('body').removeClass('pattern5');
	  $('body').removeClass('pattern6');
	  $('body').removeClass('pattern7');
	  $('body').removeClass('pattern8');
	  $('body').removeClass('pattern9');
	  $('body').addClass('pattern10');
	  return false;
	});
	
	/*--- Left-menu Image --*/
	$('#leftmenuimage1').on('click', function() {
	  $('body').removeClass('leftbgimage2');
	  $('body').removeClass('leftbgimage3');
	  $('body').removeClass('leftbgimage4');
	  $('body').removeClass('leftbgimage5');
	  $('body').addClass('leftbgimage1');
	  return false;
	});
	
	$('#leftmenuimage2').on('click', function() {
	  $('body').removeClass('leftbgimage1');
	  $('body').removeClass('leftbgimage3');
	  $('body').removeClass('leftbgimage4');
	  $('body').removeClass('leftbgimage5');
	  $('body').addClass('leftbgimage2');
	  return false;
	});
	
	$('#leftmenuimage3').on('click', function() {
	  $('body').removeClass('leftbgimage1');
	  $('body').removeClass('leftbgimage2');
	  $('body').removeClass('leftbgimage4');
	  $('body').removeClass('leftbgimage5');
	  $('body').addClass('leftbgimage3');
	  return false;
	});
	
	$('#leftmenuimage4').on('click', function() {
	  $('body').removeClass('leftbgimage1');
	  $('body').removeClass('leftbgimage2');
	  $('body').removeClass('leftbgimage3');
	  $('body').removeClass('leftbgimage5');
	  $('body').addClass('leftbgimage4');
	  return false;
	});
	
	$('#leftmenuimage5').on('click', function() {
	  $('body').removeClass('leftbgimage1');
	  $('body').removeClass('leftbgimage2');
	  $('body').removeClass('leftbgimage3');
	  $('body').removeClass('leftbgimage4');
	  $('body').addClass('leftbgimage5');
	  return false;
	});
	
	
	
})(jQuery);