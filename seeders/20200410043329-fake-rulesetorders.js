'use strict'

const models = require('../models/index')
const RuleSet = models.RuleSet
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

    const rulesetIds = await RuleSet.findAll({
      attributes: ['id']
    })

    const ruleIds = await Rule.findAll({
      attributes: ['id']
    })

    const data = []
    for (const rs of rulesetIds) {
      let i = 0
      for (const r of ruleIds) {
        data.push({
          RuleSetId: rs.id,
          RuleId: r.id,
          order: ++i,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      i = 0
    }
    return queryInterface.bulkInsert('RuleSetOrders', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('RuleSetOrders', null, {})
  }
}
