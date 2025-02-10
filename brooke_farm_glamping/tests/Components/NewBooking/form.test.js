/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import BookingForm from '../../../src/Components/NewBooking/form';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from '@jest/globals';

const mockUser = {
  id: '123',
  fullName: 'John Doe',
  admin: false,
};

const mockDateObject = new Date();
const mockMonths = ['January', 'February', 'March'];
const mockNthNumber = (num) => `${num}th`;

describe('BookingForm Component', () => {
  test('renders booking form with required elements', () => {
    render(
      <MemoryRouter>
        <BookingForm dateObject={mockDateObject} months={mockMonths} nthNumber={mockNthNumber} user={mockUser} />
      </MemoryRouter>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('submitting form without required fields shows validation messages', () => {
    render(
      <MemoryRouter>
        <BookingForm dateObject={mockDateObject} months={mockMonths} nthNumber={mockNthNumber} user={mockUser} />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(screen.getByText('Please make a camping pitch choice')).toBeInTheDocument();
  });

  test('allows selecting additional options (fire pit, gazebo, etc.)', () => {
    render(
      <MemoryRouter>
        <BookingForm dateObject={mockDateObject} months={mockMonths} nthNumber={mockNthNumber} user={mockUser} />
      </MemoryRouter>
    );

    const firePitCheckbox = screen.getByRole('checkbox', { name: 'I would like a firepit' });
    fireEvent.click(firePitCheckbox);

    expect(firePitCheckbox).toBeChecked();
  });
});
