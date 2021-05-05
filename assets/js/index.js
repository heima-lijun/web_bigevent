$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //eg1
        layer.confirm('确认退出', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空token
            localStorage.removeItem('token')
                //跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userInfo',
        //headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
        //欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需求渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase()
        $('.text-avatar').html(frist).show()
    }

}