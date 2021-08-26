import React, { useState } from 'react'

import VisibilitySensor from 'react-visibility-sensor';

const FadeIn = ({ children, ...props }) => {

  let [isActive, setIsActive] = useState(false)

  const onChange = (isVisible) => {
    if (isVisible && props.once) {
      setIsActive(true)
    }
  }

  return (
    <VisibilitySensor
      delayedCall={true}
      partialVisibility={props.partialVisibility}
      onChange={onChange}>

      {({isVisible}) => (
        <div
          className={isVisible
            ? 'visible' :
            'invisible'}
          style={{
            opacity: isVisible || isActive
              ? '1.0'
              : '0.6',
            transform: isVisible || isActive
              ? 'none'
              : 'translateY(' + props.height + ')'
        }}>
          {isVisible}
          {children}
        </div>
      )}

    </VisibilitySensor>
  )
}


FadeIn.defaultProps ={
  once: true,
  height: '1rem',
  partialVisibility: true
}

export default FadeIn
