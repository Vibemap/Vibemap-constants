import React from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import VibemapSearchContext from './context'
import * as apiRequests from "./api-requests"
import { formatEvents, sortPlaces } from "./formatting"

function VibemapSearchProvider({
  apiURL,
  children,
  doAutoSearch,
  userCoordinates,
  preferStoredCities,
  storedCities,
  preferStoredEvents,
  storedEvents,
  preferStoredGuides,
  storedGuides,
  preferStoredPlaces,
  storedPlaces,
  searchDebounceWait,
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
  const [searchCities, setSearchCities] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [searchBounds, setSearchBounds] = React.useState()
  const [searchDistance, setSearchDistance] = React.useState(20)
  const [searchCenter, setSearchCenter] = React.useState(userCoordinates)
  const [searchTime, setSearchTime] = React.useState(new Date().toISOString())
  const [searchDays, setSearchDays] = React.useState(14)
  const [searchCategory, setSearchCategory] = React.useState()
  const [searchVibes, setSearchVibes] = React.useState('')
  const [searchZoom, setSearchZoom] = React.useState(14)

  // workaround for debouncing async hooks
  const searchDebounceTimeout = React.useRef()

  React.useEffect(() => {
    setSearchCenter(userCoordinates)
  }, [userCoordinates])

  const searchOptions = React.useMemo(() => ({
    cities: searchCities.map(({ id }) => id).filter((id) => !!id).join(','),
    category: searchCategory,
    days: searchDays,
    bounds: searchBounds,
    distance: searchDistance,
    point: searchCenter,
    perPage,
    search: searchTerm,
    time: searchTime,
    vibes: searchVibes,
    zoom: searchZoom,
  }), [perPage, searchCategory, searchCities, searchBounds, searchDistance, searchCenter, searchTime, searchTerm, searchVibes, searchDays, searchZoom])

  const searchForCities = React.useCallback(
    async () => {
      if (searchOptions.search === "") {
        setResults((previousResults) => ({
          ...previousResults,
          cities: storedCities || [],
        }))
        return
      }

      setIsLoadingCities(true)

      if (preferStoredCities && storedCities) {
        const fuzzySearchOptions = {
          threshold: 0.4,
          keys: ['title', 'name'],
        }

        let cities

        if (searchOptions.search) {
          const fuse = new Fuse(storedCities, fuzzySearchOptions)
          cities = fuse.search(searchOptions.search).map(({ item }) => item)
        } else {
          cities = storedCities
        }

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
      preferStoredCities,
      searchOptions,
      storedCities,
    ]
  )

  const searchEvents = React.useCallback(async () => {
    setIsLoadingEvents(true)
    const events = preferStoredEvents
      ? storedEvents
      : await apiRequests.getEvents(searchOptions, apiURL)

    const formattedEvents = formatEvents(events, searchOptions)

    setResults((previousResults) => ({
      ...previousResults,
      events: formattedEvents,
    }))
    setIsLoadingEvents(false)
  }, [apiURL, searchOptions, storedEvents, preferStoredEvents])

  const searchGuides = React.useCallback(
    async () => {
      setIsLoadingGuides(true)

      let guides

      if (preferStoredGuides && storedGuides && searchOptions.search) {
        const fuzzySearchOptions = {
          keys: ['title.rendered', 'content.rendered'],
        }

        const fuse = new Fuse(storedGuides, fuzzySearchOptions)
        guides = fuse.search(searchOptions.search)
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
      preferStoredGuides,
      storedGuides,
      wordpressURL
    ]
  )

  const searchPlaces = React.useCallback(
    async () => {
      setIsLoadingPlaces(true)

      const places = preferStoredPlaces
        ? storedPlaces
        : await apiRequests.getPlaces(searchOptions, apiURL)

      setResults((previousResults) => ({
        ...previousResults,
        places,
      }))

      setIsLoadingPlaces(false)
    },
    [
      apiURL,
      preferStoredPlaces,
      searchOptions,
      storedPlaces
    ]
  )

  const search = React.useCallback(
    () => {
      Promise.all(
        [searchForCities(), searchPlaces(), searchEvents(), searchGuides()]
      )
    },
    [
      searchForCities,
      searchPlaces,
      searchEvents,
      searchGuides
    ]
  )

  const debouncedSearch = React.useCallback(
    () => {
      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current)
      }

      searchDebounceTimeout.current = setTimeout(
        search,
        searchDebounceWait
      )
    },
    [search, searchDebounceWait]
  )

  // clean debounce on unmount
  React.useEffect(() => {
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current)
    }
  }, [])

  React.useEffect(
    () => {
      if (!doAutoSearch) return;
      debouncedSearch();
    },
    [doAutoSearch, debouncedSearch]
  )

  const value = React.useMemo(() => ({
    actions: {
      setSearchBounds,
      setSearchCategory,
      setSearchCenter,
      setSearchCities,
      setSearchDistance,
      setPerPage,
      setSearchDays,
      setSearchTerm,
      setSearchTime,
      setSearchVibes,
      setSearchZoom,
      search,
      debouncedSearch,
    },
    progress: {
      isLoadingCities,
      isLoadingEvents,
      isLoadingGuides,
      isLoadingPlaces,
    },
    filters: {
      vibes: searchVibes,
      category: searchCategory,
      cities: searchCities,
    },
    searchTerm,
    results,
  }), [
    setSearchBounds,
    setSearchCategory,
    setSearchCenter,
    setSearchCities,
    setSearchDistance,
    setPerPage,
    setSearchDays,
    setSearchTerm,
    setSearchTime,
    setSearchVibes,
    setSearchZoom,
    search,
    searchTerm,
    results,
    isLoadingCities,
    isLoadingEvents,
    isLoadingGuides,
    isLoadingPlaces,
    searchVibes,
    searchCategory,
    searchCities,
  ])

  return (
    <VibemapSearchContext.Provider value={value}>
      {children}
    </VibemapSearchContext.Provider>
  )
}

VibemapSearchProvider.propTypes = {
  apiURL: PropTypes.string,
  children: PropTypes.node.isRequired,
  doAutoSearch: PropTypes.bool,
  preferStoredCities: PropTypes.bool,
  storedCities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  preferStoredPlaces: PropTypes.bool,
  storedPlaces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  preferStoredEvents: PropTypes.bool,
  storedEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  preferStoredGuides: PropTypes.bool,
  storedGuides: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

VibemapSearchProvider.defaultProps = {
  apiURL: 'https://api.vibemap.com/v0.3',
  doAutoSearch: false,
  preferStoredCities: false,
  storedCities: [],
  preferStoredPlaces: false,
  storedPlaces: [],
  preferStoredEvents: false,
  storedEvents: [],
  preferStoredGuides: false,
  searchDebounceWait: 1000,
  storedGuides: [],
  wordpressURL: 'https://cms.vibemap.com/wp-json/wp/v2',
}

export default VibemapSearchProvider