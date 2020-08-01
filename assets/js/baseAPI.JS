// 把重复的的JS代码放进这个文件夹
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // 统一为有权限的接口.设置headers请求头
    if (option.url.indexOf('/my') != -1) {
        option.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //为发送的ajax请求配置complete函数  用来强制重定向回到主页
    option.complete = function (res) {
        var data = res.responseJSON;
        if (data.status == 1 && data.message == '身份认证失败！') {
            //强制清空token 
            localStorage.removeItem('token');
            //返回到登录界面
            location.href = '/login.html'
        }
    }
})