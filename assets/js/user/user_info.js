// 入口函数
$(function () {
    //获取layui的form对象
    var form = layui.form;
    //获取layer
    var layer = layui.layer;
    // 设置昵称验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称字符长度不能大于6'
            }
        }
    })
    //封装获取用户信息函数
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('userinfo', res.data);
            }
        })
    }
    //调用初始化用户信息函数
    initUserInfo();

    //重置表单数据
    $('#btnreset').on('click', function (e) {
        //取消表单默认重置行为
        e.preventDefault();
        initUserInfo();
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('提交成功');
                window.parent.getUserInfo()
            }
        })
    })
})

