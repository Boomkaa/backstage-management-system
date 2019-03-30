//专门处理用户的路由
const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = express.Router();

//处理注册的路由
router.post('/register', (req, res) => {
    //console.log('我进来了！');
    let name = req.body.userName;
    let pwd = req.body.pwd;
    //console.log(name,pwd);
    //将获取到的数据写入数据库，同时进行加密处理
    bcrypt.hash(pwd,10).then(saltPwd=>{
        let user = new UserModel({
            name:name,
            pwd:saltPwd
        });

        user.save()
        .then(() => {
            console.log('注册成功！');
            //res.send('注册成功！');
            res.redirect('/login.html');
        })
        .catch(error => {
            console.log('注册失败！', error);
            res.send('注册失败');
        });

    });
});

//处理登录的路由
router.post('/login',(req,res)=>{
    //console.log('我进来了！');
    let name = req.body.userName;
    let pwd = req.body.userPwd;
    //console.log(name,pwd);
    UserModel.findOne({
        name
    }).then(data=>{
        if(!data){  //用户不存在
            res.send({
                code:-1,
                msg:'用户不存在'
            });
        }else{  //用户存在
            //对密码进行解码，顺便判断密码是否正确
            bcrypt.compare(pwd,data.pwd,(err,isOk)=>{
                if(isOk){
                    //如果用户名和密码都正确,将用户的昵称写入is_admin写入到session中
                    req.session.nickName = data.nickName;
                    req.session.isAdmin = data.isAdmin;
                    //并将用户跳转到首页
                    res.redirect('/');
                }else{
                    res.send({
                        code:-2,
                        msg:'密码错误'
                    });
                }
            });
        }
    });
});

module.exports = router;