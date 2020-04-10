'use strict'
const faker = require('faker')
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
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        rule_set_name: `${faker.hacker.adjective()} ${faker.company.catchPhraseNoun()}`,
        rule_set_description: faker.lorem.sentence(),
        times_used: faker.random.number(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('RuleSets', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('RuleSets', null, {})
  }
}
