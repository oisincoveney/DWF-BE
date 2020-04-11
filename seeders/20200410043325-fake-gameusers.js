'use strict'
const models = require('../models/index')
const Game = models.Game
const User = models.User
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const gameIds = await Game.findAll({
      attributes: ['id']
    })

    const userIds = await User.findAll({
      attributes: ['id']
    })

    const enums = ['connected', 'ready', 'waiting', 'playing', 'victim', 'disconnected']
    const data = []
    for (const g of gameIds) {
      let i = 0
      for (const u of userIds) {
        data.push({
          GameId: g.id,
          UserId: u.id,
          status: enums[Math.round(Math.random() * 6)],
          joinedAt: new Date(),
          gameOwner: i === 0,
          score: faker.random.number(),
          order: ++i,
          updatedAt: new Date(),
          createdAt: new Date()
        })
      }
      i = 0
    }
    return queryInterface.bulkInsert('GameUsers', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('GameUsers', null, {})
  }
}
