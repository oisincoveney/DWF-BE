'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addConstraint('GameUsers', ['GameId'], {
        type: 'foreign key',
        name: 'FK_GameUsers_Games_id',
        references: {
          table: 'Games',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('GameUsers', ['UserId'], {
        type: 'foreign key',
        name: 'FK_GameUsers_Users_id',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeConstraint('GameUsers', 'FK_GameUsers_Games_id'),
      queryInterface.removeConstraint('GameUsers', 'FK_GameUsers_Users_id')
    ])
  }
}
