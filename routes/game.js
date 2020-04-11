const { v4: uuidv4 } = require('uuid')
const cardHandler = require('../helpers/card-handler')
const gameHandler = require('../helpers/game-handler')
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
  let data = await gameHandler.newGame(req)
  res.send(data)
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
      // return number of users (or users) that are still unconfirmed
      const gu = await GameUsers.findAll({
        attributes: ['id', 'UserId', 'status'],
        where: {
          GameId: req.params.GameId
        }
      })
      let count = 0
      for (const g of gu) {
        if (g.UserId === user.id) {
          g.status = 'ready'
          g.save()
        } else if (g.status !== 'ready') {
          count += 1
        }
      }
      if (count !== gu.length) {
        socket.emit('waiting_for_players', {
          usersLeft: count
        })
      } else {
        socket.emit('done_waiting', {
          game: g
        })
      }
    })
    socket.on('next_card', () => {
      const g = await Game.findByPk(req.params.GameId)
      g.nextCard++
      g.save()
      socket.emit('next_card', {
        game: g
      })
    })
    socket.on('game_ended', () => {})
    socket.on('disconnect', () => {})
  })
})

module.exports = { routeName, router }
