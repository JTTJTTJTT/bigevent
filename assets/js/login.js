$(document).ready((function(){
    $("#link_reg").on('click',function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click',function(){
        
        $(".reg-box").hide()
        $(".login-box").show()
    })
    //定义layui表单验证的规则
    var form = layui.form 
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
            var pwd = $(".reg-box [name=password]").val()
            if(value !== pwd){
                return '两次密码不一致';
              }
        },
        uname: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
          }   
    }) 
    $("#form_reg").on('submit',function(e){
        e.preventDefault();
        var data = {username: $("#form_reg [name=username]").val(),password: $("#form_reg [name=password]").val()}
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            $("#link_login").click()
        })
    }) 
     $("#form_login").submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //存储token
                localStorage.setItem('token', res.token)
                //跳转到index页面
                location.href ='/index.html'
            }
        })
    }) 
})) 