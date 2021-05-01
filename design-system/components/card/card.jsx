import React from 'react';
import PropTypes from 'prop-types';

import Heading from '@vibemap/shared.heading'

import styles from './singCard.scss'
//console.log('Sass imports ', variables, globals)

export const Container = ({ content, image, width, orientation, ...props }) => {
  const style = {
    width: width,
    minHeight: '10rem'
  }

  switch (orientation) {
    case 'horizontal':
      return (
        <div className='sing-card o-vertical s-basic' style={style}>
          <a className='sing-card-inner' style={style}>
            <div className="columns is-flex-tablet is-gapless">
              <div className="column is-4 image is-flex-tablet">
                {image}
              </div>
              <div className="column is-8 text is-flex-tablet">
                <div className="inner-column">
                  {content}
                </div>
              </div>
            </div>
          </a>
        </div>
      )
      break;

    // vertical as default
    default:
      return (
        <div className='sing-card o-vertical s-basic' style={style}>
          <a className='sing-card-inner' style={style}>
            {image}
            {content}
          </a>
        </div>
      )
      break;
  }
}

const Card = ({
  title,
  description,
  orientation,
  width,
  ...props }) => {

  // TODO: Make these styled components that also support Sass
  const image = (
    <div className='sing-card-image'></div>
  )
  const content = (
    <div className='sing-card-bottom'>
      <span className="category"><span>Category</span></span>
      <Heading label={title} size='h5'/>
      <div className="description">
        {description}
      </div>
    </div>
  )

  return (
    <Container
      orientation={orientation}
      width={width}
      image={image}
      content={content}/>
  )
}

Container.propTypes = {
  width: PropTypes.string
}

Container.defaultProps = {
  width: '300px'
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  width: PropTypes.string
}

Card.defaultProps = {
  title: 'Card Title',
  description: 'Description goes here.',
  orientation: 'vertical',
  onClick: undefined,
}

export default Card
