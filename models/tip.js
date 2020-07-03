const Tip = (sequelize, Sequelize)=>(
    sequelize.define('tip', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      },
      motion:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      createdAt:false,
    })
  );
  
  module.exports = Tip;