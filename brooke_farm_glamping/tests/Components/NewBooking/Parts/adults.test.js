/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Adults from '../../../../src/Components/NewBooking/Parts/adults.js';
import {expect, jest, test} from '@jest/globals';

describe('Adults Component', () => {
  let setPeopleAmount;
  let setCampingSpotsNeeded;

  beforeEach(() => {
    // Mock the setter functions
    setPeopleAmount = jest.fn();
    setCampingSpotsNeeded = jest.fn();
  });

  test('renders with initial values', () => {
    render(
      <Adults
        peopleAmount={1}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    // Verify initial state of the component
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1'); // Initial value of peopleAmount
    expect(screen.getByText('Amount of adults staying')).toBeInTheDocument();
  });

  test('increments peopleAmount when add button is clicked', () => {
    render(
      <Adults
        peopleAmount={1}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(setPeopleAmount).toHaveBeenCalledWith(2);
    expect(setCampingSpotsNeeded).not.toHaveBeenCalled(); // No need to update spots if peopleAmount < 6
  });

  test('decrements peopleAmount when remove button is clicked', () => {
    render(
      <Adults
        peopleAmount={2}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(setPeopleAmount).toHaveBeenCalledWith(1);
    expect(setCampingSpotsNeeded).not.toHaveBeenCalled(); // No need to update spots if peopleAmount > 1
  });

  test('updates campingSpotsNeeded correctly when adding guests', () => {
    render(
      <Adults
        peopleAmount={6}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(setPeopleAmount).toHaveBeenCalledWith(7);
    expect(setCampingSpotsNeeded).toHaveBeenCalledWith(2); // Increment camping spots since peopleAmount % 6 === 0
  });

  test('updates campingSpotsNeeded correctly when removing guests', () => {
    render(
      <Adults
        peopleAmount={7}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={2}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(setPeopleAmount).toHaveBeenCalledWith(6);
    expect(setCampingSpotsNeeded).toHaveBeenCalledWith(1); // Decrement camping spots since (peopleAmount - 1) % 6 === 0
  });

  test('does not decrement below 1 person', () => {
    render(
      <Adults
        peopleAmount={1}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    // Ensure functions are not called since peopleAmount is already 1
    expect(setPeopleAmount).not.toHaveBeenCalled();
    expect(setCampingSpotsNeeded).not.toHaveBeenCalled();
  });

  test('input field is read-only', () => {
    render(
      <Adults
        peopleAmount={5}
        setPeopleAmount={setPeopleAmount}
        campingSpotsNeeded={1}
        setCampingSpotsNeeded={setCampingSpotsNeeded}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly'); // Check readOnly attribute
  });
});
