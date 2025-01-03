/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DateChosen from '../../../../src/Components/NewBooking/Parts/dateChosen.js';
import { expect, jest, test } from '@jest/globals';

describe('DateChosen Component', () => {
  let setDateChosen;
  let setSubmittedWithoutDates;

  beforeEach(() => {
    setDateChosen = jest.fn();
    setSubmittedWithoutDates = jest.fn();
  });

  test('renders with initial values when no date is chosen', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    // Check that inputs and button are rendered
    expect(screen.getByPlaceholderText('Day')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Month')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();
    expect(screen.getByText('Set Date')).toBeInTheDocument();
  });

  test('displays an error when submittedWithoutDates is true', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={true}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    expect(screen.getByText('Please select a date')).toBeInTheDocument();
  });

  test('updates day input correctly', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const dayInput = screen.getByPlaceholderText('Day');
    fireEvent.change(dayInput, { target: { value: '15' } });

    expect(dayInput.value).toBe('15');
  });

  test('updates month input correctly', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const monthInput = screen.getByPlaceholderText('Month');
    fireEvent.change(monthInput, { target: { value: '6' } });

    expect(monthInput.value).toBe('6');
  });

  test('updates year input correctly', () => {
    const mockDate = new Date();
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const yearInput = screen.getByPlaceholderText('Year');
    fireEvent.change(yearInput, { target: { value: String(mockDate.getFullYear() + 1) } });

    expect(yearInput.value).toBe(String(mockDate.getFullYear() + 1));
  });

  test('does not allow day input to be above 31', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const dayInput = screen.getByPlaceholderText('Day');
    fireEvent.change(dayInput, { target: { value: '32' } });

    expect(dayInput.value).toBe('3'); // Invalid input should not be set
  });

  test('does not allow day input value to be above 2 characters', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const dayInput = screen.getByPlaceholderText('Day');
    fireEvent.change(dayInput, { target: { value: '100' } });

    expect(dayInput.value).toBe('3'); // Invalid input should not be set
  });

  test('does not allow month input to be above 12', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const monthInput = screen.getByPlaceholderText('Month');
    fireEvent.change(monthInput, { target: { value: '13' } });

    expect(monthInput.value).toBe('0'); // Invalid input should not be set
  });

  test('does not allow month input value to be above 2 characters', () => {
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const monthInput = screen.getByPlaceholderText('Month');
    fireEvent.change(monthInput, { target: { value: '100' } });

    expect(monthInput.value).toBe('0');
  });

  test('does not allow year input to be below current year', () => {
    const mockDate = new Date();
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const yearInput = screen.getByPlaceholderText('Year');
    fireEvent.change(yearInput, { target: { value: '2020' }});

    expect(yearInput.value).toBe(String(mockDate.getFullYear()));
  });

  test('does not allow year input value to be below 4 characters', () => {
    const mockDate = new Date();
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={false}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const yearInput = screen.getByPlaceholderText('Year');
    fireEvent.change(yearInput, { target: { value: '100' } });

    expect(yearInput.value).toBe(String(mockDate.getFullYear()));
  });

  test('sets date and clears error when Set Date button is clicked', () => {
    const mockDate = new Date();
    render(
      <DateChosen
        dateChosen={null}
        setDateChosen={setDateChosen}
        submittedWithoutDates={true}
        setSubmittedWithoutDates={setSubmittedWithoutDates}
      />
    );

    const dayInput = screen.getByPlaceholderText('Day');
    const monthInput = screen.getByPlaceholderText('Month');
    const yearInput = screen.getByPlaceholderText('Year');
    const setDateButton = screen.getByText('Set Date');

    fireEvent.change(dayInput, { target: { value: '15' } });
    fireEvent.change(monthInput, { target: { value: '6' } });
    fireEvent.change(yearInput, { target: { value: String(mockDate.getFullYear() + 1) } });
    fireEvent.click(setDateButton);

    expect(setDateChosen).toHaveBeenCalledWith(new Date(mockDate.getFullYear() + 1, 6, 15));
    expect(setSubmittedWithoutDates).toHaveBeenCalledWith(false);
  });
});
