const User = (sequelize, Sequelize)=>(
  sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey:true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    introduction:{
      type: Sequelize.STRING,
    },
    // instagram:{
      // type: Sequelize.STRING,
    // },
    image:{
      type: Sequelize.STRING,
    }
  }, {
    createdAt:false,
    charset: 'utf8', 
    collate: 'utf8_general_ci', 
  })
);

module.exports = User;