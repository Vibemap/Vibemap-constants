import React from 'react';

//import styles from './heading.scss';
interface HeadingProps {
  /**
   * What color to use
   */
  color?: string,
  /**
   * Which heading size to render
   */
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  /**
   * Button contents
   */
  label?: string
}

/**
 * Primary UI component for user interaction
 */
const Heading = ({
  color = "#000000",
  size = 'h1',
  label = 'Heading',
  }: HeadingProps ) => {

    switch (size) {
      case 'h1':
        return <h1>{label}</h1>

      case 'h2':
        return <h2>{label}</h2>

      case 'h3':
        return <h3>{label}</h3>

      case 'h4':
        return <h4>{label}</h4>

      case 'h5':
        return <h5>{label}</h5>

      default:
        return <h2>{label}</h2>
    }
  }

export default Heading;