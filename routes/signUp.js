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
            //登録ページをレンダリング
            if(userSelectAllResult.length === 0){
                //ユーザ情報照会
                client.getProfile(userId)
                .then(function(profile){

                    res.render('signUp', {
                        title  : '登録',
                        userId : userId,
                        displayName: displayName,
                        iconUrl : profile.pictureUrl
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
