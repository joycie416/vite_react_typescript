import { render, screen, fireEvent } from "@testing-library/react";
import AddForm from "../components/home/AddForm";
import { useAddTodoMutation } from "../hooks/useTodoMutation";

// Mocking alert function
const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});


// Mock useAddTodoMutation
jest.mock("../hooks/useTodoMutation", () => ({
  useAddTodoMutation: jest.fn(),
}));

describe("AddForm Component", () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });
  // useAddTodoMutation의 mock 구현
  const mockAddTodo = jest.fn();
  (useAddTodoMutation as jest.Mock).mockReturnValue({
    mutate: mockAddTodo,
  });

  it("should display an alert when input is empty", () => {
    render(<AddForm />);

    // Find the Add button
    const addButton = screen.getByText("Add");

    // Click Add button without entering anything in the input
    fireEvent.click(addButton);

    // Check if alert is called with the correct message
    expect(mockAlert).toHaveBeenCalledWith("내용을 입력해주세요.");
  });

  it("should display an alert when input only contains spaces", () => {
    render(<AddForm />);

    // Find the input and Add button
    const input = screen.getByPlaceholderText("할일 입력하기");
    const addButton = screen.getByText("Add");

    // Enter spaces in the input
    fireEvent.change(input, { target: { value: "    " } });

    // Click Add button
    fireEvent.click(addButton);

    // Check if alert is called with the correct message
    expect(mockAlert).toHaveBeenCalledWith("내용을 입력해주세요.");
  });

  it("should not display an alert when valid input is provided", () => {
    render(<AddForm />);

    // Find the input and Add button
    const input = screen.getByPlaceholderText("할일 입력하기");
    const addButton = screen.getByText("Add");

    // Enter valid input in the input field
    fireEvent.change(input, { target: { value: "Valid Task" } });

    // Click Add button
    fireEvent.click(addButton);

    // Check that alert was not called
    expect(mockAlert).not.toHaveBeenCalled();
  });
});