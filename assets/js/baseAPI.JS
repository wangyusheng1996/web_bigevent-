// 把重复的的JS代码放进这个文件夹
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
})