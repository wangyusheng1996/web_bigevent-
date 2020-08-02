// 入口函数
$(function () {
    //获取layui的form对象
    var form = layui.form;
    //获取layer
    var layer = layui.layer;
    // 设置昵称验证规则
    form.verify({
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepsw: function (value) {
            if (value === $('#oldpsw').val()) {
                return '新旧密码不能相同!'
            }
        },
        repsw: function (value) {
            if (value !== $('#newPsw').val()) {
                return '两次密码必须一致!'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新密码成功!');
                $('.layui-form')[0].reset();
            }
        })
    })
})