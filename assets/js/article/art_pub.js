$(function(){
    initCate()
    initEditor()
    //定义文章分类的方法
    var layer = layui.layer
    var form = layui.form
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
    // 1. 初始化图片裁剪器
    var $image = $('#image')
     
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //选择封面
    $("#btn-choose").on('click',function(){
        $("#coverFile").click()
    })
    $("#coverFile").on('change',function(e){
        var filelist = e.target.files
        console.log(filelist);
        if(filelist.length === 0){
            return layer.msg('请选择图片')
        }
        var newImgUrl = URL.createObjectURL(filelist[0])
        // 为裁剪区域重新设置图片
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src',newImgUrl) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    }) 
    var state = null
    $("#btnSave2").on('click',function(){
         state = '草稿'
    })
    $("#btnSave").on('click',function(){
        state = '已发布'
   })  
    $('#form-pub').on('submit',function(e){
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state',state)
        //将裁剪后的图片，输出为文件


        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作

        fd.append('cover_img',blob)
        pubArticel(fd)
        })
    })
    function pubArticel(fd){
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('发布文章失败')
                }
                layer.msg(res.message)
                location.href = 'article_list.html'
            }

        })
    }
})