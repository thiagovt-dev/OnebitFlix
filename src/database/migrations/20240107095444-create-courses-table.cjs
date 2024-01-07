'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async  (queryInterface, Sequelize)=> {
    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnail_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "categories", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
        const coursesRandomId = Math.floor(Math.random() * 10000) + 20000;
        await queryInterface.sequelize.query(
          `ALTER SEQUENCE "courses_id_seq" RESTART WITH ${coursesRandomId};`
        );
  },


  down: async  (queryInterface, Sequelize)=> {
    await queryInterface.dropTable("courses");

  }
};
