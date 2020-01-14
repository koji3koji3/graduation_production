let express = require('express');
let router = express.Router();
let config = require('config');
let moment = require("moment");

//----------------------------------
// ユーザがアクセス
//----------------------------------
//DB情報
const dbAccessor = require('../db/user_table_accessor');
/* GET users listing. */
router.get('/', function(req, res, next) {
    
    const userId = req.query.userId;
    const displayName = req.query.displayName;
    // mySqlに通信しユーザIDが存在するかチェック
    // 無し：登録してください
    // 有り：入力フォームのページに遷移
    
    //ユーザID問い合わせ
    try{
        dbAccessor.userGetALL()
        .then(reportGetALL => {
            //指定ユーザの登録情報確認
            if(reportGetALL.length === 0){
                //報告が0件数
                
            }
            //報告があった場合は全表示(遅刻と欠席でタブ分け)
            else{
                res.render('adminReportList', {
                    title : '報告',
                    ReportData  : reportGetALL,
                    LiffId: config.Line.LiffId,
                    
                    // message: message
                });
            }
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
    }
    
    
});


module.exports = router;
