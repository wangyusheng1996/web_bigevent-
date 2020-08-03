$(function () {
    //文章列表初始化 上来就是渲染出来
    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    //页面一刷新调用初始化文章列表函数
    initArticleList();
    var form = layui.form;
    // 为添加类别按钮绑定点击事件
    //声明空的变量来保存弹出层的索引值
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        //每次点击
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    //为确认添加按钮绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                initArticleList();
                layer.msg('新增文章成功');
                layer.close(indexAdd);
            }
        })
    })
    // 编辑功能
    $('tbody').on('click', '.btnEdit', function () {
        //每次点击
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-Edit').html()
        })
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // //layui的表单赋值方法
                form.val('form-edit', res.data);
            }
        })
    })
    // 确认修改功能
    $('body').on('submit', '#form-Edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                initArticleList();
                layer.msg('修改文章列表成功');
                layer.close(indexAdd);
            }
        })
    })

    //实现删除功能
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('是否删除该类别?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('删除文章分类成功!');
                    initArticleList();
                    layer.close(index);
                }
            })

        });
    })
})