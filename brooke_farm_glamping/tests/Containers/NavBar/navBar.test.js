/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import NavBar from '../../../src/Containers/NavBar/navBar';
import { expect, test, jest } from '@jest/globals';

beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
});
  

describe('NavBar Component', () => {
  test('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <NavBar user={null} userLoggedOut={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Home Button')).toBeInTheDocument();
    expect(screen.getByAltText('Book Button')).toBeInTheDocument();
    expect(screen.getByAltText('User Icon')).toBeInTheDocument();
  });

  test('shows login button when user is not logged in', () => {
    render(
      <BrowserRouter>
        <NavBar user={null} userLoggedOut={jest.fn()} />
      </BrowserRouter>
    );

    
    const loginImages = screen.getAllByAltText('Login Button');
    expect(loginImages.length).toBeGreaterThan(0);
    expect(screen.queryByAltText('Account Button')).not.toBeInTheDocument();
  });

  test('shows account button when user is logged in', () => {
    render(
      <BrowserRouter>
        <NavBar user={{ name: 'John Doe' }} userLoggedOut={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Account Button')).toBeInTheDocument();
    expect(screen.queryByAltText('Login Button')).not.toBeInTheDocument();
  });

  test('calls userLoggedOut when logout is clicked', () => {
    const mockUserLoggedOut = jest.fn();

    render(
      <BrowserRouter>
        <NavBar user={{ name: 'John Doe' }} userLoggedOut={mockUserLoggedOut} />
      </BrowserRouter>
    );

    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(mockUserLoggedOut).toHaveBeenCalledTimes(1);
  });
});
