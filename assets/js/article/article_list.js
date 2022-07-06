$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage= layui.laypage
    var b = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    function padZero(n){
        return n > 9 ? n : '0' + n
    }
    //美化时间格式
    template.defaults.imports.dateFormate = function(date){
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    }


    getArticleCate()
    //获取文章列表
    function getArticleCate(){
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

                //文章列表渲染完成后进行分页
                pageList(res.total)
            }
        })
    }
   
    //定义文章分类的方法
    initCate()
    
    function initCate(){
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res){
                if(res.status !==0){
                    return layer.msg('初始化文章分类失败')
                }
                var str=template('tpl-cate',res)
                $('[name="cate_id"]').html(str)
                form.render()
            }
        })
    }
    //筛选
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        b.cate_id = $('[name="cate_id"]').val()
        b.state = $('[name="state"]').val()
        getArticleCate()
    })

    //分页
    function pageList(total){
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: b.pagesize,
            curr: b.pagenum ,
            layout: ['count','limit','prev', 'page', 'next','refresh','skip'],
            limits: [2, 5, 10],
            //分页跳转
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                b.pagenum = obj.curr
                b.pagesize = obj.limit
                //首次不执行
                if(!first){
                  //do something
                  getArticleCate()
                }
            }
          })
    }

    //删除
    $('tbody').on('click',".btn-del",function(e){
        e.preventDefault()
        var id = $(this).attr('data-id')
        var len = $('.btn-del').length
        console.log(len);
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            $.ajax({
                url: '/my/article/delete/' + id ,
                method: 'GET',
                success: function(res){
                    if (res.status !== 0){
                        layer.msg(res.message)
                    }
                    
                    layer.msg(res.message)
                    if(len === 1){
                        b.pagenum = b.pagenum === 1 ? b.pagenum :b.pagenum - 1
                    }
                    getArticleCate()
                }
            })
            layer.close(index);
          });
    })

    //编辑
    var indexEdit = null
    $('tbody').on('click',".btn-edit",function(e){
        e.preventDefault()
        initCate()
        indexEdit = layer.open({
            type: 1 ,
            area: ['800px','500px'],
            title: '编辑文章',
            content: $("#tpl-edit").html()
        })
    })
    // 1. 初始化图片裁剪器
    var $image = $('#image')
     
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    

      
})