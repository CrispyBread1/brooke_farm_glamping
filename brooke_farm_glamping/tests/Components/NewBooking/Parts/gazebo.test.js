/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Gazebo from '../../../../src/Components/NewBooking/Parts/gazebo.js';
import { expect, jest, test } from '@jest/globals';

describe('Gazebo Component', () => {
  test('renders with initial unchecked state and gazebo amount of 0', () => {
    render(<Gazebo />);

    // Verify the checkbox is initially unchecked
    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    expect(checkbox).not.toBeChecked();

    // Verify the hidden input with gazeboAmount is 0
    const hiddenInput = screen.getByDisplayValue('0');
    expect(hiddenInput).toBeInTheDocument();
  });

  test('enables gazebo options when checkbox is checked', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox);

    // Verify the gazebo amount input and buttons are now visible
    const label = screen.getByText('Amount of gazebos');
    expect(label).toBeInTheDocument();

    const addButton = screen.getByText('+');
    const removeButton = screen.getByText('-');
    const input = screen.getByPlaceholderText('number');

    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('1'); // Initial value when gazebo is selected
  });

  test('increments gazebo amount when "+" button is clicked', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('number');
    expect(input).toHaveValue('2');
  });

  test('does not increment gazebo amount beyond 2', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton); // Increment to 2
    fireEvent.click(addButton); // Attempt to increment beyond 2

    const input = screen.getByPlaceholderText('number');
    expect(input).toHaveValue('2');
  });

  test('decrements gazebo amount when "-" button is clicked', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton); // Increment to 2

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    const input = screen.getByPlaceholderText('number');
    expect(input).toHaveValue('1');
  });

  test('does not decrement gazebo amount below 1', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox);

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton); // Attempt to decrement below 1

    const input = screen.getByPlaceholderText('number');
    expect(input).toHaveValue('1');
  });

  test('resets gazebo state when checkbox is unchecked', () => {
    render(<Gazebo />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like to bring my own Gazebo' });
    fireEvent.click(checkbox); // Check gazebo
    fireEvent.click(checkbox); // Uncheck gazebo

    // Verify the gazebo amount is reset to 0 and options are hidden
    const hiddenInput = screen.getByDisplayValue('0');
    expect(hiddenInput).toBeInTheDocument();

    expect(screen.queryByText('Amount of gazebos')).not.toBeInTheDocument();
  });
});
