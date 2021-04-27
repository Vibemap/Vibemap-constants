import React from 'react';
import styled from 'styled-components';

// TODO: Use aliases for these paths
import * as tokens from 'vibemap-constants/design-system/build/json/variables.json'
//const tokens = style_variables['default']

const Pill = styled.div`
  border: solid 1px ${tokens.color.base.gray['400']};
  border-radius: 999rem;
  display: inline-block;
  font-family: ${tokens.font.family.sans};
  font-size: ${tokens.font.size.base}px;
  font-weight: ${tokens.font.weight.normal};
  padding: 0.4rem 1.4rem;
  white-space: nowrap;
`;

export interface ChipProps  {
  /**
   * Vibe or chip contents
   */
  color: 'black' | 'white';
  size: 'small' | 'normal' | 'large';
  text: string;
};

const Chip = ({
  text,
  color = 'white'
}: ChipProps) => {

  return (
    <Pill className='vibe'>
      {text}
    </Pill>
  );
}

export default Chip;