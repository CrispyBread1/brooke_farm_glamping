/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Dogs from "../../../../src/Components/NewBooking/Parts/dogs";
import { expect, test } from "@jest/globals";

describe("Dogs Component", () => {
  test("renders checkbox for bringing a dog", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false); // Initial state
  });

  test("shows dog controls when checkbox is checked", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    expect(screen.getByText("Amount of dogs")).toBeInTheDocument();
    const input = screen.getByRole("textbox", { id: /dogAmount/i });
    expect(input.value).toBe("1"); // Initial dogAmount when enabled
  });

  test("hides dog controls when checkbox is unchecked", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox); // Check
    fireEvent.click(checkbox); // Uncheck

    expect(checkbox.checked).toBe(false);
    expect(screen.queryByText("Amount of dogs")).not.toBeInTheDocument();
  });

  test("increments dog amount when '+' button is clicked", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const input = screen.getByRole("textbox", { id: /dogAmount/i });
    expect(input.value).toBe("2");
  });

  test("decrements dog amount when '-' button is clicked", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton); // Increment to 2
    fireEvent.click(addButton); // Increment to 3

    const removeButton = screen.getByText("-");
    fireEvent.click(removeButton); // Decrement to 2

    const input = screen.getByRole("textbox", { id: /dogAmount/i });
    expect(input.value).toBe("2");
  });

  test("does not decrement below 1 dog", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox);

    const removeButton = screen.getByText("-");
    fireEvent.click(removeButton); // Attempt to decrement below 1

    const input = screen.getByRole("textbox", { id: /dogAmount/i });
    expect(input.value).toBe("1"); // Should remain at 1
  });

  test("input field is read-only", () => {
    render(<Dogs />);

    const checkbox = screen.getByRole("checkbox", { name: "I would like to bring my Dog" });
    fireEvent.click(checkbox);

    const input = screen.getByRole("textbox", { id: /dogAmount/i });
    expect(input).toHaveAttribute("readOnly");
  });
});
