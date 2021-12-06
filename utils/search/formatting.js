import truncate from 'truncate'
import * as helpers from '../helpers'
import * as Constants from '../../constants/constants'

export const sortPlaces = (places, options) => {
  const centerPoint = options.point.split(',').map(parseFloat)
  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours']
  const allVibes = options.mainVibe ? [...options.vibes, options.mainVibe] : options.vibes

  const placesScoredAndSorted = helpers.scorePlaces(
    places,
    centerPoint,
    allVibes,
    scoreBy,
    options.ordering,
    options.zoom
  )
  return placesScoredAndSorted
}

export const formatEvents = (events) => {
  return events.map((event) => ({
    ...event,
    properties: {
      ...event.properties,
      place_type: 'events',
      short_name: truncate(event.properties.name, Constants.TRUCATE_LENGTH),
      aggregate_rating: parseFloat(event.aggregate_rating),
      categories:
        (event.properties.categories || []).length === 0
          ? ['missing']
          : event.properties.categories,
      vibes: event.properties.vibes || ['chill'],
      cluster: null,
      id: event.id,
    }
  }))
}