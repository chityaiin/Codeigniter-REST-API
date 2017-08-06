/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function (d, w, $) {

    function restaurant() {

        this.init();
    }

    restaurant.prototype.init = function () {

    }


    restaurant.prototype.readyCreateRestaurantForm = function () {
        var self = this;

        var icon_process = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
        var icon_success = '<i class="fa fa-check" aria-hidden="true"></i>';
        var icon_error = '<i class="fa fa-times" aria-hidden="true"></i>';
        var reset = function (step) {

            $('.item-sep' + step).removeClass('item-process');
            $('.item-sep' + step).removeClass('item-error');
            $('.item-sep' + step).removeClass('item-item-success');
        };

        var step4 = function (info) {

            $('.item-sep4').addClass('item-process');
            $('.item-sep4 .badge').html(icon_process);

            $.ajax({
                url: '/restaurant/createDatabase/',
                type: 'post',
                data: info,
                dataType: 'json',
                success: function (res, code) {
                    //
                    if (res.status) {
                        reset(4);
                        $('.item-sep4').addClass('item-success');
                        $('.item-sep4 .badge').html(icon_success);
                        $('#btnSubmit').button('reset');
                        $('#btnSubmit').hide();
                        $('#btnSubmitNext').removeAttr('disabled');
                        $('#btnSubmitNext').off('click');
                        $('#msgSuccess').fadeIn();
                        var shop = $('#shop').val();
                        $('#url').html('<a href="http://'+shop+'.perdto.com/">http://'+shop+'.perdto.com/</a>');
                        $('#loadingModal').css({'cursor':'auto'});
                        $('#msgLoading').hide();
                        $('#btnSubmitNext').on('click', function () {
                            window.location = '/dashboard';
                        });
                    } else {
                        reset(4);
                        $('.item-sep4').addClass('item-error');
                        $('.item-sep4 .badge').html(icon_error);
                        $('#btnSubmit').button('reset');
                        $('#alert-error').show('slow');
                        $('#alert-error .msg').text(res.error_msg);
                    }
                }
            });
        }

        var step3 = function () {

            $('.item-sep3').addClass('item-process');
            $('.item-sep3 .badge').html(icon_process);
            $.ajax({
                url: '/restaurant/submitCreate/',
                type: 'post',
                data: $('#formSumitCreateRestaurant').serialize(),
                dataType: 'json',
                success: function (res, code) {
                    //
                    if (res.status) {
                        reset(3);
                        $('.item-sep3').addClass('item-success');
                        $('.item-sep3 .badge').html(icon_success);
                        step4(res.data);
                    } else {
                        reset(3);
                        $('.item-sep3').addClass('item-error');
                        $('.item-sep3 .badge').html(icon_error);
                        $('#btnSubmit').button('reset');
                        $('#alert-error').show('slow');
                        $('#alert-error .msg').text(res.error_msg);
                    }
                }
            });
        }

        var step2 = function (url) {

            $('.item-sep2').addClass('item-process');
            $('.item-sep2 .badge').html(icon_process);

            setTimeout(function () {

                $.ajax({
                    url: '/restaurant/pingSubdomain/' + url,
                    type: 'get',
                    dataType: 'json',
                    success: function (res, code) {
                        //
                        if (res.status) {
                            reset(2);
                            $('.item-sep2').addClass('item-success');
                            $('.item-sep2 .badge').html(icon_success);
                            step3();
                        } else {
                            reset(2);
                            $('.item-sep2').addClass('item-error');
                            $('.item-sep2 .badge').html(icon_error);
                            $('#btnSubmit').button('reset');
                            $('#alert-error').show('slow');
                            $('#alert-error .msg').text(res.error_msg);
                        }
                    }
                });
            }, 5000);

        }

        var step1 = function () {

            $('.item-sep1').addClass('item-process');
            $('.item-sep1 .badge').html(icon_process);
            $.ajax({
                url: '/restaurant/submitSubdonameDNS',
                data: $('#formSumitCreateRestaurant').serialize(),
                type: 'post',
                dataType: 'json',
                success: function (res) {

                    //
                    if (res.status) {
                        reset(1);
                        $('.item-sep1').addClass('item-success');
                        $('.item-sep1 .badge').html(icon_success);
                        step2(res.data.subdomain);
                    } else {
                        reset(1);
                        $('.item-sep1').addClass('item-error');
                        $('.item-sep1 .badge').html(icon_error);
                        $('#btnSubmit').button('reset');
                        $('#alert-error').show('slow');
                        $('#alert-error .msg').text(res.error_msg);
                    }
                }
            });
        }

        $('#formSumitCreateRestaurant').on('submit', function () {
            var self = this;
            $('#btnSubmit').button('loading');
            var shop = $(this).find('#shop').val();
            if (shop == '')
                return;

                $('#loadingModal').modal('show');
            reset(1);
            reset(2);
            reset(3);
            reset(4);
            step1();



            return false;
        });

        //step4({"id":"1","shop_id":"119","name":"Anuchit Yai-in","email":"anuchit.im@gmail.com","password":"d63ce94c269ccdb3e2f2472f66b1cf8f","address":"","tel":"0913829366","reason":"0","created_datetime":"2017-06-30 13:52:46","code":"jx8poq8g82t","staff":"{\"user\":\"admin\",\"pass\":\"hkczdqzfpsk\"}","status":"1","is_enabled":"1","shop":"test30"});

        var checkTimeout = null;
        $('#shop').keyup(function () {

            var name = $(this).val();
            $('.check_shop').show();
            $('.check_shop_error').hide();
            $('.check_shop_true').hide();
            if (name != null && name.trim().length > 0) {

                clearTimeout(checkTimeout);
                checkTimeout = setTimeout(function () {
                    self.checkSupdomain(name);
                }, 800);

            } else {
                $('.check_shop').hide();
            }
            //return false;
        });
    };


    restaurant.prototype.checkSupdomain = function (name) {


        $.ajax({
            url: '/restaurant/checkShopName/' + name,
            type: 'post',
            dataType: 'json',
            success: function (res) {
                $('.check_shop').hide();
                if (res.status == false) {

                    $('.check_shop_error').show();
                } else {
                    $('.check_shop_true').show();

                }
            }
        });

    }


    $.restaurant = new restaurant();

})(document, window, jQuery);