$(function (){
    $.each($('.checkbox1'),function (index,val){
        if($(this).find('input').prop('checked')==true){
            $(this).addClass('activebox');
        }

    });

    $(document).on('click','.checkbox1', function(event){
        if($(this).hasClass('activebox')){

            $(this).find('input').prop('checked',false);

        } else
            {
                $(this).find('input').prop('checked',true);
            }
        $(this).toggleClass('activebox');
        return false;
    });

    $('.main-order-accept__link').click(function (event){

        $(this).toggleClass('active-spoiler').next().slideToggle(250);

        if($(this).hasClass('active-spoiler')){

            $(this).find('span').html("Скрыть комментарий");

        } else
        {
            $(this).find('span').html("Оставить комментарий");
        }
    });

})