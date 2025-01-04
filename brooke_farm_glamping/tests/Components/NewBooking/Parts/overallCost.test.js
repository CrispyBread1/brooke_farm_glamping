/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import OverallCost from '../../../../src/Components/NewBooking/Parts/OverallCost.js';
import { expect, jest, test, describe } from '@jest/globals';

describe('OverallCost Component', () => {
  const mockSetPricesArrayPerNightPerSpot = jest.fn();

  const campingPitchChoice = {
    name: 'Premium Pitch',
    price: 25,
  };

  test('renders with initial state', () => {
    render(
      <OverallCost
        nights={1}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={false}
        campingSpotsNeeded={1}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price for stay: £25')).toBeInTheDocument();
  });

  test('calculates cost correctly for multiple nights without firepit', () => {
    render(
      <OverallCost
        nights={3}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={false}
        campingSpotsNeeded={1}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price for stay: £75')).toBeInTheDocument();
  });

  test('calculates cost correctly for multiple nights with firepit', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={true}
        campingSpotsNeeded={1}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price for stay: £70')).toBeInTheDocument();
  });

  test('calculates cost correctly for multiple camping spots without firepit', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={false}
        campingSpotsNeeded={3}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price for stay: £150')).toBeInTheDocument();
  });

  test('calculates cost correctly for multiple camping spots with firepit', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={true}
        campingSpotsNeeded={2}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(screen.getByText('Price for stay: £140')).toBeInTheDocument();
  });

  test('sets prices array per night per spot correctly', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={true}
        campingSpotsNeeded={2}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    expect(mockSetPricesArrayPerNightPerSpot).toHaveBeenCalled();
    expect(mockSetPricesArrayPerNightPerSpot).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.anything(), // Each item in the array is a JSX element
      ])
    );
  });

  test('renders hidden input for costOfStay', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={campingPitchChoice}
        peopleAmount={1}
        firePit={false}
        campingSpotsNeeded={1}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    const hiddenInput = screen.getByDisplayValue('50'); // Cost for 2 nights without firepit
    expect(hiddenInput).toBeInTheDocument();
  });

  test('no camping pitch choice', () => {
    render(
      <OverallCost
        nights={2}
        campingPitchChoice={null}
        peopleAmount={1}
        firePit={false}
        campingSpotsNeeded={1}
        setPricesArrayPerNightPerSpot={mockSetPricesArrayPerNightPerSpot}
      />
    );

    const hiddenInput = screen.getByDisplayValue('0'); // Cost for 2 nights without firepit
    expect(hiddenInput).toBeInTheDocument();
  });
});
