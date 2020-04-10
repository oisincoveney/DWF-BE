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
      queryInterface.addConstraint('RuleSetOrders', ['RuleSetId'], {
        type: 'foreign key',
        name: 'FK_RuleSetOrder_RuleSet_id',
        references: {
          table: 'RuleSets',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('RuleSetOrders', ['RuleId'], {
        type: 'foreign key',
        name: 'FK_RuleSetOrder_Rule_id',
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
      queryInterface.removeConstraint('RuleSetOrder', 'FK_RuleSetOrder_RuleSet_id'),
      queryInterface.removeConstraint('RuleSetOrder', 'FK_RuleSetOrder_Rule_id')
    ])
  }
}
