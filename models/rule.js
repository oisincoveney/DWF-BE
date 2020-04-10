'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    rule_name: DataTypes.STRING,
    rule_description: DataTypes.STRING
  }, {})
  Rule.associate = function (models) {
    // associations can be defined here
  }
  return Rule
}
