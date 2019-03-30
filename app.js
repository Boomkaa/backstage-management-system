const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

//引入相应的router模块，路由中间件函数
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

//设置静态资源托管的文件夹
app.use(express.static(path.resolve(__dirname, './public')));

//为了能够使用req.body的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//设置模板页面的存放路径与应该使用哪种模板引擎
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');


//使用cookie中间件
app.use(cookieParser());

//设置session相关的内容
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"you_know_i_konw"
}));

//当路径为/时，进入indexRouter里面进行操作
app.use('/',(req,res,next)=>{
    res.set('Cache-Control','no-cache,no-store,must-revalidate');
    next();
}, indexRouter);
//当路径为/user时，进入到userRouter里面进行操作
app.use('/user', userRouter);

app.listen(3000);