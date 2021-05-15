// 发起ajax请求 必须走的程序
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // console.log(options.url);
        //同意有权限的接口 
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 回调函数complete判断服务器数据
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空token
            localStorage.removeItem('token')
                //跳转页面
            location.href = '/login.html'
        }
    }

})