import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from '../heading' 

//import styles from './singCard.scss'
//console.log('Sass imports ', variables, globals)

export const Card = ({ 
  title, 
  description,
  orientation,
  ...props }) => {
    
  return (
    <div className='sing-card o-vertical s-basic'>
      <a className='sing-card-inner'>
        <div className='sing-card-image'/>
        <div className='sing-card-bottom'>
          <span className="category"><span>Category</span></span>
          <Heading label={title} size='h5'/>          

          <div className="description">
            {description}          
          </div>          
        </div>    
      </a>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

Card.defaultProps = {
  title: 'Card Title', 
  description: 'Description goes here.',  
  orientation: 'vertical',
  onClick: undefined,
};
