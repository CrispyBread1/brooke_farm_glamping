/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import CampingOptions from '../../../../src/Components/NewBooking/Parts/campingOptions.js';
import { retrieveCampingFacilities } from '../../../../src/Scripts/databaseControls/campingFacilitiesControls';

// Mock the module and its function correctly
jest.mock('../../../../src/Scripts/databaseControls/campingFacilitiesControls', () => ({
  retrieveCampingFacilities: jest.fn(),
}));

describe('CampingOptions Component', () => {
  let setCampingPitchChoice;
  let setSubmittedWithoutCampsite;

  const mockFacilities = [
    {
      data: () => ({ name: 'Campsite A', price: 10, state: true, blockedDays: [] }),
    },
    {
      data: () => ({ name: 'Campsite B', price: 15, state: true, blockedDays: [] }),
    },
    {
      data: () => ({ name: 'Campsite C', price: 12, state: true, blockedDays: [] }),
    },
  ];

  beforeEach(() => {
    setCampingPitchChoice = jest.fn();
    setSubmittedWithoutCampsite = jest.fn();

    // Mock the resolved value of retrieveCampingFacilities to return the mockFacilities
    retrieveCampingFacilities.mockResolvedValue(mockFacilities);
  });

  test('renders with initial values', async () => {
    await act(async () => {
        render(
        <CampingOptions
            dateChosen={new Date()}
            nights={1}
            campingSpotsNeeded={1}
            setCampingPitchChoice={setCampingPitchChoice}
            submittedWithoutCampsite={false}
            setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
        )
    });

    // Use waitFor to wait for the async updates and DOM re-render
    await waitFor(() => screen.getByText('Select camping option:'));

    // Verify that the camping options have been rendered
    expect(screen.getByRole('radio', { name: /Campsite A/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Campsite B/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Campsite C/i })).toBeInTheDocument();
  });


  test('displays error message if no camping choice is selected', async () => {
    await act(async () => {
        render(
        <CampingOptions
            dateChosen={new Date()}
            nights={1}
            campingSpotsNeeded={1}
            setCampingPitchChoice={setCampingPitchChoice}
            submittedWithoutCampsite={true}
            setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
        )
    });

    // Verify error message is displayed
    expect(screen.getByText('Please make a camping pitch choice')).toBeInTheDocument();
  });

  test('selecting a camping option calls setCampingPitchChoice', async () => {
    await act(async () => {
        render(
        <CampingOptions
            dateChosen={new Date()}
            nights={1}
            campingSpotsNeeded={1}
            setCampingPitchChoice={setCampingPitchChoice}
            submittedWithoutCampsite={false}
            setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
        )
    });

    // Wait for camping options to be populated
    await waitFor(() => screen.getByText('Select camping option:'));

    // Select a camping option
    const campsiteA = screen.getByLabelText('Campsite A');
    fireEvent.click(campsiteA);

    // Verify that setCampingPitchChoice is called with the correct value
    expect(setCampingPitchChoice).toHaveBeenCalledWith(mockFacilities[0].data());
  });

  test('renders multiple camping spots message if campingSpotsNeeded > 1', async () => {
    await act(async () => {
        render(
        <CampingOptions
            dateChosen={new Date()}
            nights={1}
            campingSpotsNeeded={2}
            setCampingPitchChoice={setCampingPitchChoice}
            submittedWithoutCampsite={false}
            setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
        );
    });

    // Wait for camping options to be populated
    await waitFor(() => screen.getAllByText('Select camping option:'));

    // Verify that the camping options display the required spots message
    const elements = screen.getAllByText(/x 2 Required/i);
    elements.forEach((element) => {
        expect(element).toBeInTheDocument();
    });
  });

  test('does not call setCampingPitchChoice when no option is selected', async () => {
    await act(async () => {
        render(
        <CampingOptions
            dateChosen={new Date()}
            nights={1}
            campingSpotsNeeded={1}
            setCampingPitchChoice={setCampingPitchChoice}
            submittedWithoutCampsite={false}
            setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
        );
    });

    // Wait for camping options to be populated
    await waitFor(() => screen.getByText('Select camping option:'));

    // Verify that setCampingPitchChoice is not called initially
    expect(setCampingPitchChoice).not.toHaveBeenCalled();
  });

  test('fetchCampingFacilities updates campingFacilities state', async () => {
    await act(async () => {
      render(
        <CampingOptions
          dateChosen={new Date()}
          nights={1}
          campingSpotsNeeded={1}
          setCampingPitchChoice={setCampingPitchChoice}
          submittedWithoutCampsite={false}
          setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
      );
    });
  
    // Wait for the mocked camping facilities to be processed
    await waitFor(() => expect(retrieveCampingFacilities).toHaveBeenCalled());
  
    // Verify that the camping options based on facilities are rendered
    expect(screen.getByText(/Campsite A - £10/i)).toBeInTheDocument();
    expect(screen.getByText(/Campsite B - £15/i)).toBeInTheDocument();
    expect(screen.getByText(/Campsite C - £12/i)).toBeInTheDocument();
  });

  test('createCampingOptions sets campingChoice correctly', async () => {
    await act(async () => {
      render(
        <CampingOptions
          dateChosen={new Date()}
          nights={1}
          campingSpotsNeeded={2}
          setCampingPitchChoice={setCampingPitchChoice}
          submittedWithoutCampsite={false}
          setSubmittedWithoutCampsite={setSubmittedWithoutCampsite}
        />
      );
    });
  
    // Wait for the camping options to be created
    await waitFor(() => screen.getByText(/Campsite A - £10 x 2 Required/i));
  
    // Verify that the options are rendered correctly
    expect(screen.getByText(/Campsite A - £10 x 2 Required/i)).toBeInTheDocument();
    expect(screen.getByText(/Campsite B - £15 x 2 Required/i)).toBeInTheDocument();
    expect(screen.getByText(/Campsite C - £12 x 2 Required/i)).toBeInTheDocument();
  });

  test('returns true when facility is null', () => {
    const instance = new CampingOptions({}); // Create an instance with minimal props
    const result = instance.checkBlockedDays(null);
    expect(result).toBe(true);
  });
  
  
});
