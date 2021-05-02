$(function() {
    $('#link_reg').on('click', function() {
        //登录类名
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            //登录类名
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //检验2次密码是否一种
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一样'
                }
            }
        })
        //调用接口发起注册请求
        //监听事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('api/reguser', data, function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_login').click()
            })
        })
        // $('#form_reg').on('submit', function(e) {
        //     // 1. 阻止默认的提交行为
        //     e.preventDefault()
        //         // 2. 发起Ajax的POST请求
        //     var data = {
        //         username: $('#form_reg [name=username]').val(),
        //         password: $('#form_reg [name=password]').val()
        //     }
        //     $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
        //         if (res.status !== 0) {
        //             console.log(res.status);
        //             return console.log(res.message);
        //         }
        //         console.log('注册成功');
        //     })
        // })
        //登录事件调用接口
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //登录成功获得token字符串 保存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })

    })

})