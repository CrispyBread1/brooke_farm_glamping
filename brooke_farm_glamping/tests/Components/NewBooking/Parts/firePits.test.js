/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FirePits from '../../../../src/Components/NewBooking/Parts/firePits.js';
import { expect, jest, test } from '@jest/globals';

describe('FirePits Component', () => {
  let setFirePit;

  beforeEach(() => {
    // Mock the setter function
    setFirePit = jest.fn();
  });

  test('renders with initial unchecked state', () => {
    render(<FirePits firePit={false} setFirePit={setFirePit} />);

    // Verify the checkbox is initially unchecked
    const checkbox = screen.getByRole('checkbox', { name: 'I would like a firepit' });
    expect(checkbox).not.toBeChecked();
  });

  test('calls setFirePit with true when checkbox is checked', () => {
    render(<FirePits firePit={false} setFirePit={setFirePit} />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like a firepit' });
    fireEvent.click(checkbox);

    expect(setFirePit).toHaveBeenCalledWith(true);
  });

  test('calls setFirePit with false when checkbox is unchecked', () => {
    render(<FirePits firePit={true} setFirePit={setFirePit} />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like a firepit' });
    fireEvent.click(checkbox);

    expect(setFirePit).toHaveBeenCalledWith(false);
  });

  

  test('checkbox is unchecked when firePit prop is false', () => {
    render(<FirePits firePit={false} setFirePit={setFirePit} />);

    const checkbox = screen.getByRole('checkbox', { name: 'I would like a firepit' });
    expect(checkbox).not.toBeChecked();
  });
});
