let express = require('express');
let router = express.Router();
let config = require('config');
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.userId);
    console.log(req.query.displayName);
    // mySqlに通信しユーザIDが存在するかチェック
    // 無し：登録してください
    // 有り：入力フォームのページに遷移
    
    //ユーザIDが存在するか　有り：true 無し : false
    var existenceCheckFlag = true;
    if(existenceCheckFlag){

        res.render('report', {
            title : '報告',
            reportCategory  : config.ReportCategory,
            LiffId: config.Line.LiffId
            // message: message
        });
        
    }else{

    }
    
});

module.exports = router;
