let express = require('express');
let router = express.Router();
//DB情報
const dbAccessor = require('../db/user_table_accessor')
/* GET users listing. */
router.get('/', function(req, res, next) {
    
    const userId = req.query.userId;

    //ユーザIDが無ければエラーページを返却
    if(req.query.userId === '' || req.query.userId === req.query.userId){}

    //ユーザID問い合わせ
    try{
        dbAccessor.userSelectAll(userId)
        .then(userSelectAllResult => {
            //登録ページをレンダリング
            if(userSelectAllResult.length === 0){

            }
            //指定ページレンダリング
            else{

            }
            console.log('返り値：' + res);


        })
        .catch(err=>{
            //エラーページレンダリング
        });
        
    }
    catch(err){
        console.log('------------------------------');
        console.log('------------ERROR-------------');
        console.log('------------------------------');
        console.log(err.name + ': ' + err.message);
        console.log('------------------------------');
    
    }
    finally{
        console.log('------------------------------');
        console.log('------------FINALLY-----------');
        console.log('------------------------------');
        db.close();
        console.log('------------------------------');
    }
});

module.exports = router;
