/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Children from '../../../../src/Components/NewBooking/Parts/children.js';
import { expect, test } from '@jest/globals';

describe('Children Component', () => {
  test('renders with initial values', () => {
    render(<Children />);

    // Verify initial state of the component
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('0'); // Initial value of childrenAmount
    expect(screen.getByText('Amount of children staying')).toBeInTheDocument();
  });

  test('increments childrenAmount when add button is clicked', () => {
    render(<Children />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1'); // Incremented value
  });

  test('decrements childrenAmount when remove button is clicked', () => {
    render(<Children />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton); // Increment first to avoid negative values
    fireEvent.click(addButton); // Increment again to 2

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton); // Decrement once

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1'); // Decremented value
  });

  test('does not decrement below 0', () => {
    render(<Children />);

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('0'); // Value remains 0
  });

  test('input field is read-only', () => {
    render(<Children />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly'); // Check readOnly attribute
  });
});
