let express = require('express');
let router = express.Router();
let config = require('config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //ユーザ登録時
    if(req.query.process === 'signUp'){

    }
    //遅刻欠席報告
    else if(req.query.process === 'report'){
        res.render('auth', {
            title : '',
            transitionUrl: config.serverInfo.URL + '/report',
            LiffId: config.Line.LiffId

        });
    }
    //　ユーザの出席率チェック
    else if(req.query.process === 'attendanceRateCheck'){

    }else{
        res.render('report', {
            title : 'エラー',
            message: '404 Not Found'
        });
    }
    
});

module.exports = router;
