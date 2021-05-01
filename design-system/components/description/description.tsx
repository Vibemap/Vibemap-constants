import React from 'react';

//import styles from './heading.scss';

interface Size {

}

export interface DescriptionProps {
  size?: 'normal' | 'small',
}

/**
 * Primary UI component for user interaction
 */
const Description: React.FF<Props> = ({
  childre,
  color = "#000000",
  size = 'h1',
  label = 'Heading',
  }: DescriptionProps ) => {
    return <div>
      {children}
    </div>
  }

export default Heading;