$(document).ready(function (){
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

})