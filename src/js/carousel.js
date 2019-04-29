$(document).ready(function() {
	// slideshow
	var swiper = new Swiper('.swiper-slideshow', {
		// Enable lazy loading
		lazy: true,
		autoplay: {
			delay: 5000,
		},
		loop: true,
		loopFillGroupWithBlank: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: false,
		},
		cubeEffect: {
			slideShadows: true,
			shadow: true,
			shadowOffset: 20,
			shadowScale: 0.94,
		},
	});

	//tour-hot
	var swiper = new Swiper('.slide-tour-hot', {
		navigation: {
			nextEl: '.swiper-button-next-tour',
			prevEl: '.swiper-button-prev-tour',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
			breakpoints: {
				// when window width is <= 320px
				320: {
				  slidesPerView: 1,
				  spaceBetween: 10,
				},
				// when window width is <= 480px
				480: {
				  slidesPerView: 1,
				  spaceBetween: 20,
				},
				// when window width is <= 640px
				640: {
				  slidesPerView: 1,
				  spaceBetween: 20,
				},
				768:{
					slidesPerView: 1,
					spaceBetween: 30,
				},
				996:{
					slidesPerView: 1,
					spaceBetween: 30,
				},
				1024:{
					slidesPerView: 1,
					spaceBetween: 30,
				},
			}
		},
	});

	//tour-hot-mobile
	var swiper = new Swiper('.slide-tour-hot-mobile', {
		navigation: {
			nextEl: '.swiper-button-next-tour-mobile',
			prevEl: '.swiper-button-prev-tour-mobile',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
			breakpoints: {
				// when window width is <= 320px
				320: {
				  slidesPerView: 1,
				  spaceBetween: 10,
				},
				// when window width is <= 480px
				480: {
				  slidesPerView: 1,
				  spaceBetween: 20,
				},
				// when window width is <= 640px
				640: {
				  slidesPerView: 1,
				  spaceBetween: 20,
				},
				768:{
					slidesPerView: 1,
					spaceBetween: 30,
				},
				1024:{
					slidesPerView: 1,
					spaceBetween: 30,
				},
			}
		},
	});
	//tour-travel-1
	var swiper = new Swiper('.tour-slide1', {
		slidesPerView: 3,
		spaceBetween: 15,
		navigation: {
			nextEl: '.next-controls-tour1',
			prevEl: '.prev-controls-tour1',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
		},
		breakpoints: {
			1024: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			996:{
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			768: {
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			640: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			},
			320: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			}
		  }
	});
	//tour-travel-2
	var swiper = new Swiper('.tour-slide2', {
		slidesPerView: 3,
		spaceBetween: 15,
		navigation: {
			nextEl: '.next-controls-tour2',
			prevEl: '.prev-controls-tour2',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
		},
		breakpoints: {
			1024: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			996:{
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			768: {
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			640: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			},
			320: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			}
		  }
	});
	//tour-travel-3
	var swiper = new Swiper('.tour-slide3', {
		slidesPerView: 3,
		spaceBetween: 15,
		navigation: {
			nextEl: '.next-controls-tour3',
			prevEl: '.prev-controls-tour3',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
		},
		breakpoints: {
			1024: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			996:{
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			768: {
			  slidesPerView: 3,
			  spaceBetween: 15,
			},
			640: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			},
			320: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			  slidesPerColumn:3,
			}
		  }
	});
	//blogs-travel
	var swiper = new Swiper('.list-blogs-slide', {
		slidesPerView: 4,
		spaceBetween: 10,
		navigation: {
			nextEl: '.next-controls-blogs',
			prevEl: '.prev-controls-blogs',
			disabledClass: 'swiper-button-disabled',
			hiddenClass: 'swiper-button-hidden',
			lockClass: 'swiper-button-lock',
		},
			breakpoints: {
				1024: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				640: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				}
		},
	});
});
