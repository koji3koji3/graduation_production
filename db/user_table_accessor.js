const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(":memory:",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

// //   var function() 
//     var dbAccessor = function(){

//     }
//　データ挿入
module.exports.insertUserData = function (param){

    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            //無ければ作る
            db.run('CREATE TABLE IF NOT EXISTS user(student_number INT PRIMARY KEY, full_name TEXT, user_id TEXT, display_name TEXT)');

            db.run('insert into user (student_number, full_name, user_id, display_name) values ($a, $b, $c, $d)', 
                {
                    $a: param.student_number,
                    $b: param.full_name,
                    $c: param.userId,
                    $d: param.display_name
                },
                function (err, res) {
                    if (err) return reject(err);
                    
                    resolve(res);
                }
            );
        },db.close());
    });


    
};

//　ユーザIDで検索
module.exports.userSelectAll = function (userId, callback) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            //無ければ作る
            db.run('CREATE TABLE IF NOT EXISTS user(student_number INT PRIMARY KEY, full_name TEXT, user_id TEXT, display_name TEXT)');

            db.all('select * from user where user_id = ?' ,
                userId,
                   
                function (err, rows) {
                    if (err){
                        throw err;
                    }else{
                      
                        rows.forEach(function (row) {
                            callback(row);
                        });
                    }
                },
                function (err, res) {
                    if (err){
                        console.log('---------------------');
                        console.log('userSelectAll ERROR');
                        console.log(err);
                        console.log('---------------------');
                        return reject(err);
                    }else{
                        if (res == 0){
                            //ここでSQLの実行結果が0件の処理や
                            console.log('---------------------');
                            console.log('userSelectAll END');
                            console.log('---------------------');
                            resolve(res);
                        }else{
                            //処理や
                        }
                        
                    }
                }

            );
        });
    });
};

// module.exports = dbAccessor;