import React from "react"

import './pulse.scss'

const Pulse = ({ show, color }) => {
  return (
    <div>
      {show &&
        <div
          className='marker-pulse'
          style={{
            background: color
          }}
        />
      }
    </div>
  )
}

Pulse.defaultProps ={
  color: '#ff00ff',
  size: '1rem',
  show: false,
}

export default Pulse
