$(function () {
		
		
		//Функция, которая получает текущю большую фотку, в зависимости от того, какой сейчас таб
		function getCurBigPhoto() {
			const bigImg = document.querySelectorAll(".plots-slider__image img");
			let CurBigImg
			bigImg.forEach(function (img) {
				if ($(img).is(':visible')) {
					CurBigImg = img
				}
			})
			return CurBigImg
		}
		
		function getBrowserScrobarWidth() {
			// создадим элемент с прокруткой
			let div = document.createElement('div');
			
			div.style.overflowY = 'scroll';
			div.style.width = '50px';
			div.style.height = '50px';
			
			// мы должны вставить элемент в документ, иначе размеры будут равны 0
			document.body.append(div);
			let scrollWidth = div.offsetWidth - div.clientWidth;
			
			div.remove();
			
			return scrollWidth;
		}
		
		function pageHasScroll() {
			if (-[1,]) {
				return document.body.clientHeight < document.body.scrollHeight;
				
			} else {
				return document.body.clientHeight < document.body.scrollHeight;
			}
		}
		
		//<Решение проблемы со скачущими хэдерами и футерами>
		
		// alert(pageHasScroll())
		// if (!pageHasScroll()){
		// 	const container = ".container"
		// 	// const body = document.querySelector()
		// 	let newRightPadding = /*parseInt($(container).css("padding-right")) + getBrowserScrobarWidth()*/ 15;
		// 	newRightPadding += "px"
		// 	console.log(newRightPadding);
		// 	$(container).css('padding-right', newRightPadding)
		//
		//
		// }
		// console.log(document.documentElement.scrollHeight)
		// console.log(document.documentElement.offsetHeight)
		
		//</Решение проблемы со скачущими хэдерами и футерами>
		
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
			otherTabName.forEach(function (otherTab) {
				if ($('.tab-' + otherTab).is(':visible')) {
					otherTabsVisibleTrigger = false;
				}
				if (!otherTabsVisibleTrigger && $('.tab-' + clickedTabName).is(':hidden')) {
					$('.tab-' + otherTab).fadeOut(400, function () {
						$('.tab-' + clickedTabName).fadeIn();
					});
					//Навешиваем и убираем класс обесцвечивающий svg иконки табов
					$('.' + otherTab).closest('.plots-sliders__tab').addClass("disable");
					$('.' + clickedTabName).closest('.plots-sliders__tab').removeClass("disable");
					
				}
			});
			
			
			//Проверяем скрыт ли нужный таб на данный момент. Если скрыт, то выключаем соседний
		})
		
		//</Сюжеты>
		
		//<Заказать фото>
		const maxSymbolsCounter = document.querySelector(".main-order-accept__input-counter span");
		const commentInput = document.querySelector('.main-order-accept__spoiler-input textarea');
		let maxSymbols = +$(maxSymbolsCounter).text().split("/")[1] || 200;
		$(commentInput).on("input", function (event) {
			let chars = this.value;
			if (chars.length >= maxSymbols && !(event.key === 'Backspace' || event.code === 'Backspace')) {
				event.preventDefault();
				this.value = chars.slice(0, maxSymbols);
				$(this).parent().addClass("too-many-chars");
				$(maxSymbolsCounter).parent().addClass("too-many-chars");
				$(maxSymbolsCounter).parent().addClass("too-many-chars_animation");
				
			} else {
				$(this).parent().removeClass("too-many-chars");
				$(maxSymbolsCounter).parent().removeClass("too-many-chars");
			}
		});
		//Возобновляем анимацию, чтоб тряслось каждый раз
		$(maxSymbolsCounter).on('animationend', function () {
			$(maxSymbolsCounter).parent().removeClass("too-many-chars_animation");
		})
		
		$(commentInput).on("keyup", function (event) {
			let chars = this.value;
			let charsLen;
			if (chars.length >= maxSymbols && !(event.key === 'Backspace' || event.code === 'Backspace')) {
				event.preventDefault();
				charsLen = maxSymbols;
				
			} else {
				charsLen = chars.length;
			}
			
			maxSymbolsCounter.innerHTML = charsLen + '/' + maxSymbols;
			
		})
		
		
		$.each($('.checkbox1'), function (index, val) {
			if ($(this).find('input').prop('checked') === true) {
				$(this).addClass('activebox');
			}
		});
		
		
		$(document).on('click', '.checkbox1:not(.checkbox-comment)', function (event) {
			if ($(this).hasClass('activebox')) {
				
				$(this).find('input').prop('checked', false);
				
			} else {
				$(this).find('input').prop('checked', true);
			}
			$(this).toggleClass('activebox');
			return false;
		});
		
		$('.main-order-accept__link').click(function () {
			
			$(this).toggleClass('active-spoiler').next().slideToggle(250);
			
			if ($(this).hasClass('active-spoiler')) {
				
				$(this).find('span').html("Скрыть комментарий");
				
			} else {
				$(this).find('span').html("Оставить комментарий");
			}
		});
		
		$(".main-order-accept__spoiler-footer button").on("click", function () {
			$('.main-order-accept__link').click();
			const commentInput = document.querySelector('.main-order-accept__spoiler-input textarea');
			const checkbox = $(this).closest('.main-order-accept__spoiler').siblings('.main-order-accept__check-box').find(".checkbox1");
			if (commentInput.value.length) {
				$(checkbox).addClass('activebox');
			} else {
				$(checkbox).removeClass('activebox');
			}
		});
		
		//<Попапы>
		
		$(".modal-inline").fancybox({
			margin: 0,
			padding: 20,
			maxWidth: 600,
			autoScale: true,
			transitionIn: 'none',
			transitionOut: 'none',
			type: 'inline',
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
		//</Попапы>



		//</Заказать фото>

		
	}
)