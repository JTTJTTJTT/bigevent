$(function(){
    var b = {
        pagenum: 1,
        pagesize: 10,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer
    getArticleList()
    function getArticleList(){
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: b ,
            success: function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                var str=template('tpl-articleList',res)
                $('tbody').html(str)
            }
        })
    }
})