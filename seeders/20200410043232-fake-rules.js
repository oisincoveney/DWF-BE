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
    /*
        rule_name: DataTypes.STRING,
    rule_description: DataTypes.STRING
     */
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        rule_name: `${faker.company.bsBuzz()} ${faker.hacker.noun()}`,
        rule_description: `${faker.lorem.sentence()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Rules', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Rules', null, {})
  }
}
