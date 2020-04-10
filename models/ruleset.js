'use strict'
module.exports = (sequelize, DataTypes) => {
  const RuleSet = sequelize.define('RuleSet', {
    rule_set_name: DataTypes.STRING,
    rule_set_description: DataTypes.STRING,
    times_used: DataTypes.INTEGER
  }, {})
  RuleSet.associate = function (models) {
    // associations can be defined here
  }
  return RuleSet
}
