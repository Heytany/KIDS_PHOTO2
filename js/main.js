$(function () {
	
	const bigImg = document.querySelector(".plots-slider__image img");
	$('.plotsm-slider__image').on("click", function () {
		const clickedImgSrc = this.querySelector("img").getAttribute("src");
		if (bigImg.getAttribute("src") !== clickedImgSrc) {
			$(bigImg).fadeOut(300, function () {
				bigImg.setAttribute('src', clickedImgSrc);
				$(bigImg).fadeIn();
			})
		}
	})
})