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
    })
  );
  
  module.exports = Statistic;