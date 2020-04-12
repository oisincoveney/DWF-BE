/* eslint-disable no-unused-vars */
import * as cardHandler from './card-handler'

const models = require('../models/index')
const { Game, User, GameUsers, Rule, GameRules, RuleSet } = models
const { v4: uuidv4 } = require('uuid')

/* Create a new game */
async function createGame () {
  return await Game.create({
    id: uuidv4(),
    cardOrder: cardHandler.randomDeck(52),
    nextCard: 0,
    game_start_time: new Date(),
    status: 'created',
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

async function changeStatus (game, user, status) {
  return await GameUsers.update({ status }, { where: { UserId: user.id, GameId: game.id } })
  // tell other users that the user has confirmed
}

/* Wait for users to join the game */
async function numUsersWithStatus (status) {
  return GameUsers.findAll()
}

/* Start the game */
async function startGame () {}

/* Take a turn:
 *   0) Wait for users to confirm the next game
 *   1) Identify the user with the current turn
 *   2) Draw the card
 *   3) Find the rule for the card
 *   4) Act on the rule
 *   5) End the turn */
async function takeTurn () {}

/* End the game */
async function endGame () {}

/* Delete the game */
async function deleteGame () {}

module.exports = {}
