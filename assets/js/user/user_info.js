$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: [
            /^[\S]{1,6}$/
            ,'用户昵称必须1到6位字符，且不能出现空格'
          ] 
    }) 
    getUserInfo()
    function getUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if (res.status !== 0){
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置
    $("#reset").on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })
    //更新用户信息
    $("#userInfo").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if (res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //调用主页渲染头像和名称的接口
                top.window.parent.getUserInfo()
            }
        })
    })
})