let  swiper1 = new Swiper('.plots-slider', {
	slidesPerView: 1,
	slidesPerGroup: 1,
	//watchOverFlow: true,
	centeredSlides: true

});

let swipermini = new Swiper('.plotsm-slider', {
	slidesPerView: 2,
	slidesPerColumn: 2,
	spaceBetween: 10,
	autoHeight: false,
	slideToClickedSlide: true,
	watchOverFlow: false

/*	slidesPerView: 2,
	slidesPerGroup: 1,
	//watchOverFlow: true,
	centeredSlides: true,
	slideToClickedSlide: true,*/

});

swiper1.controller.control = swipermini;
swipermini.controller.control = swiper1;


