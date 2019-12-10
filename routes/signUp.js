let express = require('express');
let router = express.Router();
let config = require('config');
const line = require('@line/bot-sdk');

//-------------------------------------------------------------------
// create LINE SDK config from env variables
//-------------------------------------------------------------------
// const config_line = {
//     channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || config.azure.LINE_CHANNEL_ACCESS_TOKEN,
//     channelSecret: process.env.LINE_CHANNEL_SECRET || config.azure.LINE_CHANNEL_SECRET,
// };
const config_line = {
    channelAccessToken: config.Line.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: config.Line.LINE_CHANNEL_SECRET,
};



//-------------------------------------------------------------------
// create LINE SDK client
//-------------------------------------------------------------------
const client = new line.Client(config_line);



//DB情報
const dbAccessor = require('../db/user_table_accessor')
/* GET users listing. */
router.get('/', function(req, res, next) {
    
    const userId = req.query.userId;
    const displayName = req.query.displayName
    
    ;
    //ユーザIDが無ければエラーページを返却
    if(req.query.userId === '' || req.query.userId === req.query.userId){}

    //ユーザID問い合わせ
    try{
        dbAccessor.userSelectAll(userId)
        .then(userSelectAllResult => {
            //指定ユーザの登録情報確認
            if(userSelectAllResult.length === 0){
                //ユーザ情報照会
                client.getProfile(userId)
                .then(function(profile){
                    //利用申請
                    res.render('signUp', {
                        title  : '申請',
                        userId : userId,
                        displayName: displayName,
                        iconUrl : profile.pictureUrl,
                        LiffId: config.Line.LiffId
                    });
                    // resolve(new profileData(userId, profile.displayName));
                }).catch(function(err){
                    // log.output('getProfile:error:' + err);
                    // reject(err);
                });
                
            }
            //指定ページレンダリング
            else{

                //すでに登録済
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

router.post('/', function(req, res, next) {
    

    const userId = req.body.userId;
    const displayName = req.body.displayName;
    if( userId === ''){}
    let param = {
        'student_number': req.body.student_number,
        'full_name':req.body.full_name,
        'userId':userId,
        'display_name':displayName
    };

    //ユーザIDが無ければエラーページを返却
    // if(req.query.userId === '' || req.query.userId === req.query.userId){}

    
    //ユーザID問い合わせ
    dbAccessor.insertUserData(param)
    .then(insertUserDataResult => {
        console.log('------------------------------');
        console.log('-----------success------------');
        console.log('------------------------------');
        console.log(insertUserDataResult);
        console.log('------------------------------');
        
    })
    .catch(err => {
        console.log('------------------------------');
        console.log('-------------ERROR------------');
        console.log('------------------------------');
        console.log('errorrr');
        console.log('------------------------------');
    });
});

module.exports = router;
