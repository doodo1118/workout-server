require('dotenv').config();

module.exports = {
    development: {
        username: 'admin', 
        // username: 'root', 
        password: process.env.SEQUELIZE_PASSWORD, 
        database: 'workout',
        // host: '127.0.0.1', 
        host: 'workout.ckfzae75qkbl.ap-northeast-2.rds.amazonaws.com',
        dialect: 'mysql',
        operatorAliases: 'false', 
    }, 
    production: {
        username: 'admin', 
        // username: 'root', 
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'workout', 
        // host: '127.0.0.1', 
        host: 'workout.ckfzae75qkbl.ap-northeast-2.rds.amazonaws.com',
        dialect: 'mysql', 
        operatorAliases: 'false', 
        logging : false,
    },
}