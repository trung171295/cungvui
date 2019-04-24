$(document).ready(function() {
	// var slide = $('.slideshow').offset().top;
	// var location = $(window).scrollTop();
	// /////////sroll effect
	// $(window).on('scroll',function(){
	// 	(location > slide) ? $('.nav-slide-social').addClass('hidden') : $('.nav-slide-social').removeClass('.hidden');
	// })
	
	//////// check width
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
	})
});
