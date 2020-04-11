const { v4: uuidv4 } = require('uuid')
const cardHandler = require('../helpers/card-handler')
const express = require('express')
const router = express.Router()
const models = require('../models/index')
const Game = models.Game
const User = models.User
const GameUsers = models.GameUsers
const GameRules = models.GameRules
const Rule = models.Rule

const routeName = '/game'

/* Create game */
router.post('/create', async (req, res, next) => {
  const g = await Game.create({
    id: uuidv4(),
    cardOrder: cardHandler.randomDeck(52),
    nextCard: 0,
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

  res.send({ g, gu })
})

/* main game */
router.get('/:GameId/', function (req, res, next) {
  const io = req.app.get('socketio')
  const gameNsp = io.of('/' + req.params.GameId)
  gameNsp.on('connection', (socket) => {
    socket.on('join', async (userdata) => {
      const u = await User.create(userdata)
      const g = await GameUsers.create({
        GameId: req.params.GameId,
        UserId: u.id,
        status: 'ready',
        joinedAt: new Date(),
        gameOwner: false,
        score: 0,
        order: 0,
        updatedAt: new Date(),
        createdAt: new Date()
      })
      socket.emit({ game: g })
    })
    socket.on('start', async () => {
      const game = await Game.findByPk(req.params.GameId)

      const gus = await GameUsers.findAll({
        where: {
          GameId: req.params.GameId
        }
      })
      let currPlayer = null
      gus.forEach(g => {
        if (g.order === 0) {
          currPlayer = g
          g.status = 'victim'
        } else {
          g.status = 'playing'
        }
      })
      const card = JSON.parse(game.cardOrder)[game.nextCard]
      const rule = Rule.findOne({
        where: {
          GameId: req.params.GameId,
          card: cardHandler.getNumFromSuitCard(card[0])
        }
      })
      socket.emit('new_rule', {
        game,
        card,
        rule,
        currPlayer
      })
    })
    socket.on('ready_for_next', async (user) => {
      // return number of users (or users that are still unconfirmed
      await GameUsers.update({
        status: 'ready'
      }, {
        where: {
          UserId: user.id
        }
      })
    })
    socket.on('next_card', () => {})
    socket.on('game_ended', () => {})
    socket.on('disconnect', () => {})
  })
})

module.exports = { routeName, router }
