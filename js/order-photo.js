$(function () {
    $.each($('.checkbox1'), function (index, val) {
        if ($(this).find('input').prop('checked') == true) {
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

    $('.main-order-accept__link').click(function (event) {

        $(this).toggleClass('active-spoiler').next().slideToggle(250);

        if ($(this).hasClass('active-spoiler')) {

            $(this).find('span').html("Скрыть комментарий");

        } else {
            $(this).find('span').html("Оставить комментарий");
        }
    });

    $(".main-order-accept__spoiler-footer button").on("click", function (){
        $('.main-order-accept__link').click();
        const commentInput = document.querySelector('.main-order-accept__spoiler-input textarea');
        const checkbox = $(this).closest('.main-order-accept__spoiler').siblings('.main-order-accept__check-box').find(".checkbox1");
        if (commentInput.value.length){
            $(checkbox).addClass('activebox');
        }
        else{
            $(checkbox).removeClass('activebox');
        }
    });

})