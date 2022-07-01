$(function(){
    getUserInfo()
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
/*             headers: {
                Authorization: localStorage.getItem('token') || ''
            }, */
            success: function(res){
                if (res.status !== 0){
                    return layer.msg(res.message)
                }
                renderAvatar(res.data)
            },
            /* complete: function(res){
                console.log(res);
                if(res.responseJSON.status ===1 & res.responseJSON.message === "身份认证失败！"){
                    localStorage.removeItem('token')
                    location.href = 'login.html'
                }
            } */
        })
    }
    //渲染用户信息
    function renderAvatar(user){
        //渲染欢迎词
        var nickName = user.nickName || user.username
        $("#welcome").html('你好&nbsp;&nbsp;'+nickName)

        //渲染头像
        if (user.user_pic !== null){
            
            $(".layui-nav-img").attr('src',user.user_pic).show()
            $(".text-avatar").hide()
        }else{
            $(".layui-nav-img").hide()
            var first = nickName[0].toUpperCase()
            $(".text-avatar").html(first).show()
        }
    }

    //退出功能
    $("#logout").on('click',function(){
        var layer = layui.layer
        layer.confirm('确定退出？', {icon: 3, title:'提示'}, function(index){
            //点击确定
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
          });
    })
})