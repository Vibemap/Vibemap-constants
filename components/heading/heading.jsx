import React from 'react';

import PropTypes from 'prop-types';
import styles from './heading.scss';

/**
 * Primary UI component for user interaction
 */
export const Heading = ({ 
  color,
  size,
  label,
  ...props }) => {

    switch (size) {
      case 'h1':
        return <h1>{label}</h1>
    
      case 'h2':
        return <h2>{label}</h2>

      default:
        return <h2>{label}</h2>
    }
  }

Heading.propTypes = {
  /**
   * What color to use
   */
  color: PropTypes.string,
  /**
   * Which heading size to render
   */
  size: PropTypes.oneOf(['h1', 'h2', 'h3']),
  /**
   * Button contents
   */
  label: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Heading.defaultProps = {
  color: '#000000',  
  size: 'h1',
  label: 'Heading',
  onClick: undefined,
};
