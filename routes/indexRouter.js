//专门处理ejs模板的路由
const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();

//当进入的路径为/时，说明进入的是主页
router.get('/',(req,res)=>{
    //console.log('我来了');
   //判断用户是否登录
    if(req.session.nickName){
        //如果存在，访问数据库
        UserModel.find()
        .then(data=>{
            res.render('index',{
                nickName:req.session.nickName,
                isAdmin:req.session.isAdmin,
                userList:data
            });
        });
    }else{
        res.redirect('/login.html');
    }
});

router.get('/login.html',(req,res)=>{
    req.session.abc = "李青";
    res.render('login');
});

router.get('/register.html',(req,res)=>{
    res.render('register');
});

module.exports = router;