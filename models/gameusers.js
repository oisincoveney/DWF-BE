'use strict'
module.exports = (sequelize, DataTypes) => {
  const GameUsers = sequelize.define('GameUsers', {
    GameId: {
      type: DataTypes.UUID,
      references: {
        model: 'Game',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    status: DataTypes.ENUM('connected', 'ready', 'waiting', 'playing', 'victim', 'disconnected'),
    joinedAt: DataTypes.DATE,
    score: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {})
  GameUsers.associate = function (models) {
    // associations can be defined here
  }
  return GameUsers
}
