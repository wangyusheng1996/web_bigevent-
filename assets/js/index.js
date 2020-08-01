$(function () {
    getUserInfo();
    $('#btnlogout').on('click', function () {
        layui.layer.confirm('是否确认退出?', { icon: 3, title: '提示' },
            function (index) {
                //清空本地的token
                localStorage.removeItem('token');
                //跳转到login界面
                location.href = "/login.html"
                layer.close(index);
            });
    })
})

//封装获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // header封装在baseAPI中
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败!')
            }
            renderUser(res.data);
        }
    })
}

//封装用户渲染函数
function renderUser(user) {
    // 渲染用户名
    var uname = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    //渲染用户头像
    //判断是否有用户头像  没有就渲染文本头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.text-avatar').html(uname[0].toUpperCase()).show();
        $('.layui-nav-img').hide();
    }
}