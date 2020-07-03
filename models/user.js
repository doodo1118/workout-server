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
    image:{
      type: Sequelize.STRING,
    }
  }, {
    createdAt:false,
  })
);

module.exports = User;