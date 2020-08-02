$(function () {
    //导入layui的layer对象
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传按钮
    $('#btnChooseImage').on('click', function () {
        $('input[type="file"]').click();
    })
    $('input[type="file"]').on('change', function (e) {
        //获取用户
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择文件!')
        }
        var file = e.target.files[0];
        var imgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //确认按钮绑定
    $('#btnUpload').on('click', function () {
        //拿到裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status != 0) {
                    return layui.msg(res.message);
                }
                layer.msg('头像上传成功!')
            }
        })
        window.parent.getUserInfo();
    })
})