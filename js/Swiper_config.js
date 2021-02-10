var swiper = new Swiper('.image-slider', {
	spaceBetween: 30,
	slidesPerView: 3.307,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	// slidesPerView: 'auto',
	slidesPerGroup: 1,
	//initialSlide: 1,
	loop: true,
	centeredSlides: true,
	watchOverFlow: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	slideToClickedSlide: true,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 15,
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
	}
});