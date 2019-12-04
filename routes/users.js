let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3').verbose();                                          
var db = new sqlite3.Database(":memory:",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

/* GET users listing. */
router.get('/', function(req, res, next) {

//ユーザID問い合わせ
try{
  db.serialize(function() {
    // テーブルがなければ作成
    // student_number:学籍番号(INT 主キー)
    // full_name:     氏名(TEXT)
    // user_id:       ユーザーID(TEXT)
    // display_name:  表示名(TEXT)
    db.run('CREATE TABLE IF NOT EXISTS user(student_number INT PRIMARY KEY, full_name TEXT, user_id TEXT, display_name TEXT)');
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
