$(function () {
	
	//Функция, которая получает текущю большую фотку, в зависимости от того, какой сейчас таб
	function getCurBigPhoto() {
		const bigImg = document.querySelectorAll(".plots-slider__image img");
		let CurBigImg
		bigImg.forEach( function (img)  {
			if ($(img).is(':visible')){
				CurBigImg = img
			}
		})
		return CurBigImg
	}
	
	
	
	//<Сюжеты>
	//Переключатель фоток
	$('.plotsm-slider__image').on("click", function () {
		const clickedImgSrc = this.querySelector("img").getAttribute("src");
		let CurBigImg = getCurBigPhoto();
		if (CurBigImg.getAttribute("src") !== clickedImgSrc) {
			$(CurBigImg).fadeOut(300, function () {
				CurBigImg.setAttribute('src', clickedImgSrc);
				$(CurBigImg).fadeIn();
			})
		}
	})
	
	//Табы
	let tabsArray = [];
	const allTabs = document.querySelectorAll(".plots-sliders__tab a");
	//Собираем все блоки-табы (скрытые и не скрытые)
	allTabs.forEach(function (tab) {
		// console.log(tab);
		tabsArray.push($(tab).data("tab"))
	});
	//Убираем повторяющиеся элементы
	tabsArray = $.unique(tabsArray);
	// console.log(tabsArray)
	$(".plots-sliders__tab a").on("click", function (e) {
		e.preventDefault();
		let clickedTabName = $(this).data("tab");
		let otherTabName = tabsArray.filter(function (tabName) {
			return tabName !== clickedTabName;
		});
		
		
		// console.log(otherTabName)
		let otherTabsVisibleTrigger = true;
		otherTabName.forEach(function(otherTab) {
			if($('.tab-'+otherTab).is(':visible')){
				otherTabsVisibleTrigger = false;
			}
			if (!otherTabsVisibleTrigger && $('.tab-'+clickedTabName).is(':hidden')){
				$('.tab-'+otherTab).fadeOut(400, function () {
					$('.tab-'+clickedTabName).fadeIn();
				});
				//Навешиваем и убираем класс обесцвечивающий svg иконки табов
				$('.'+otherTab).closest('.plots-sliders__tab').addClass("disable");
				$('.'+clickedTabName).closest('.plots-sliders__tab').removeClass("disable");
				
			}
		});
		
		
		//Проверяем скрыт ли нужный таб на данный момент. Если скрыт, то выключаем соседний
	})
	
	//</Сюжеты>
	
})