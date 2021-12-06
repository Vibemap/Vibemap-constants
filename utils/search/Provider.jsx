import React from 'react'
import PropTypes from 'prop-types'
import VibemapSearchContext from './context'
import * as apiRequests from "./api-requests"
import { formatEvents, sortPlaces } from "./formatting"
import Fuse from 'fuse.js'

function VibemapSearchProvider({
  apiURL,
  children,
  preferStored,
  storedCities,
  storedEvents,
  storedGuides,
  storedPlaces,
  wordpressURL,
}) {
  const [results, setResults] = React.useState({
    cities: [],
    events: [],
    guides: [],
    places: [],
  })
  const [isLoadingCities, setIsLoadingCities] = React.useState(false)
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(false)
  const [isLoadingGuides, setIsLoadingGuides] = React.useState(false)
  const [isLoadingPlaces, setIsLoadingPlaces] = React.useState(false)
  const [perPage, setPerPage] = React.useState(20)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [searchBounds, setSearchBounds] = React.useState()
  const [searchDistance, setSearchDistance] = React.useState()
  const [searchCenter, setSearchCenter] = React.useState("12.234123123,109.231222333")
  const [searchTime, setSearchTime] = React.useState(new Date().toString())
  const [searchDays, setSearchDays] = React.useState(14)
  const [searchZoom, setSearchZoom] = React.useState(14)

  const searchOptions = React.useMemo(() => ({
    days: searchDays,
    bounds: searchBounds,
    distance: searchDistance,
    point: searchCenter,
    perPage,
    search: searchTerm,
    term: searchTerm,
    time: searchTime,
    zoom: searchZoom,
  }), [perPage, searchBounds, searchDistance, searchCenter, searchTime, searchTerm, searchDays, searchZoom])

  const searchCities = React.useCallback(
    async () => {
      setIsLoadingCities(true)

      if (preferStored) {
        const fuzzySearchOptions = {
          keys: ['name'],
        }

        const fuse = new Fuse(storedCities, fuzzySearchOptions)
        const cities = fuse.search(searchOptions.searchTerm)

        setResults((previousResults) => ({
          ...previousResults,
          cities,
        }))
      } else {
        const cities = await apiRequests.getCities(searchOptions, apiURL)

        setResults((previousResults) => ({
          ...previousResults,
          cities,
        }))
      }

      setIsLoadingCities(false)
    },
    [
      apiURL,
      preferStored,
      searchOptions,
      storedCities,
    ]
  )

  const searchEvents = React.useCallback(async () => {
    setIsLoadingEvents(true)
    const events = preferStored ? storedEvents : await apiRequests.getEvents(searchOptions, apiURL)
    const formattedEvents = formatEvents(events, searchOptions)

    setResults((previousResults) => ({
      ...previousResults,
      events: formattedEvents,
    }))
    setIsLoadingEvents(false)
  }, [apiURL, searchOptions, storedEvents, preferStored])

  const searchGuides = React.useCallback(
    async () => {
      setIsLoadingGuides(true)

      let guides

      if (preferStored) {
        const fuzzySearchOptions = {
          keys: ['title.rendered', 'content.rendered'],
        }

        const fuse = new Fuse(storedGuides, fuzzySearchOptions)
        guides = fuse.search(searchOptions.searchTerm)
      } else {
        guides = await apiRequests.getGuides(searchOptions, wordpressURL)
      }

      setResults((previousResults) => ({
        ...previousResults,
        guides,
      }))

      setIsLoadingGuides(false)
    },
    [
      searchOptions,
      preferStored,
      storedGuides,
      wordpressURL
    ]
  )

  const searchPlaces = React.useCallback(async () => {
    setIsLoadingPlaces(true)

    const places = preferStored ? storedPlaces : await apiRequests.getPlaces(searchOptions, apiURL)
    const sortedPlaces = sortPlaces(places, searchOptions)

    setResults((previousResults) => ({
      ...previousResults,
      places: sortedPlaces,
    }))

    setIsLoadingPlaces(false)
  }, [apiURL, searchOptions, preferStored, storedPlaces])

  const search = React.useCallback(() => {
    return Promise.all([
      searchCities(),
      searchPlaces(),
      searchEvents(),
      searchGuides(),
    ])
  }, [searchEvents, searchCities, searchPlaces, searchGuides])

  const value = {
    actions: {
      setSearchBounds,
      setSearchCenter,
      setSearchDistance,
      setPerPage,
      setSearchDays,
      setSearchTerm,
      setSearchTime,
      setSearchZoom,
      search,
    },
    progress: {
      isLoadingCities,
      isLoadingEvents,
      isLoadingGuides,
      isLoadingPlaces,
    },
    searchTerm,
    results,
  }

  return (
    <VibemapSearchContext.Provider value={value}>
      {children}
    </VibemapSearchContext.Provider>
  )
}

VibemapSearchProvider.propTypes = {
  apiURL: PropTypes.string,
  children: PropTypes.node.isRequired,
  preferStored: PropTypes.bool,
  storedCities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  storedPlaces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  storedEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  storedGuides: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

VibemapSearchProvider.defaultProps = {
  apiURL: 'https://api.vibemap.com/v0.3',
  preferStored: false,
  storedCities: [],
  storedPlaces: [],
  storedEvents: [],
  storedGuides: [],
  wordpressURL: 'https://cms.vibemap.com/wp-json/wp/v2',
}

export default VibemapSearchProvider