/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import NightsStaying from '../../../../src/Components/NewBooking/Parts/nightsStaying.js';
import { expect, jest, test } from '@jest/globals';

describe('NightsStaying Component', () => {
    const months = [
        { month: 'January', days: 31 },
        { month: 'February', days: 28 },
        { month: 'March', days: 31 },
        { month: 'April', days: 30 },
        { month: 'May', days: 31 },
        { month: 'June', days: 30 },
        { month: 'July', days: 31 },
        { month: 'August', days: 31 },
        { month: 'September', days: 30 },
        { month: 'October', days: 31 },
        { month: 'November', days: 30 },
        { month: 'December', days: 31 },
    ];
    

  const nthNumber = (day) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder = day % 10;
    return suffixes[(day % 100 >= 11 && day % 100 <= 13) ? 0 : remainder] || suffixes[0];
  };

  test('renders with initial state', () => {
    render(<NightsStaying dateChosen={null} months={months} nthNumber={nthNumber} nights={1} setNights={jest.fn()} />);

    // Check that the heading and initial nights are rendered
    expect(screen.getByText('Amount of nights staying')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('number');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('1');
  });

  test('increments nights when "+" button is clicked', () => {
    const setNightsMock = jest.fn();
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={1} setNights={setNightsMock} />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(setNightsMock).toHaveBeenCalledWith(2);
  });

  test('does not increment nights beyond 24', () => {
    const setNightsMock = jest.fn();
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={24} setNights={setNightsMock} />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(setNightsMock).not.toHaveBeenCalled();
  });

  test('decrements nights when "-" button is clicked', () => {
    const setNightsMock = jest.fn();
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={2} setNights={setNightsMock} />);

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(setNightsMock).toHaveBeenCalledWith(1);
  });

  test('does not decrement nights below 1', () => {
    const setNightsMock = jest.fn();
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={1} setNights={setNightsMock} />);

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(setNightsMock).not.toHaveBeenCalled();
  });

  test('displays the correct date range for one night', () => {
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={1} setNights={jest.fn()} />);

    const heading = screen.getByText(/January/);
    expect(heading).toHaveTextContent('January 1st');
  });

  test('displays the correct date range for multiple nights in the same month', () => {
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={3} setNights={jest.fn()} />);

    const heading = screen.getByText(/January/);
    expect(heading).toHaveTextContent('January 1st - 4th');
  });

  test('displays the correct date range when nights span months', () => {
    render(<NightsStaying dateChosen={new Date(2025, 0, 30)} months={months} nthNumber={nthNumber} nights={3} setNights={jest.fn()} />);

    const heading = screen.getByText(/January/);
    expect(heading).toHaveTextContent('January 30th - 2nd of February');
  });

  test('displays the correct date range when month span the year', () => {
    render(<NightsStaying dateChosen={new Date(2025, 11, 30)} months={months} nthNumber={nthNumber} nights={3} setNights={jest.fn()} />);

    const heading = screen.getByText(/January/);
    expect(heading).toHaveTextContent('December 30th - 2nd of January');
  });

  test('sets datesStaying as a hidden input', () => {
    render(<NightsStaying dateChosen={new Date(2025, 0, 1)} months={months} nthNumber={nthNumber} nights={2} setNights={jest.fn()} />);

    const hiddenInput = screen.getByDisplayValue(/2025/); // Matches any date in 2025
    expect(hiddenInput).toBeInTheDocument();
  });
});
