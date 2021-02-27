var swiper = new Swiper('.image-slider', {
	spaceBetween: 30,
	centeredSlides: true,
	slidesPerView: 3.66, //3.307,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	// slidesPerView: 'auto',
	//slidesPerGroup: 1,
	//initialSlide: 1,
	loop: true,
	watchOverFlow: false,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	slideToClickedSlide: true,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 20,
		stretch: 100,
		modifier: 1,
		slideShadows: false,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		//Стрелочки влево вправо
		pageUpDown: true,
	},
	mousewheel: {
		sensitivity: 1,
		eventsTarget: ".image-slider"
	},

/*	breakpoints: {
		// when window width is >= 360px
		360: {
			spaceBetween: 5,
			slidesPerView: 1.5,
			centeredSlides: false,
		},
		// when window width is >= 768px
		768: {
			spaceBetween: 5,
			slidesPerView: 2.4,
		},
		// when window width is >= 900px
		900: {
			spaceBetween: 30,
			slidesPerView: 3.307,
		}
	}*/


});