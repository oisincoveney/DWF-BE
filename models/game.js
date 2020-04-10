'use strict'
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    cardOrder: DataTypes.STRING,
    nextCard: DataTypes.INTEGER,
    game_start_time: DataTypes.DATE,
    status: DataTypes.ENUM('created', 'waiting', 'started', 'in_progress', 'ended')
  }, {})
  Game.associate = function (models) {
    // associations can be defined here
  }
  return Game
}
