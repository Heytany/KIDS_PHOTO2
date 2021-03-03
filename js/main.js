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
		
		$("img").on("contextmenu", function (e) {
			e.preventDefault();
		});
		
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
		
		//<Хэдер>
		$('.header__burger').on("click", function (e) {
			$('.header__burger, .header__menu').toggleClass('active');
			$('.header__menu').slideToggle(300);
		})
		//</Хэдер>
		
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
			},
			
			// Arrows
			btnTpl: {
				arrowLeft:
					'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
					'<svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M22.8125 1.43728C21.6734 0.29825 19.8267 0.29825 18.6877 1.43728L1.18769 18.9373C0.0486584 20.0763 0.0486584 21.923 1.18769 23.0621L18.6877 40.5621C19.8267 41.7011 21.6734 41.7011 22.8125 40.5621C23.9515 39.423 23.9515 37.5763 22.8125 36.4373L7.37487 20.9997L22.8125 5.56207C23.9515 4.42304 23.9515 2.57631 22.8125 1.43728Z" fill="#FF7A49"/>' +
					"</svg>" +
					"</button>",
				
				arrowRight:
					'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
					'<svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M1.18752 1.43728C2.32655 0.29825 4.17328 0.29825 5.31231 1.43728L22.8123 18.9373C23.9513 20.0763 23.9513 21.923 22.8123 23.0621L5.31231 40.5621C4.17328 41.7011 2.32655 41.7011 1.18752 40.5621C0.0484946 39.423 0.0484946 37.5763 1.18752 36.4373L16.6251 20.9997L1.18752 5.56207C0.0484946 4.42304 0.0484946 2.57631 1.18752 1.43728Z" fill="#FF7A49"/>' +
					"</svg>" +
					"</button>"
			},
			
			
		});
		
		$(".modal-inline_no-arrows").fancybox({
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
			},
			showNavArrows: false,
			
		});
		//</Попапы>
		
		$(".pp-label-info__button ").on("click", function () {
			$(".fancybox-close-small").click();
		})
		
		$(".main-order__input-counter, .main-order__image-container img").on("click", function () {
			console.log("hello")
			$(this)
				.closest(".main-order__item-column")
				.find("button.modal-inline")
				.click();
		});
		
		$(".main-order-options__image img, .main-order-options__params .main-order-options__prow input")
			.on("click", function () {
				$(this)
					.closest(".main-order-options__background2")
					.find(".main-order-options__button-container button")
					.click();
			});
		//</Заказать фото>
		
		
	}
)