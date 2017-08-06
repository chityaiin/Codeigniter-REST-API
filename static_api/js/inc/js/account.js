/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function (d, w, $) {

    function account() {

        this.init();
    }

    account.prototype.init = function () {

    }

    account.prototype.readyLoginForm = function () {
        var self = this;
//        this.loadCaptcha(function (r) {
//            $('#imageCaptcha').attr('src', r);
//        });
//
//        $('#btnRefCaptcha').click(function () {
//            self.loadCaptcha(function (r) {
//                $('#imageCaptcha').attr('src', r);
//            });
//        });

        $("#loginForm").validate({
            onfocusout: true,
            rules: {
                password: {
                    required: true,
                    minlength: 5
                },
                username: {
                    required: true
                },
                //code: "required"
            },
            messages: {
                password: {
                    required: "กรุณาใส่รหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },
                email: "กรุณาใส่อีเมล",
                code: "กรุณาใส่ตัวอักษรภาพ"
            },
            submitHandler: function (form) {
                // some other code
                // maybe disabling submit button
                // then:
                $('#alert-error').hide();
                $('#submitLogin').button('loading');
                $('.form-group').removeClass('has-error');
                $.ajax({
                    url: '/account/submitLogin',
                    type: 'post',
                    data: $(form).serialize(),
                    dataType: 'json',
                    success: function (res) {
                        //$('#btnRefCaptcha').click();
                        //$('#code').val('');
                        $('#password').val('');
                        $('#submitLogin').button('reset');
                        if (res.status) {
                            window.location = '/dashboard';
                        } else {
                            $('#alert-error').show('slow');
                            if (res.error == 'ERROR_CAPTCHA_INVALID') {
                                $('#code').parent().addClass('has-error');
                                $('#code').focus();

                            } else if (res.error == 'ERROR_ACCOUNT_INACTIVE') {

                            } else {
                                $('#password').parent().addClass('has-error');
                                $('#password').focus();
                            }
                            $('#alert-error .msg').text(res.error_msg);
                        }
                    }
                });
            }
        });


    };

    account.prototype.readyRegisterForm = function () {

        var self = this;

        this.loadCaptcha(function (r) {
            $('#imageCaptcha').attr('src', r);
        });

        $('#btnRefCaptcha').click(function () {
            self.loadCaptcha(function (r) {
                $('#imageCaptcha').attr('src', r);
            });
        });
        $("#registerForm").validate({
            rules: {
               username: "required",
                name: "required",
                password: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                tel: "required",
                //address: "required",
                code: "required"
            },
            messages: {
                username: "กรุณาตั้งชื่อผู้ใช้งาน",
                name: "กรุณาใส่ชื่อและสกุล",
                password: {
                    required: "กรุณาตั้งรหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },
                email: "กรุณาใส่อีเมล",
                tel: "กรุณาใส่เบอร์โทร",
                address: "กรุณาใส่ที่อยู่",
                code: "กรุณาใส่ตัวอักษรภาพ"
            },
            submitHandler: function (form) {
                // some other code
                // maybe disabling submit button
                // then:
                $('#alert-error').hide();
                $('#submitRegister').button('loading');
                $('.form-group').removeClass('has-error');
                $.ajax({
                    url: '/account/submitRegister',
                    type: 'post',
                    data: $(form).serialize(),
                    dataType: 'json',
                    success: function (res) {
                        $('#submitRegister').button('reset');
                        self.loadCaptcha(function (r) {
                            $('#imageCaptcha').attr('src', r);
                        });
                        $('#code').val('');
                        if (res.status) {
                            window.location = '/account/register_success/' + res.data.id;
                        } else {
                            $('#alert-error').show('slow');
                            if (res.error == 'ERROR_CAPTCHA_INVALID') {
                                $('#code').parent().addClass('has-error');
                                $('#code').focus();

                            }else if (res.error == 'ERROR_DUPLICATE_USERNAME') {
                                $('#username').parent().addClass('has-error');
                                $('#username').focus();

                            } else if (res.error == 'ERROR_DUPLICATE_EMAIL') {
                                $('#email').parent().addClass('has-error');
                                $('#email').focus();
                            } else {
                                //$('#password').parent().addClass('has-error');
                                //$('#password').focus();
                            }
                            $('#alert-error .msg').text(res.error_msg);
                        }
                    }
                });
            }
        });

        var checkTimeout = null;
        $('#username').keyup(function () {

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

    account.prototype.readyEditForm = function () {
        var self = this;

        
        $("#submitEdit").validate({
            rules: {
//                shop: "required",
                name: "required",
                password: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                tel: "required"
            },
            messages: {
                shop: "กรุณาตั้งชื่อร้าน",
                name: "กรุณาใส่ชื่อและสกุล",
                password: {
                    required: "กรุณาตั้งรหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },
                email: "กรุณาใส่อีเมล",
                tel: "กรุณาใส่เบอร์โทร",
                address: "กรุณาใส่ที่อยู่",
            },
            submitHandler: function (form) {
                // some other code
                // maybe disabling submit button
                // then:
                $('#alert-error').hide();
                $('#submitRegister').button('loading');
                $('.form-group').removeClass('has-error');
                $.ajax({
                    url: '/account/submitEdit',
                    type: 'post',
                    data: $(form).serialize(),
                    dataType: 'json',
                    success: function (res) {
                        $('#submitRegister').button('reset');
                        if (res.status) {
                            //window.location = '/account/register_success/';
                        } else {
                            $('#alert-error').show('slow');
                            if (res.error == 'ERROR_CAPTCHA_INVALID') {
                                $('#code').parent().addClass('has-error');
                                $('#code').focus();

                            } else if (res.error == 'ERROR_DUPLICATE_EMAIL') {
                                $('#email').parent().addClass('has-error');
                                $('#email').focus();
                            } else {
                                //$('#password').parent().addClass('has-error');
                                //$('#password').focus();
                            }
                            $('#alert-error .msg').text(res.error_msg);
                        }
                    }
                });
            }
        });

       
    };
    
    account.prototype.readyEditPassowrdForm = function () {
        var self = this;

        
        $("#submitEditPassword").validate({
            rules: {

                password_old: {
                    required: true,
                    minlength: 5
                },
               password_new: {
                    required: true,
                    minlength: 5
                },password_re: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                password_old: {
                    required: "กรุณาตั้งรหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },password_new: {
                    required: "กรุณาตั้งรหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },password_re: {
                    required: "กรุณาตั้งรหัสผ่าน",
                    minlength: "รหัสผ่านความยาวอย่างน้อย 4 ตัวอักษร"
                },
            },
            submitHandler: function (form) {
                // some other code
                // maybe disabling submit button
                // then:
                $('#alert-error').hide();
                $('#submitChangePassword').button('loading');
                $('.form-group').removeClass('has-error');
                $.ajax({
                    url: '/account/submitChangePassword',
                    type: 'post',
                    data: $(form).serialize(),
                    dataType: 'json',
                    success: function (res) {
                        $('#submitChangePassword').button('reset');
                        
                        if (res.status) {
                            //window.location = '/account/register_success/';
                            $('#password_old').val('');
                            $('#password_new').val('');
                            $('#password_re').val('');
                            $('.set-pass-success').show('slow');
                            setTimeout(function(){
                                $('.set-pass-success').hide();
                            },1000)
                        } else {
                            
                            $('#alert-error').show('slow');
                            if (res.error == 'ERROR_INVALID_PASSWORD_old') {
                                $('#password_old').val('');
                                $('#password_old').focus();

                            } else if (res.error == 'ERROR_NOT_MACH_PASSWORD') {
                                $('#password_new').focus();
                            }
                            
                            $('#alert-error .msg').text(res.error_msg);
                        }
                    }
                });
                
                return false;
            }
        });

       
    };

    account.prototype.readyNewpasswordForm = function () {

        $('#formSubmitNewpassword').on('submit', function () {
            var self = this;
            $(this).find('button').button('loading');
            $.ajax({

                url: '/account/submitNewpassword',
                data: $(this).serialize(),
                type: 'post',
                dataType: 'json',
                success: function (res) {

                    $(self).find('button').button('reset');
                    if (res.status) {
                        $('.panel').hide();
                        $('#pageSuccessNewPassword').fadeIn();
                    } else {
                        $('#password').focus();
                        $('#alert-error').show('slow');
                        $('#alert-error .msg').text(res.error_msg);
                    }
                }
            });
            return false;
        })
    }

    account.prototype.readyForgetForm = function () {

        $('#formSumitForget').on('submit', function () {
            var self = this;
            $(this).find('button').button('loading');
            $.ajax({

                url: '/account/submitForget',
                data: $(this).serialize(),
                type: 'post',
                dataType: 'json',
                success: function (res) {

                    $(self).find('button').button('reset');
                    if (res.status) {
                        $('.panel').hide();
                        $('#pageSuccessSendMailNewPassword').fadeIn();
                    } else {
                        $('#email').focus();
                        $('#alert-error').show('slow');
                        $('#alert-error .msg').text(res.error_msg);
                    }
                }
            });
            return false;
        })
    }

    account.prototype.checkSupdomain = function (name) {


        $.ajax({
            url: '/account/checkUsername/' + name,
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

    account.prototype.loadCaptcha = function (cb) {
        $.ajax({
            url: '/captcha/get',
            type: 'post',
            dataType: 'json',
            success: function (d) {
                cb(d.image_src);
            }
        });
    };

    $.account = new account();

})(document, window, jQuery);