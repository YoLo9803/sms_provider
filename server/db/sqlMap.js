// sql語句
var sqlMap = {
    // 使用者
    user: {
        add: 'insert into user(account, password, fund) values (?, ?, 100)'
    }
}

module.exports = sqlMap;