import React from 'react';
import { render } from '@testing-library/react';
import { BasicCard } from './card.composition';

describe('card', () => {
  it('should render with the correct text', () => {
    const { getByText } = render(<BasicCard />);
    const rendered = getByText('hello from Card');
    expect(rendered).toBeTruthy();
  });
});
