/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import PriceGuide from '../../../../src/Components/NewBooking/Parts/priceGuide.js';
import { expect, test, describe } from '@jest/globals';

describe('PriceGuide Component', () => {
  const campingPitchChoice = {
    name: 'Premium Pitch',
    price: 25,
  };

  const pricesArrayPerNightPerSpot = [
    <li key="1">Premium Pitch x 2 Nights = £50</li>,
    <li key="2">£10 per night, per pitch</li>,
  ];

  test('renders price guide with camping spots needed', () => {
    render(
      <PriceGuide
        campingPitchChoice={campingPitchChoice}
        campingSpotsNeeded={3}
        pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price guide:')).toBeInTheDocument();
    expect(screen.getByText('3 Camping spots are needed for your party size')).toBeInTheDocument();
    expect(screen.getByText('Premium Pitch x 2 Nights = £50')).toBeInTheDocument();
  });

  test('renders price guide without camping spots needed when only one spot', () => {
    render(
      <PriceGuide
        campingPitchChoice={campingPitchChoice}
        campingSpotsNeeded={1}
        pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price guide:')).toBeInTheDocument();
    expect(screen.queryByText('Camping spots are needed for your party size')).not.toBeInTheDocument();
    expect(screen.getByText('Premium Pitch x 2 Nights = £50')).toBeInTheDocument();
  });

  test('renders price guide correctly when campingPitchChoice is undefined', () => {
    render(
      <PriceGuide
        campingPitchChoice={undefined}
        campingSpotsNeeded={1}
        pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}
      />
    );

    // Price guide should not be rendered when campingPitchChoice is undefined
    expect(screen.queryByText('Price guide:')).not.toBeInTheDocument();
  });

  test('renders correct price list items', () => {
    render(
      <PriceGuide
        campingPitchChoice={campingPitchChoice}
        campingSpotsNeeded={2}
        pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}
      />
    );

    // Check if the price items are being rendered correctly
    expect(screen.getByText('Premium Pitch x 2 Nights = £50')).toBeInTheDocument();
    expect(screen.getByText('£10 per night, per pitch')).toBeInTheDocument();
  });

  test('renders price guide with multiple camping spots needed', () => {
    render(
      <PriceGuide
        campingPitchChoice={campingPitchChoice}
        campingSpotsNeeded={5}
        pricesArrayPerNightPerSpot={pricesArrayPerNightPerSpot}
      />
    );

    // Check if the correct message about camping spots is displayed
    expect(screen.getByText('5 Camping spots are needed for your party size')).toBeInTheDocument();
  });
});
