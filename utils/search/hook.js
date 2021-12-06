import React from 'react'
import VibemapSearchContext from './context'

function useVibemapSearch() {
  return React.useContext(VibemapSearchContext)
}

export default useVibemapSearch