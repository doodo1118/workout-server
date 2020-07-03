const History = (sequelize, Sequelize)=>(
    sequelize.define('history', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startedAt:{
          type: Sequelize.DATE,
      },
      logs:{
        type: Sequelize.JSON,
        allowNull: false,
      },
      volume:{
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
      time:{
        type: Sequelize.INTEGER,
        allowNull: false, 
      }, 
      sets:{
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      targets:{
        type: Sequelize.JSON, 
        allowNull : false, 
      },
      memo:{
        type: Sequelize.STRING,
      },
    }, {
      createdAt:false,
    })
  );
  
  module.exports = History;