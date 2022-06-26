$(function(){
    let form=layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '用户昵称应在1~6位数之间'
            }
        }
    })
    function initInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.code!=0){
                    return layui.layer.msg('获取用户信息失败')
                }
                form.val('info_info', res.data);
            }
        })
    }
    initInfo();
    $('#btn_reg').click(function(e){
        e.preventDefault();
        initInfo();
    })

    $(".layui-form").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'PUT',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!=0){
                    return layui.layer.msg('提交失败')
                }
                layui.layer.msg('提交成功');
                window.parent.userInfo();
            }

        })
    })
})