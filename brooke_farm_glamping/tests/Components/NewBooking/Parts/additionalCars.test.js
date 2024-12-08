/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import AdditionalCars from '../../../../src/Components/NewBooking/Parts/additionalCars';
import React from 'react';
import { expect } from '@jest/globals';

describe('AdditionalCars Component', () => {
  
  it('should initially render with the checkbox only', () => {
    render(<AdditionalCars />);

    // Check if the checkbox is rendered
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    // Check that the label is displayed
    expect(screen.getByText(/Will there be more than one car\?/i)).toBeInTheDocument();

    // Ensure that the additional car input and buttons are not visible initially
    expect(screen.queryByLabelText(/Amount of additional Cars/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '-' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '+' })).not.toBeInTheDocument();
  });

  it('should show additional car options when checkbox is checked', () => {
    render(<AdditionalCars />);

    // Click the checkbox to show additional car options
    fireEvent.click(screen.getByRole('checkbox'));

    // Check if the amount of additional cars input and buttons are visible
    expect(screen.getByText(/Amount of additional Cars/i)).toBeInTheDocument();  // Using getByText here
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
});

  it('should increase the additional car amount when "+" button is clicked', () => {
    render(<AdditionalCars />);

    // Click the checkbox to show the additional car options
    fireEvent.click(screen.getByRole('checkbox'));

    // Click the "+" button to increase the amount
    fireEvent.click(screen.getByRole('button', { name: '+' }));

    // Check that the input value updates to 2
    expect(screen.getByRole('textbox')).toHaveValue('2');
  });

  it('should not increase the additional car amount beyond 2', () => {
    render(<AdditionalCars />);

    // Click the checkbox to show the additional car options
    fireEvent.click(screen.getByRole('checkbox'));

    // Click the "+" button twice
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));

    // Ensure the value does not exceed 2
    expect(screen.getByRole('textbox')).toHaveValue('2');
  });

  it('should decrease the additional car amount when "-" button is clicked', () => {
    render(<AdditionalCars />);

    // Click the checkbox to show the additional car options
    fireEvent.click(screen.getByRole('checkbox'));

    // Click the "+" button to increase the amount to 2
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));

    // Click the "-" button to decrease the amount to 1
    fireEvent.click(screen.getByRole('button', { name: '-' }));

    // Check that the input value updates to 1
    expect(screen.getByRole('textbox')).toHaveValue('1');
  });

  it('should not decrease the additional car amount below 1', () => {
    render(<AdditionalCars />);

    // Click the checkbox to show the additional car options
    fireEvent.click(screen.getByRole('checkbox'));

    // Click the "-" button without increasing the amount
    fireEvent.click(screen.getByRole('button', { name: '-' }));

    // Ensure the value does not go below 1
    expect(screen.getByRole('textbox')).toHaveValue('1');
  });

  it('should toggle the additional car state when checkbox is clicked', () => {
    render(<AdditionalCars />);

    // Initially, the additional car options should be hidden
    expect(screen.getByText(/Will there be more than one car\?/i)).toBeInTheDocument();

    // Click the checkbox to show additional car options
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByText(/Amount of additional Cars/i)).toBeInTheDocument();

    // Click the checkbox again to hide additional car options
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByLabelText(/Amount of additional Cars/i)).not.toBeInTheDocument();
  });
});
