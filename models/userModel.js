const db = require('../config/db');

//new 一个schenma实例对象，并对new出来的对象进行数据类型的指定
const schema = new db.Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    headImg: String,
    nickName: {
        type: String,
        default() {
            return '普通用户'
        }
    },
    isAdmin: {  //查看该用户是否为管理员
        type: Number,
        default() {
            //0--代表普通人
            //1--代表管理员
            return 0;
        }
    }
}, {
        collection: 'user'    //这里是指定集合的名字，无论单复数
    });

//由于上面创建schema对象时指定了集合名称，所以这里可以进行任意传参，对最后的结果都不会有影响
module.exports = db.model('a', schema);