'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    games_played: DataTypes.INTEGER,
    total_score: DataTypes.INTEGER,
    favorite_drink: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
