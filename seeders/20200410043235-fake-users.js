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
      const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    games_played: DataTypes.INTEGER,
    total_score: DataTypes.INTEGER,
    favorite_drink: DataTypes.STRING
  }, {})
     */
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
        games_played: faker.random.number(),
        total_score: faker.random.number(),
        favorite_drink: `${faker.address.state()} ${faker.name.jobType()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
}
