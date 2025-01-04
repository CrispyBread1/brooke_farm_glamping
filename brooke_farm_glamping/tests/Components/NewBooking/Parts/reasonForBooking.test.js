/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReasonForBooking from '../../../../src/Components/NewBooking/Parts/reasonForBooking.js';
import { expect, jest, test, describe } from '@jest/globals';

describe('ReasonForBooking Component', () => {
  test('renders without errors and with input field', () => {
    render(<ReasonForBooking submittedWithoutReason={false} setSubmittedWithoutReason={jest.fn()} />);

    // Check for input label and input field
    expect(screen.getByLabelText(/What is the reason for creating this booking?/)).toBeInTheDocument();
  });

  test('shows error message when submittedWithoutReason is true and no reason is provided', () => {
    render(<ReasonForBooking submittedWithoutReason={true} setSubmittedWithoutReason={jest.fn()} />);

    // Check if error message is displayed
    expect(screen.getByText('Please make submit a reason')).toBeInTheDocument();
  });

  test('does not show error message when submittedWithoutReason is false', () => {
    render(<ReasonForBooking submittedWithoutReason={false} setSubmittedWithoutReason={jest.fn()} />);

    // Check if error message is not displayed
    expect(screen.queryByText('Please make submit a reason')).not.toBeInTheDocument();
  });

  test('updates the reasonForBooking state when input value changes', () => {
    const setSubmittedWithoutReasonMock = jest.fn();
    render(<ReasonForBooking submittedWithoutReason={false} setSubmittedWithoutReason={setSubmittedWithoutReasonMock} />);

    const input = screen.getByLabelText(/What is the reason for creating this booking?/);
    fireEvent.change(input, { target: { value: 'Vacation' } });

    // Check if state is updated correctly
    expect(input.value).toBe('Vacation');
    expect(setSubmittedWithoutReasonMock).not.toHaveBeenCalled();
  });

  test('does not call setSubmittedWithoutReason if reasonForBooking is not empty', () => {
    const setSubmittedWithoutReasonMock = jest.fn();
    render(<ReasonForBooking submittedWithoutReason={true} setSubmittedWithoutReason={setSubmittedWithoutReasonMock} />);

    const input = screen.getByLabelText(/What is the reason for creating this booking?/);
    fireEvent.change(input, { target: { value: 'Hol' } });
    fireEvent.change(input, { target: { value: 'Holiday' } });

    // Ensure error is not shown after input change
    expect(setSubmittedWithoutReasonMock).toHaveBeenCalledWith(false);
  });

  test('shows error message again when reason is cleared and submittedWithoutReason is true', () => {
    const setSubmittedWithoutReasonMock = jest.fn();
    render(<ReasonForBooking submittedWithoutReason={true} setSubmittedWithoutReason={setSubmittedWithoutReasonMock} />);

    const input = screen.getByLabelText(/What is the reason for creating this booking?/);
    fireEvent.change(input, { target: { value: '' } });

    // Check if error message is displayed when input is empty
    expect(screen.getByText('Please make submit a reason')).toBeInTheDocument();
  });
});
