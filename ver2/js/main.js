$(".multi-spinner-container").fadeIn(1500);
$(document).ready(function() {
	// var slide = $('.slideshow').offset().top;
	// var location = $(window).scrollTop();
	// /////////sroll effect
	// $(window).on('scroll',function(){
	// 	(location > slide) ? $('.nav-slide-social').addClass('hidden') : $('.nav-slide-social').removeClass('.hidden');
	// })
	
	//////// check width
	////////////loadding ...
	setTimeout(function(){
		$(".multi-spinner-container").remove();
	});
	////////////////////menu
	$(function () {
		$('nav#menu').mmenu({
			extensions: ["position-right"]
		});
	});
	//////////////////
	AOS.init();
	////////////////
	$(function(e){
		var $window = $(window),
			$fluid = $('.container');
	
		$window.resize(function resize(){
			if ($window.width() < 768) {
				$fluid.removeClass('container');
				return $fluid.addClass('container-fluid');
			}
			else{
				$fluid.removeClass('container-fluid');
				$fluid.addClass('container');
			}

		}).trigger('resize');
	});

	//////////fixed menu
	var fixed = $('.menu-header').offset().top;
	var prevScroll = $(window).scrollTop();
	$(window).on('scroll',function(){
		if($(window).scrollTop() > fixed){
			$('.menu-header').addClass('is-fixed');
			$('.menu-header > .container').addClass('containe');
			$('.menu-header > .container').removeClass('container');
			$('.nav-menu-header').addClass('animate');
		}
		else{
			$('.menu-header').removeClass('is-fixed');
			$('.menu-header > .containe').addClass('container');
			$('.menu-header > .containe').removeClass('containe');
			$('.nav-menu-header').removeClass('animate');
		}
	});
	/////////hiden social network
	var hidden = $('.nav-slide-social').offset().top;
	$(window).on('scroll',function(){
		($(window).scrollTop() > hidden + 100) ? $('.nav-slide-social,.line-vertical').addClass('hidden') && $('.social_networks').addClass('hidden')  : $('.nav-slide-social,.line-vertical').removeClass('hidden') && $('.social_networks').removeClass('hidden');
	});
	////////////s
});
