'use strict'
const uuid = require('uuid/v4')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      cardOrder: {
        type: Sequelize.STRING
      },
      nextCard: {
        type: Sequelize.INTEGER
      },
      game_start_time: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: ['created', 'waiting', 'started', 'in_progress', 'ended']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games')
  }
}
