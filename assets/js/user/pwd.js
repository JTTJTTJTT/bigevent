$(function(){
    var layer = layui.layer
    var form = layui.form
    //定义密码规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samepwd: function(value){
            if(value === $(".edit-box [name=oldPwd]").val()){
                return '新旧密码不能一致';
              }
        },
        repwd: function(value){
            if(value !== $(".edit-box [name=newPwd]").val()){
                return '两次密码不一致';
              }
        },
    })
    //修改密码
    $("#editPwd").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('修改密码失败!'+res.message)
                }
                layer.msg(res.message)
                //重置表单
                $("#editPwd")[0].reset()
            }
        })
    })



})