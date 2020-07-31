$(function () {
    //点击去注册
    $('#reglink').on('click', function () {
        $('#loginarea').hide();
        $('#regarea').show()
    })
    //点击去登录
    $('#loginlink').on('click', function () {
        $('#regarea').hide();
        $('#loginarea').show();
    });
    // 引入layui的form对象
    var form = layui.form;
    //引入layui的layer对象
    var layer = layui.layer;
    // 检验规则
    form.verify({
        // 密码规则校验
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码校验
        repsw: function (value) {
            // 回调函数中的value是确认密码的内容
            if (value !== $('#regpassword').val()) {
                return '两次密码输入不一致'
            }
        }
    })
    //监听登录表单提交事件
    $('#loginarea').on('submit', function (e) {
        //阻止表单的默认行为  防止表单同步提交 
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: {
                username: $('#logusername').val(),
                password: $('#logpassword').val()
            },
            success: function (res) {
                // 验证失败
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                //验证成功
                layer.msg('登录成功');
                // 将token存储到本地
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
    //监听注册表单提交事件
    $('#regarea').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#regusername').val(),
                password: $('#regpassword').val()
            },
            success: function (res) {
                //请求失败
                if (res.status != 0) {
                    return layer.msg('注册失败')
                }
                //请求成功
                layer.msg('注册成功,请登录!')
                //模拟人的点击行为  帮助用户自动跳转到登录页面
                $('#loginlink').click();

            }
        })
    })
})
