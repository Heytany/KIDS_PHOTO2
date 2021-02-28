var swiper = new Swiper('.image-slider', {
	centeredSlides: true,
	slidesPerView: 3.35,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	// slidesPerView: 'auto',
	//slidesPerGroup: 1,
	//initialSlide: 1,
	loop: true,
	watchOverFlow: true,
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

	breakpoints: {
		// when window width is >= 360px
		360: {
			slidesPerView: 1,
		},
		// when window width is >= 500px
		500: {
			slidesPerView: 2,
		},
		// when window width is >= 768px
		768: {
			slidesPerView: 2.37,
		},
		// when window width is >= 900px
		1024: {
			slidesPerView: 3.38,
		},
		// when window width is >= 1200px
		1200: {
			slidesPerView: 3.35,
		}
	}


});