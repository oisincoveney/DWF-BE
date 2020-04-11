const cardHandler = require('../helpers/card-handler')
const { v4: uuidv4 } = require('uuid')
const models = require('../models/index')
const Game = models.Game
const Rule = models.Rule
const User = models.User
const GameUsers = models.GameUsers

async function newGame (req) {
  const g = await Game.create({
    id: uuidv4(),
    cardOrder: cardHandler.randomDeck(52),
    nextCard: -1,
    game_start_time: new Date(),
    status: 'waiting',
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const u = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: (req.body.password) ? req.body.password : null,
    games_played: 0,
    total_score: 0,
    favorite_drink: req.body.favorite_drink,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const gu = await GameUsers.create({
    GameId: g.id,
    UserId: u.id,
    status: 'disconnected',
    joinedAt: new Date(),
    gameOwner: true,
    score: 0,
    order: 0,
    updatedAt: new Date(),
    createdAt: new Date()
  })
  return { game: g, users: u, gameusers: gu }
}
function startGame (GameId) {
  const g = Game.findByPk(GameId)
  g.status = 'started'
  g.save()
  nextCard(GameId, g)
}
function addUser (GameId, userData) {
  // add user to GameUsers and to Users list
}
// pause the game until all of the players have the status in the param
function waitForPlayerStatus (GameId, UserId, status) {}

function nextCard (GameId, gamedata = undefined) {
  let g
  if (!gamedata) { g = Game.findByPk(GameId) } else { g = gamedata }
  // get the next card
  g.nextCard += 1
  g.save()
  return cardHandler.getNumFromSuitCard(cardHandler.getNext(g.nextCard, g.cardOrder)[0])
}
function playMiniGame (GameId, RuleSetId, card) {
  // probably want some minigame lookup table if I want to program some games
}
function endGame (GameId) {}

module.exports = {
  newGame,
  startGame,
  addUser,
  waitForPlayerStatus,
  nextCard,
  playMiniGame,
  endGame
}
