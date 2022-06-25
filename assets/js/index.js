$(function(){
    userInfo();
    let layer=layui.layer
    $('#btn_logout').on('click',function(){
        layer.confirm('确定退出页面？', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token');
            location.href='./login.html'
            //官方提供的关闭窗口的方法
            layer.close(index);
          });
    })
    
})


//获取用户基本信息
function userInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.code!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // console.log(res);
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     console.log(res);
        //     if(res.responseJSON.code==1&&res.responseJSON.message=='身份认证失败！'){
        //         localStorage.removeItem('token');
        //         location.href='./login.html';
        //     }
        // }
    })
}


//渲染头像
function renderAvatar(user){
    let nickname=user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+nickname);
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        let first=nickname[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}

