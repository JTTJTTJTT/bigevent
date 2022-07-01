$(function(){
    var form = layui.form
    form.verify({
        nickname: [
            /^[\S]{1,6}$/
            ,'用户昵称必须1到6位字符，且不能出现空格'
          ] 
    }) 
})