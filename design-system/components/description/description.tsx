import React from 'react';
export interface DescriptionProps {
  children?: any,
  size?: 'normal' | 'small',
}

/**
 * Primary UI component for user interaction
 */
const Description = ({
  children,
  }: DescriptionProps ) => {
    return <div>
      {children}
    </div>
  }

export default Description;