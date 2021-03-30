$(function(){
    $('body').on('click', '.order-save-button', function () {
        var data={};
        var session=$('.files-str').attr('sessid');
        var interval=$('.files-str').data('interval');
        var order_id=$('.files-str').data('order_id');  // ID заказа
        var work_id=$('.files-str').data('work_id');  // ID работы
        var city=$('.files-str').data('city');
        var price= parseInt($('.result-price').text());
        var fio=$('.fio-child').val();
        var group=$('.group-child').val();
        var email=$('.email-order').val();
        var email_repeat=$('.email-repeat').val();
        var order; // переменная для сбора заказа
        var retush=$('.textarea-input').val();
        var order_name= $('.files-str').data('order_name');
        //var phone=$('.')

        var orderarr=[];
        $('.order-serv-str').each(function(index){
            orderarr[index]=$(this).data('order');
        });
        order=orderarr.toString();
        //еще потом надо будет подсасывать промокод id и скидку

        data.session=session;
        data.order_id=order_id;
        data.work_id=work_id;
        data.city=city;
        data.price=price;
        data.fio=fio;
        data.group=group;
        data.email=email;
        data.order=order;
        data.interval=interval;
        if ($('.checkbox-comment').hasClass("activebox")){
            data.retush=retush;
        }

        var filter=true;
        var error_list="";

        $('.input-text-modal.required').each(function(){
            //console.log($(this).val());
            //console.log($(this).data('name'));
            if ($(this).val().length<5) {
                filter=false;
                error_list+="Вы некорректно заполнили поле - "+$(this).data('name')+"<br/>";
            }
        });

        if (filter) {
            //делаем проверку на сравнение полей email и повторный email
            if ($('.email-order').hasClass('required')) {
                if ($('.email-order').val()===$('.email-repeat').val()) {
                    //все хорошо валидация прошла
                } else {
                    filter=false;
                    error_list+="Поле Email и повторный Email не совпадают"+"<br/";
                    console.log($('.email-order').val());
                    console.log($('.email-repeat').val());
                }
            }

            //проверка на галочку пользовательского соглашения
            if (!$('.check-privacy').hasClass("activebox")) {
                filter=false;
                error_list+="Вы не подтвердили пользовательское соглашение";
            }
        }
        if (filter) {
            //тут будет ajax
            $(this).hide();
            $('.block-error-order').hide();
            $.ajax({
                url: '/local/ajax/order_edit.php',
                type: "POST",
                data: data,
                success: function (result) {
                    if (result != "") {
                        console.log(result);
                        window.location.href = '/order_photo/order_manager/?ID=' + order_id + '&CODE=' + order_name + '&EDIT=Y';
                    }
                },
            });
        }
        else {
            $('.block-error-order').html(error_list);
            $('.block-error-order').show();
        }
    });
    //функция построения заказа в попап
    function do_order(){
        var order={};

        $('.input-item-calc').each(function(){
            var id=$(this).data('id');
            var name=$(this).data('name');
            var type=$(this).data('type');
            var price=$(this).data('price');
            var count=Number($(this).val());
            var serv_id=$(this).data('serv');

            if (type=="one" && count>0) {
                if (order[serv_id]) {
                    //console.log('услуга с таким id уже создана');
                } else {
                    order[serv_id]={};
                    var number=0;
                    var serv={};
                    $('.input-item-calc[data-serv="'+serv_id+'"]').each(function(){
                        if ($(this).val()>0) {
                            serv[$(this).data('id')]={};
                            serv[$(this).data('id')]['count']=$(this).val();
                            serv[$(this).data('id')]['id_order']=$(this).data('id');
                            number=number+Number($(this).val());
                        }
                    });
                    order[serv_id]['name']=name;
                    order[serv_id]['number']=number;
                    order[serv_id]['price']=price;
                    order[serv_id]['items']=serv;
                }
            }

            if (type=="many" && count>0) {
                    order[serv_id]={};
                    var serv2={};
                    var data_str=$('.files-str').data('id');
                    var array_files=data_str.split(",");
                    array_files.forEach(function(item, i, arr) {
                        serv2[serv_id+"#"+item]={};
                        serv2[serv_id+"#"+item]['count']=count;
                        serv2[serv_id+"#"+item]['id_order']=serv_id+"#"+item;
                    });
                    order[serv_id]['name']=name;
                    order[serv_id]['number']=count;
                    order[serv_id]['price']=price;
                    order[serv_id]['items']=serv2;
            }

        });

        $('.electronic-serv').each(function(){
            var type=$(this).data('type');
            var id=$(this).data('id');
            var name=$(this).data('name');
            var price=$(this).data('price');

            if (type=="cd") {
                if ($(this).hasClass('activebox')){
                    order[id]={};
                    order[id]['name']=name;
                    order[id]['number']=1;
                    order[id]['price']=price;
                    var servcd={};
                    servcd[id]={};
                    servcd[id]['count']=1;
                    servcd[id]['id_order']=id+"#"+"CD";
                    order[id]['items']=servcd;
                }
            }
            if (type=="email") {
                if ($(this).hasClass('activebox')){
                    $('.email-order').show();
                    $('.email-text').show();
                    $('.email-repeat').show();
                    $('.email-order').addClass('required');
                    $('.email-repeat').addClass('required');
                    order[id]={};
                    order[id]['name']=name;
                    order[id]['number']=1;
                    order[id]['price']=price;
                    var servermail={};
                    servermail[id]={};
                    servermail[id]['count']=1;
                    servermail[id]['id_order']=id+"#"+"EMAIL";
                    order[id]['items']=servermail;
                } else {
                    $('.email-order').hide();
                    $('.email-repeat').hide();
                    $('.email-text').hide();
                    $('.email-order').removeClass('required');
                    $('.email-repeat').removeClass('required');
                }
            }

        });


        console.log(order);
        //тут будем вставлять результирующие услуги  .servises-order-last
        if (Object.keys(order).length) {
            var data_string='<div class="pp-orderl-info__row main-row">' +
                '<div class="pp-orderl-info__row-label">' +
                '<span>Наименование</span>' +
                '</div>' +
                '<div class="pp-orderl-info__row-label ">' +
                '<span class="kol-vo">Количество</span>' +
                '</div>'+
                '                            <div class="pp-orderl-info__row-label">' +
                '                                <span>Стоимость</span>' +
                '                            </div>' +
                '                        </div>';
            var allprice=0;
            for (var key in order) {
                var order_arr=[];
                var i=0;
                for (var key_order in order[key]['items']) {
                    order_arr[i]=order[key]['items'][key_order]['id_order']+"#"+order[key]['items'][key_order]['count'];
                    i++;
                }
                var total_price=order[key]['number']*order[key]['price'];
                allprice+=total_price
                //data_string+="<tr class='order-serv-str' data-order='"+order_arr.toString()+"' data-id='"+key+"'><td>"+order[key]['name']+"</td><td>"+order[key]['number']+"</td><td>"+total_price+"</td> </tr>";
                data_string+='<div class="order-serv-str pp-orderl-info__row second-row" data-order="'+order_arr.toString()+'" data-id="'+key+'">\n' +
                    '                            <div class="pp-orderl-info__row-label-meta ">\n' +
                    '                                <span>'+order[key]['name']+'</span>\n' +
                    '                            </div>\n' +
                    '                            <div class="pp-orderl-info__row-label-meta ">\n' +
                    '                                <span>'+order[key]['number']+' шт.</span>\n' +
                    '                            </div>\n' +
                    '                            <div class="pp-orderl-info__row-label-meta meta-cost">\n' +
                    '                                <span>'+total_price+' р</span>\n' +
                    '                            </div>\n' +
                    '                        </div>';
            }
            //data_string+="<tr><td><b>Сумма заказа</b></td><td></td><td><b>"+allprice+"</b></td>";
            data_string+='<div class="pp-orderl-info__row main-row">\n' +
                '                            <div class="pp-orderl-info__row-label ">\n' +
                '                                <span>СУММА ЗАКАЗА:</span>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="pp-orderl-info__row-label meta-cost">\n' +
                '                                <span>'+allprice+' р</span>\n' +
                '                            </div>\n' +
                '                        </div>';
            $('.servises-order-last').html(data_string);
        }
    }

    //функция подсчета цены
    function calc(){
        var price_serv=0;
        $('.input-item-calc').each(function(){
            price_serv=price_serv+(Number($(this).val()*Number($(this).data('price'))));
        });

        $('.electronic-serv').each(
            function(){
                if ($(this).hasClass('activebox')) {
                    price_serv=price_serv+Number($(this).data('price'));
                }
            }
        );

        $('.all-price').text(price_serv);
        if (price_serv>0) {
            $('.price-show').show();
            do_order();
        } else {
            $('.price-show').hide();
        }
    };

    $('body').on('click', '.button-save',function () {

        do_order();
    });

    $('body').on('click', '.spinner-btn-minus', function () {
        var items = Number($(this).siblings('div').find('input').val());
        if (items > 0) {
            $(this).siblings('.spinner-text').val(items - 1);
            var data_id= $(this).siblings('div').find('input').data('id');
            if ((items-1)>0) {
                $('.main-order__input[data-id="' + data_id + '"]').val(items - 1);
                $('.main-order-options__input[data-id="' + data_id + '"]').val(items - 1);
            } else {
                $('.main-order__input[data-id="' + data_id + '"]').val("");
                $('.main-order-options__input[data-id="' + data_id + '"]').val("");
            }
        }
        calc();
    });

    $('body').on('click', '.spinner-btn-plus', function () {
        var items = Number($(this).siblings('div').find('input').val());
        if (items <9 ) {
            $(this).siblings('div').find('input').val(items + 1);
            var data_id= $(this).siblings('div').find('input').data('id');
            if ((items+1)>0) {
                $('.main-order__input[data-id="'+data_id+'"]').val(items+1);
                $('.main-order-options__input[data-id="'+data_id+'"]').val(items+1);
            } else {
                $('.main-order__input[data-id="'+data_id+'"]').val("");
                $('.main-order-options__input[data-id="'+data_id+'"]').val("");
            }

        }
        calc();
    });

    $(".electronic-serv").on("click", function() {
        setTimeout(calc, 100);
    });


    // оформляем заказ
    $('body').on('click', '.order-add', function () {
        var data={};
        var session=$('.files-str').attr('sessid');
        var interval=$('.files-str').data('interval');
        var id=$('.files-str').data('elem-id');  // ID выполненной работы
        var code=$('.files-str').data('code');
        var city=$('.files-str').data('city');
        var price=$('.all-price:first').text();
        var fio=$('.fio-child').val();
        var group=$('.group-child').val();
        var email=$('.email-order').val();
        var email_repeat=$('.email-repeat').val();
        var order; // переменная для сбора заказа
        var retush=$('.textarea-retush').val();

        var orderarr=[];
        $('.order-serv-str').each(function(index){
            orderarr[index]=$(this).data('order');
        });
        order=orderarr.toString();
        //еще потом надо будет подсасывать промокод id и скидку

        data.session=session;
        data.id=id;
        data.city=city;
        data.price=price;
        data.fio=fio;
        data.group=group;
        data.email=email;
        data.order=order;
        data.interval=interval;
        if ($('.checkbox-comment').hasClass("activebox")){
            data.retush=retush;
        }

        var filter=true;
        var error_list="";

        $('.input-text-modal.required').each(function(){
            console.log($(this).val());
            console.log($(this).data('name'));
            if ($(this).val().length<5) {
                filter=false;
                error_list+="Вы некорректно заполнили поле - "+$(this).data('name')+"<br/>";
            }
        });

        if (filter) {
            //делаем проверку на сравнение полей email и повторный email
            if ($('.email-order').hasClass('required')) {
                if ($('.email-order').val()==$('.email-repeat').val()) {
                    //все хорошо валидация прошла
                } else {
                    filter=false;
                    error_list+="Поле Email и повторный Email не совпадают"+"<br/>";
                }
            }

            //проверка на галочку пользовательского соглашения
            if (!$('.check-privacy').hasClass("activebox")) {
                filter=false;
                error_list+="Вы не подтвердили пользовательское соглашение";
            }
        }

        //console.log(filter);
        //console.log(error_list);
        //console.log(data);
        if (filter) {
            //тут будет ajax
            $(this).hide();
            $('.block-error-order').hide();
            $.ajax({
                url: '/local/ajax/order_add.php',
                type: "POST",
                data: data,
                success: function (data) {
                    var data_result=JSON.parse(data);
                    if (data_result.ID>0 && !data_result.error) {
                        console.log("Будем мутить редирект");
                        window.location.href = '/order_photo/order_manager/?ID='+data_result.ID+'&CODE='+code;
                    } else {
                        console.log('Серверная ошибка');
                    }
                },
            });
        } else {
            $('.block-error-order').html(error_list);
            $('.block-error-order').show();
        }
    });

    //удалить заказ
    $('body').on('click', '.delete-order', function () {
        var data={};
        var session=$(this).attr('sessid');
        var id=$(this).data('id');
        var iblock=$(this).data('iblock');
        var code=$(this).data("code");


        data.session=session;
        data.id=id;
        data.iblock=iblock;
        console.log(data);
        $.ajax({
            url: '/local/ajax/order_delete.php',
            type: "POST",
            data: data,
            success: function (data) {
                window.location.href = '/order_photo/order_manager/?ORDER_ID='+id+'&DELETE=Y';
            },
        });

    });

})

