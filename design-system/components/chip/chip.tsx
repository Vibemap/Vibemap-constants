import React from 'react';
import styled from 'styled-components';

const Pill = styled.button`
  cursor: pointer;
  background: re;
  font-size: 30px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`

export interface ChipProps  {
  /**
   * Vibe or chip contents
   */
   text: string;
};

const Chip = ({
  text
}: ChipProps) => {

  return (
    <Pill className='vibe'>
      {text}
    </Pill>
  );
}

export default Chip;