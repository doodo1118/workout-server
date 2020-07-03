const Motion = (sequelize, Sequelize)=>(
    sequelize.define('motion', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameEnglish:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      equipment:{
        type: Sequelize.STRING,
      },
      targets:{
        type: Sequelize.STRING,
      },
      category:{
          type: Sequelize.STRING,
      }
    }, {
      createdAt:false,
    })
  );
  
  module.exports = Motion;