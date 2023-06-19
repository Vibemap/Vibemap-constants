import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import chroma from 'chroma-js'

import styled from 'styled-components';
import { withTheme, ThemeContext } from 'styled-components';

// TODO: Use aliases for these paths
import tokens from 'vibemap-constants/design-system/build/json/variables.json'
//const tokens = style_variables['default']

const Chip = ({
  text,
  backgroundColor,
  ...props
}) => {

  const themeContext = useContext(ThemeContext);

  // Automatic font color based on backgrond
  const backgroundLum = chroma(backgroundColor).luminance();
  const color = backgroundLum > 0.5
    ? tokens.color.base.black
    : tokens.color.base.white

  const Pill = styled.div`
    background: ${backgroundColor};
    border: solid 1px ${tokens.color.base.gray['400']};
    border-radius: 999rem;
    color: ${color};
    display: inline-block;
    font-family: ${tokens.font.family.sans};
    font-size: ${tokens.font.size.base}px;
    font-weight: ${tokens.font.weight.normal};
    padding: 0.4rem 1.4rem;
    white-space: nowrap;
  `;

  return (
    <Pill className='vibe'>
      {text}
    </Pill>
  );
}

export interface ChipProps {
  backgroundColor: string,
  size: 'small' | 'normal' | 'large',
  text: string
}

Chip.defaultProps = {
  backgroundColor: 'white'
}

//export const ChipProps = Chip.propTypes
export default Chip;