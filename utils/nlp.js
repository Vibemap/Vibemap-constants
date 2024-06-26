const tokenizer = require('wink-tokenizer')
const { similarity} = require('@nlpjs/similarity')

import Fuse from 'fuse.js'

const vibes = require('../dist/vibes.js')

// Get vibe attributes
export const getTokens = (
  content = '@superman: hit me up on my email r2d2@gmail.com, 2 of us plan party🎉 tom at 3pm:) #fun'
  ) => {
  const Tokenizer = tokenizer()

  const tokens = Tokenizer.tokenize(content);

  //console.log('Tokens ', tokens);

  return tokens
}

// Fuzzy matching of strings
export const fuzzyMatch = (list, searchTerm, key) => {
  let options = {
    includeScore: true,
    keys: ['value', 'name'],
  }

  if (key) options.keys.push(key)

  const fuse = new Fuse(list, options)
  const results = fuse.search(searchTerm)

  const filter_results = results.filter((result) => {
    if (result.score < 0.3) return true
    return false
  }, [])

  const top_results = filter_results.map((result) => result.item)

  return top_results
}


// This uses an advanced levenstein technique
// TODO: Use a complete word network like we do with spacy.
export const getSimilarity = (word1 = 'chill', word2 = 'chill') => {
  const distance = similarity(word1, word2)
  //console.log(`${word1} vs ${word2} distance `, distance)
  return distance
}

export const getSimilarVibes = (word = 'chill') => {
  const allVibes = vibes.getVibes('keys')

  const vibesWithRelated = allVibes.flatMap(vibe => {
    const distance = getSimilarity(word, vibe)

    const similarEnough = (distance == 0 || (distance == 1 && word.length > 3))
    if (similarEnough) {
      console.log(`- very similar `, word, vibe, distance);
      return [vibe]
    } else {
      return []
    }

  })

  return vibesWithRelated
}

export const getAllSimilarVibes = (
  content = `<p><em>Looking for a great night out with cheap drinks, chill vibes, and an unpretentious atmosphere? We’ve got you covered</em>.</p><p>The debate around the precise definition of a “dive bar” is spirited, even contentious. Wikipedia describes it as a small, unglamorous, eclectic, and old-style bar. Some say the line between a dive bar and a regular bar is its level of disrepute. For this guide, we define it as a place with three things: cheap drinks, chill vibes, and an unpretentious atmosphere.&nbsp;</p><p>Chances are high you’re not going to get your culinary socks knocked off at a dive bar. And if you ask for a gluten-free option you are liable to get laughed at. But there’s no better kind of place to go to spend a good night out with good friends and interesting strangers. So if you’re looking for a cool dive bar in Oakland, look no further than this handy guide.</p>`) => {
  const tokens = getTokens(content)
  const words = tokens.map(token => token.value)

  const vibes = words.flatMap(word => {
    return getSimilarVibes(word)
  })

  console.log(`Found these vibes `, vibes);
}


