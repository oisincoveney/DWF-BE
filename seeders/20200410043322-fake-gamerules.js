'use strict'
const models = require('../models/index')
const Game = models.Game
const Rule = models.Rule

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
    const ruleIds = await Rule.findAll({
      attributes: ['id']
    })

    const data = []
    for (const g of gameIds) {
      let i = 0
      for (const r of ruleIds) {
        data.push({
          GameId: g.id,
          RuleId: r.id,
          card: ++i,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      i = 0
    }
    return queryInterface.bulkInsert('GameRules', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('GameRules', null, {})
  }
}
