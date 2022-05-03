'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('sales', { 
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      vehicle_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'vehicles', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      employee_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'employees', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
