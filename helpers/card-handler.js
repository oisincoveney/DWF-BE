const total = [
  'A-D', '2-D', '3-D', '4-D', '5-D', '6-D',
  '7-D', '8-D', '9-D', '10-D', 'J-D', 'Q-D',
  'K-D', 'A-C', '2-C', '3-C', '4-C', '5-C',
  '6-C', '7-C', '8-C', '9-C', '10-C', 'J-C',
  'Q-C', 'K-C', 'A-S', '2-S', '3-S', '4-S',
  '5-S', '6-S', '7-S', '8-S', '9-S', '10-S',
  'J-S', 'Q-S', 'K-S', 'A-H', '2-H', '3-H',
  '4-H', '5-H', '6-H', '7-H', '8-H', '9-H',
  '10-H', 'J-H', 'Q-H', 'K-H'
]
const deckLength = total.length

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]]
  }
}

const randomDeck = (numCards = deckLength) => {
  const numDecks = Math.floor(numCards / deckLength)
  const extraCards = numCards % deckLength
  let deck = []
  for (let i = 0; i < numDecks; ++i) {
    deck = deck.concat(total)
  }
  if (extraCards > 0) {
    const temp = [...total]
    shuffle(temp)
    deck = deck.concat(temp.slice(0, extraCards))
  }
  shuffle(deck)
  return deck
}

const getNumFromSuitCard = (cardnum) => {
  if (cardnum === 'A') { return 1 }
  if (cardnum === 'K') { return 13 }
  if (cardnum === 'Q') { return 12 }
  if (cardnum === 'J') { return 11 }
  return parseInt(cardnum)
}

const getNext = (num, deck) => {
  return num !== deck.length() ? num + 1 : -1
}

module.exports = {
  randomDeck,
  getNext,
  getNumFromSuitCard
}

console.log(randomDeck(52))
