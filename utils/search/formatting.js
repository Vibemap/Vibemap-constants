import truncate from 'truncate'
import * as Constants from 'vibemap-constants/dist/constants'

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