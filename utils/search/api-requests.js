async function callAPI(endpoint) {
  try {
    const response = await fetch(endpoint)
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export const getPlaces = async (options, apiURL) => {
  const centerPoint = options.point.split(',').map(parseFloat)

  let searchParams = {
    ordering: '-aggregate_rating',
    per_page: options.perPage || 50,
    dist: options.distance > 0 ? options.distance * 1609.344 : 1,
    point: centerPoint,
    days: options.days,
    search: options.search || undefined,
    time: options.time,
    vibes: options.vibes,
    zoom: options.zoom,
  }

  let retries = 3
  let apiResult

  do {
    const searchQuery = new URLSearchParams(searchParams).toString()
    apiResult = await callAPI(`${apiURL}/places/?${searchQuery}`)
    retries--
    searchParams.dist /= 2
  } while (retries > 0 && apiResult.count > 0)

  return apiResult.results.features
}

export const getEvents = async (options, apiURL) => {
  const centerPoint = options.point.split(',').map(parseFloat)

  const searchParams = {
    ordering: '-aggregate_rating',
    per_page: options.perPage || 50,
    dist: options.distance > 0 ? options.distance * 1609.344 : 1,
    point: centerPoint,
    days: options.days,
    search: options.search || undefined,
    time: options.time,
    vibes: options.vibes,
    zoom: options.zoom,
  }

  const searchQuery = new URLSearchParams(searchParams).toString()

  const apiResult = await callAPI(`${apiURL}/events/?${searchQuery}`)

  return apiResult.results.features
}

export const getCities = async (options, apiURL) => {
  const searchParams = {
    search: options.search,
  }
  const searchQuery = new URLSearchParams(searchParams).toString()

  const apiResult = await callAPI(`${apiURL}/boundaries/?${searchQuery}`)
  return apiResult.results
}

export const getGuides = async (options, apiURL) => {
  const joinedFields = options.fields
    ? options.fields.join(',')
    : 'author,content,id,date,featured_media,featured_media_source_url,link,slug,status,title,vibe'

  const searchParams = {
    search: options.search,
    per_page: options.perPage || 20,
    _fields: joinedFields,
  }

  const searchQuery = new URLSearchParams(searchParams).toString()
  const apiResult = await callAPI(`${apiURL}/posts?${searchQuery}`)
  return apiResult
}