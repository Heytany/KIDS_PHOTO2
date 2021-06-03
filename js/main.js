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
		
		
		function iOS() {
			return [
					'iPad Simulator',
					'iPhone Simulator',
					'iPod Simulator',
					'iPad',
					'iPhone',
					'iPod'
				].includes(navigator.platform)
				// iPad on iOS 13 detection
				|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
		}
		
		//Запрет на увеличение сайта кропом пальцев или двойным тапом
		if (iOS() === true) {
			let lastTouchEnd = 0;
			document.addEventListener('touchend', function (event) {
				let now = (new Date()).getTime();
				if (now - lastTouchEnd <= 300) {
					event.preventDefault();
				}
				lastTouchEnd = now;
			}, false);
			
			document.addEventListener('touchmove', function (event) {
				if (event.touches.length === 2) {
					event.preventDefault();
				}
				
			}, {passive: false});
		}
		
		
		//Добавляем бургер, но только для верстки
		function IsVerska() {
			let curLink = window.location.href.split('/')
			let curPage = curLink[curLink.length - 1].split('.')
			return 'html' === curPage[curPage.length - 1] || curLink.includes('dist');
		}
		
		if (IsVerska()) {
			$('.header__body').on("click", function (e) {
				$('.header__burger, .header__menu').toggleClass('active');
				$('.header__menu').slideToggle(300);
			})
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
		
		//<Хэдер>
		// $('.header__burger').on("click", function (e) {
		// 	$('.header__burger, .header__menu').toggleClass('active');
		// 	$('.header__menu').slideToggle(300);
		// });
		//</Хэдер>
		
		
		//<Сюжеты>
		//Переключатель фоток
		$('.plotsm-slider__image').on("click", function () {
			const clickedImgSrc = this.querySelector("img").getAttribute("src");
			let CurBigImg = getCurBigPhoto();
			//Устанавливаем атрибут, какое фото сейчас встанет по счёту
			$(CurBigImg)
				.closest(".plots-slider__slide")
				.attr(
					'data-arr-nav', $(this).closest('.plotsm-slider__slide')
						.index('.plotsm-slider__slide:visible')
				);
			if (CurBigImg.getAttribute("src") !== clickedImgSrc) {
				$(CurBigImg).fadeOut(300, () => {
					$(this)
						.closest('.plots-sliders__slider-mini')
						.find('.plotsm-slider__slide')
						.removeClass('selected');
					$(this).parent('.plotsm-slider__slide').addClass('selected');
					CurBigImg.setAttribute('src', clickedImgSrc);
					$(CurBigImg).fadeIn();
				})
			}
		})
		
		//Табы
		let tabsArray = [];
		const allTabs = document.querySelectorAll(".plots-sliders__tab");
		//Собираем все блоки-табы (скрытые и не скрытые)
		allTabs.forEach(function (tab) {
			tabsArray.push($(tab).data("tab"))
		});
		//Убираем повторяющиеся элементы
		tabsArray = $.unique(tabsArray);
		// console.log(tabsArray)
		$(allTabs).on("click", function (e) {
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
						//Не теряем флекс и анимацию
						$('.tab-' + clickedTabName).css("display", "flex").hide().fadeIn();
					});
					//Навешиваем и убираем класс обесцвечивающий svg иконки табов
					$('.' + otherTab).closest('.plots-sliders__tab').addClass("disable");
					$('.' + clickedTabName).closest('.plots-sliders__tab').removeClass("disable");
					
				}
			});
			
			//Проверяем скрыт ли нужный таб на данный момент. Если скрыт, то выключаем соседний
		})
		
		//Стрелки на мобилке у сюжетов
		
		$('.mobile-arrows').on("click", function () {
			//Определяем направление
			let directionIsRight = $(this).hasClass('right')
			//Список всех мелких фото внизу
			const allMiniPhotos = $(this)
				.closest('.plots-sliders__main')
				.siblings('.plots-sliders__mini')
				.find('.plotsm-slider__slide');
			const curPhoto = $(this).siblings('.plots-slider__slide');
			let curPhotoInd = +curPhoto.attr('data-arr-nav');
			//Индекс в массиве всех фоток, по которому найдём фото, которое надо показать
			let neededPhotoInd = curPhotoInd;
			if (curPhotoInd === 0 && !directionIsRight) {
				neededPhotoInd = allMiniPhotos.length - 1;
			} else if (!directionIsRight) {
				neededPhotoInd--;
			} else {
				neededPhotoInd++;
			}
			if (curPhotoInd === allMiniPhotos.length - 1 && directionIsRight) {
				neededPhotoInd = 0
			}
			const neededPhoto = allMiniPhotos[neededPhotoInd];
			let neededPhotoSrc = $(neededPhoto).find('img').attr('src')
			curPhoto.find('img').fadeOut(300, function () {
				$(this).attr('src', neededPhotoSrc).fadeIn(300);
				$(neededPhoto).closest('.plots-sliders__slider-mini').find('.plotsm-slider__slide').removeClass('selected');
				$(neededPhoto).addClass('selected')
			});
			curPhoto.attr('data-arr-nav', neededPhotoInd)
		});
		
		
		//Пробуем сделать перелистывания по свайпу пальцами
		let clientX_prev;
		let clientX;
		$('.plots-sliders')
			.on('touchstart', function (e) {
				clientX_prev = e.originalEvent.changedTouches[0].clientX;
			})
			.on('touchend', function (e) {
				clientX = e.originalEvent.changedTouches[0].clientX;
				
				if (clientX_prev - clientX > 10) {
					// console.log("Влево")
					$(this).find('.mobile-arrows.left').click();
				} else if (clientX - clientX_prev > 10) {
					// console.log("Вправо")
					$(this).find('.mobile-arrows.right').click();
					
				}
			})
		
		
		// let clientX_prev = 0;
		// let clientX = 0;
		// let swipe_event_prev;
		// let swipe;
		
		
		/*$('.plots-sliders').on('touchstart touchmove touchend', function (e) {
			// console.log(e);
			let do_swipe = false;
			swipe_event_prev = swipe;
			swipe = e.handleObj.origType;
			if (swipe_event_prev === 'touchmove') {
				do_swipe = true;
			}
			clientX_prev = clientX;
			clientX = e.originalEvent.changedTouches[0].clientX;
			
			console.log(clientX)
			console.log(clientX_prev)
			console.log(swipe_event_prev)
			if (clientX_prev - clientX > 10 && do_swipe) {
				console.log("Влево")
			} else if (clientX - clientX_prev > 10 && do_swipe) {
				console.log("Вправо")
			}
			
			
		});*/
		
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
		
		
		$.each($('.checkbox1:not(.edit-checkbox)'), function (index, val) {
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
		});
		
		$('.main-order-accept__link').click(function () {
			
			$(this).toggleClass('active-spoiler').next().slideToggle(250);
			
			if ($(this).hasClass('active-spoiler')) {
				
				$(this).find('span').html("Скрыть комментарий");
				
			} else {
				$(this).find('span').html("Оставить комментарий");
			}
		});
		
		
		$(".main-order-accept__spoiler-footer button, .main-order-accept__link").on("click", function () {
			let checkbox
			if (!$(this).hasClass('main-order-accept__link')) {
				$('.main-order-accept__link').click();
				checkbox = $(this).closest('.main-order-accept__spoiler').siblings('.main-order-accept__check-box').find(".checkbox1");
			} else {
				checkbox = $(this).siblings('.main-order-accept__check-box').find(".checkbox1");
			}
			
			const commentInput = document.querySelector('.main-order-accept__spoiler-input textarea');
			if (commentInput.value.length) {
				$(checkbox).addClass('activebox');
			} else {
				$(checkbox).removeClass('activebox');
			}
		});
		
		//Баг с фэнсибоксом
		$('.collage:not(.modal-inline)').on('click', function () {
			$('.collage.modal-inline').click();
		});
		
		//<Попапы>
		
		$(".modal-inline").fancybox({
			margin: 0,
			padding: 0,
			maxWidth: 600,
			loop: true,
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
					'<button  data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
					'<svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M22.8125 1.43728C21.6734 0.29825 19.8267 0.29825 18.6877 1.43728L1.18769 18.9373C0.0486584 20.0763 0.0486584 21.923 1.18769 23.0621L18.6877 40.5621C19.8267 41.7011 21.6734 41.7011 22.8125 40.5621C23.9515 39.423 23.9515 37.5763 22.8125 36.4373L7.37487 20.9997L22.8125 5.56207C23.9515 4.42304 23.9515 2.57631 22.8125 1.43728Z" fill="#FF7A49"/>' +
					"</svg>" +
					"</button>",
				
				arrowRight:
					'<button  data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
					'<svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M1.18752 1.43728C2.32655 0.29825 4.17328 0.29825 5.31231 1.43728L22.8123 18.9373C23.9513 20.0763 23.9513 21.923 22.8123 23.0621L5.31231 40.5621C4.17328 41.7011 2.32655 41.7011 1.18752 40.5621C0.0484946 39.423 0.0484946 37.5763 1.18752 36.4373L16.6251 20.9997L1.18752 5.56207C0.0484946 4.42304 0.0484946 2.57631 1.18752 1.43728Z" fill="#FF7A49"/>' +
					"</svg>" +
					"</button>"
			},
			
			mobile: {
				btnTpl: {
					arrowLeft:
/*						'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left mobile" title="{{PREV}}"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<circle opacity="0.5" cx="15" cy="15" r="15" transform="rotate(180 15 15)" fill="#FF7A49"/>\n' +
						'<path d="M16.5 19.5L12 15L16.5 10.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
						'</svg></button>',*/

						'<button style="display: none;" data-fancybox-prev class="fancybox-button fancybox-button--arrow_left mobile" title="{{PREV}}"><svg class="mobile-arrow" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M18 22.5L10.5 15L18 7.5" stroke="#FF7A49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
						'<rect x="1" y="1" width="28" height="28" rx="14" transform="matrix(4.37114e-08 1 1 -4.37114e-08 4.37114e-08 -4.37114e-08)" stroke="#FF7A49" stroke-width="2"/>\n' +
					'</svg></button>',


	arrowRight:
/*						'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right mobile" title="{{NEXT}}"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<circle opacity="0.5" cx="15" cy="15" r="15" fill="#FF7A49"/>\n' +
						'<path d="M13.5 10.5L18 15L13.5 19.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
						'</svg></button>',*/
					'<button style="display: none;" data-fancybox-next class="fancybox-button fancybox-button--arrow_right mobile" title="{{NEXT}}"><svg class="mobile-arrow" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M12 22.5L19.5 15L12 7.5" stroke="#FF7A49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
					'<rect x="29" y="1" width="28" height="28" rx="14" transform="rotate(90 29 1)" stroke="#FF7A49" stroke-width="2"/>\n' +
					'</svg></button>',

				},
			}
			
			
		});
		
		$(".modal-inline_no-arrows").fancybox({
			margin: 0,
			padding: 20,
			maxWidth: 600,
			autoScale: true,
			transitionIn: 'none',
			transitionOut: 'none',
			type: 'inline',
			touch: false,
			helpers: {
				overlay: {
					locked: false
				}
			},
			btnTpl: {
				arrowLeft:
					'',
				
				arrowRight:
					''
			},
			showNavArrows: false,
			afterLoad: function () {
				const kol_vo = $('.main-row .pp-orderl-info__row-label span.kol-vo');
				if ($(window).width() <= '596' && kol_vo.text() === 'Количество') {
					kol_vo.text('Кол-во');
				} else {
					kol_vo.text('Количество');
				}
			},
			
		});
		//</Попапы>
		
		
		$(".pp-label-info__button, .pp-change-size__changer-result .primal-button").on("click", function () {
			$(".fancybox-close-small").click();
		})
		
		$(".main-order__input-counter:not(.block-lock), .main-order__image-container img").on("click", function () {
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
		
		$('.mobile-popup_1, .mobile-popup_2, .mobile-popup_3, .mobile-popup_4')
			.on('click', function () {
				let popupNum = this.classList.toString().match(/mobile-popup_(\d)/)[1];
				$('button.desctop-popup_' + popupNum).click();
			})
		
		$('.after640').on('click', function () {
			$('.before640.' + this.getAttribute('data-small-popup')).click();
		})
		//</Заказать фото>
		
		
	}
)