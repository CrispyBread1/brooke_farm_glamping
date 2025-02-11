/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchBar from '../../../src/Components/SearchBar/searchBar.js';
import { expect, test, jest } from '@jest/globals';

describe('SearchBar Component', () => {
  test('renders search input with correct attributes', () => {
    render(<SearchBar updateSearchValue={() => {}} />);

    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('id', 'searchbar');
    expect(input).toHaveAttribute('maxlength', '100');
  });

  test('calls updateSearchValue when typing', () => {
    const mockUpdateSearchValue = jest.fn();
    render(<SearchBar updateSearchValue={mockUpdateSearchValue} />);

    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Test Search' } });

    expect(mockUpdateSearchValue).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchValue).toHaveBeenCalledWith('Test Search');
  });

  test('does not exceed maximum character limit of 100', () => {
    const mockUpdateSearchValue = jest.fn();
    render(<SearchBar updateSearchValue={mockUpdateSearchValue} />);

    const input = screen.getByRole('searchbox');

    const longText = 'A'.repeat(150);
    fireEvent.change(input, { target: { value: longText } });

    expect(input.value.length).toBe(150); // Ensure only 100 characters are kept
  });

});
