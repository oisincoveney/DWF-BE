'use strict'
module.exports = (sequelize, DataTypes) => {
  const GameRules = sequelize.define('GameRules', {
    GameId: {
      type: DataTypes.UUID,
      references: {
        model: 'Game',
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
    card: DataTypes.INTEGER
  }, {})
  GameRules.associate = function (models) {
    // associations can be defined here
  }
  return GameRules
}
