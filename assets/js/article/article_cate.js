function getArticleCate(){
    var layer= layui.layer
    
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res){
            if (res.status !==0){
                return layer.msg('获取文章类别失败')
            }
            var htmlstr=template('tpl-table',res)
            $('tbody').html(htmlstr)
        }
    })
}
$(function(){
    getArticleCate()
    /* var layer= layui.layer */
    var indexAdd= null
    var indexEdit = null

    //添加文章分类
    $("#addCate").on('click',function(){
        
        indexAdd = layer.open({
            type: 1 ,
            area: ['500px','300px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
    })
    //提交添加的分类数据
    $("body").on('submit',"#form-add",function(e){
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                getArticleCate()
                layer.msg(res.message)
                layer.close(indexAdd)             
            }
        })
    })

    //编辑文章分类
    var form = layui.form
    $("tbody").on('click','.btn-edit',function(){
        
        indexEdit = layer.open({
            type: 1 ,
            area: ['500px','300px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res){
                form.val('form-edit',res.data)
            }

        })
        
    })
    //提交编辑内容
    $("body").on('submit',"#form-edit",function(e){
        e.preventDefault();
        console.log('1'); 
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }  
                      
                layer.msg(res.message)
                layer.close(indexEdit)
                getArticleCate()
                
            }
        })
    
    })

    //删除文章分类
    $("tbody").on('click','.btn-del',function(){  
        var id = $(this).attr('data-id')
        layer.confirm('请确认是否删除?', {icon: 3, title:'提示'}, function(index){
            //do something  
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    layer.close(index)
                    layer.msg(res.message) 
                    getArticleCate()                              
                }
            })         
        })       
    })
})
