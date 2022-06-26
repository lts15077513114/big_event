$(function(){
    let form=layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samepwd:function(value){
            if(value===$('[name=old_pwd]').val()){
                return '新旧密码不能相同'
            }
        },
        repwd:function(value){
            if(value!==$('[name=new_pwd]').val()){
                return '新密码值不相同'
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'PATCH',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!==0){
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功');
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})