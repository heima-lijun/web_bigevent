$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()
    initEditor()
        //定义加载文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)
                form.render()
            }

        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 为封面绑定按钮

    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click()
        })
        //将选择的图片设置到裁剪区域中
    $('#coverFile').on('change', function(e) {
            var files = e.target.files
            if (files.length === 0) {
                return
            }
            var newImgURL = URL.createObjectURL(files[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 改变state的状态
    var art_status = '已发布'
    $('#btnSave2').on('click', function() {
            art_status = '草稿'
        })
        //    基于Form表单创建FormData对象
    $('#form_pub').on('submit', function(e) {
            e.preventDefault()
            var fd = new FormData($(this)[0])
            fd.append('state', art_status)
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob)
                    publishArticle(fd)
                })
        })
        //2 发起Ajax请求实现发布文章的功能
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！') // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }
})