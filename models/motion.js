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
      charset: 'utf8', 
      collate: 'utf8_general_ci', 
    })
  );
  
  module.exports = Motion;