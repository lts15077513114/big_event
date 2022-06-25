$(function(){
    $('#link_reg').on('click',function(){
        $('.reg_login').hide();
        $('.login_login').show();
    })

    $('#link_login').on('click',function(){
        $('.reg_login').show();
        $('.login_login').hide();
    })
    let form=layui.form;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd:function(value){
            let pwd=$('.login_login [name="password"]').val();
            if(value!==pwd){
                return '两次密码输入不一致'
            }
        }
    })
    let layer=layui.layer;
    //注册监听
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        let data={
            username:$('#form_reg [name="username"]').val(),
            password:$('#form_reg [name="password"]').val(),
            repassword:$('#form_reg [name="repassword"]').val(),
        };
        $.post('/api/reg',data,function(res){
            if(res.code!==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功')
        })
        $('#link_login').click();
    })
    //登录监听
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            type:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!==0){
                    return layer.msg('登录失败')
                }
                localStorage.setItem("token",res.token);
                layer.msg('登录成功');
                location.href='/index.html';
            }

        })
    })
})