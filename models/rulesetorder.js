'use strict'
module.exports = (sequelize, DataTypes) => {
  const RuleSetOrder = sequelize.define('RuleSetOrder', {
    RuleSetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RuleSet',
        key: 'id'
      }
    },
    RuleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rule',
        key: 'id'
      }
    },
    order: DataTypes.INTEGER
  }, {})
  RuleSetOrder.associate = function (models) {
    // associations can be defined here
  }
  return RuleSetOrder
}
