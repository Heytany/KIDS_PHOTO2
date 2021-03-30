$(function () {
    $('.slider_mobile').slick({
        arrows: true,
        dots: true,
        slidesToShow: 4,
        // accessibility: true,
        // speed: 900,
        // infinite: true,
        // cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        // touchThreshold: 100,
        // fade: true,
        responsive: [
            {
                breakpoint: 361,
                settings: {
                    slidesToShow: 1
                }
            },
        ]

    });
});