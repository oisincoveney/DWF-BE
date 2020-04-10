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
      queryInterface.addConstraint('GameRules', ['GameId'], {
        type: 'foreign key',
        name: 'FK_GameRules_Games_id',
        references: {
          table: 'Games',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('GameRules', ['RuleId'], {
        type: 'foreign key',
        name: 'FK_GameRules_Rules_id',
        references: {
          table: 'Rules',
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
      queryInterface.removeConstraint('GameRules', 'FK_GameUsers_Games_id'),
      queryInterface.removeConstraint('GameRules', 'FK_GameUsers_Rules_id')
    ])
  }
}
