const Statistic = (sequelize, Sequelize)=>(
    sequelize.define('statistic', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      createdAt:false,
      charset: 'utf8', 
      collate: 'utf8_general_ci', 
    })
  );
  
  module.exports = Statistic;