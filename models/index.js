const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
// db.Post = require('./post')(sequelize, Sequelize);
db.Routine = require('./routine')(sequelize, Sequelize);
db.History = require('./history')(sequelize, Sequelize);
db.Motion = require('./motion')(sequelize, Sequelize);
db.Tips = require('./tip')(sequelize, Sequelize);

db.User.hasMany(db.History, {foreignKey: 'userId'});
db.User.hasMany(db.Routine, {foreignKey: 'userId'});


// bookmark
db.User.belongsToMany(db.Routine, {
  through:'bookmark',
});
db.Routine.belongsToMany(db.User,{
  through:'bookmark',
});

// follow
db.User.belongsToMany(db.User, {
  foreignKey:'followingId',
  as:'followers',
  through:'follow',
});
db.User.belongsToMany(db.User, {
  foreignKey:'followerId',
  as:'followings',
  through:'follow',
});


module.exports = db;