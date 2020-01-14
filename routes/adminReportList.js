let express = require('express');
let router = express.Router();
let config = require('config');
const line = require('@line/bot-sdk');

//-------------------------------------------------------------------
// create LINE SDK config from env variables
//-------------------------------------------------------------------
const config_line = {
    channelAccessToken: config.Line.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: config.Line.LINE_CHANNEL_SECRET,
};

//-------------------------------------------------------------------
// create LINE SDK client
//-------------------------------------------------------------------
const client = new line.Client(config_line);

//DB情報
const dbAccessor = require('../db/user_table_accessor');

//----------------------------------
// 教師がアクセス(生徒の報告を一覧表示)
//----------------------------------

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    //ユーザID問い合わせ
    try{
        dbAccessor.reportGetALL()
        .then(res => {
            //遅刻
            let tardy = [];
            //欠席
            let absence = [];
            //タブ分けするために、遅刻と欠席のデータを分ける
            res.forEach(elem => {
                //遅刻判定
                if(elem.report_category === 0){
                    tardy.push(elem);
                //欠席
                }else if(elem.report_category === 1){
                    absence.push(elem)
                }
            });

            //指定ユーザの登録情報確認
            if(res.length === 0){
                
            }
            //登録されている場合
            else{
                res.render('message', {
                    title  : '結果',
                    textMain:'承認までお待ちください。',
                    LiffId: config.Line.LiffId
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
