const Routine = (sequelize, Sequelize)=>(
    sequelize.define('routine', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true,
      },
      title:{
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
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
      charset: 'utf8', 
      collate: 'utf8_general_ci', 
    })
  );
  
  module.exports = Routine;