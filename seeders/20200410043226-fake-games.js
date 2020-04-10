'use strict'
const cardHandler = require('../helpers/card-handler')
const { v4: uuid } = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    /*
    const Game = sequelize.define('Game', {
    cardOrder: DataTypes.STRING,
    nextCard: DataTypes.INTEGER,
    game_start_time: DataTypes.DATE,
    status: DataTypes.ENUM('created', 'waiting', 'started', 'in_progress', 'ended')
  }, {})
     */
    const enums = ['created', 'waiting', 'started', 'in_progress', 'ended']
    const data = []
    for (let i = 0; i < 10; ++i) {
      data.push({
        id: uuid(),
        cardOrder: cardHandler.randomDeck(52),
        nextCard: Math.round(Math.random() * 50),
        game_start_time: new Date(),
        status: enums[Math.round(Math.random() * 4)],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    console.log(data)
    return queryInterface.bulkInsert('Games', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Games', null, {})
  }
}
