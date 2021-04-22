import React from 'react';
import { render } from '@testing-library/react';
import { BasicChip } from './chip.composition';

describe('chip', () => {
  it('should render with the correct text', () => {
    const { getByText } = render(<BasicChip />);
    const rendered = getByText('hello from Chip');
    expect(rendered).toBeTruthy();
  });
});
