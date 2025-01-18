import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddForm from "../components/home/AddForm";
import { useAddTodoMutation } from "../hooks/useTodoMutation";

// useAddTodoMutation 모의 함수로 대체
jest.mock("../hooks/useTodoMutation", () => ({
  useAddTodoMutation: jest.fn(),
}));

describe("AddForm Component", () => {
  it("should clear input after clicking the Add button", () => {
    // useAddTodoMutation의 mock 구현
    const mockAddTodo = jest.fn();
    (useAddTodoMutation as jest.Mock).mockReturnValue({
      mutate: mockAddTodo,
    });

    // 컴포넌트 렌더링
    render(<AddForm />);

    // input과 button 요소 찾기
    const inputElement = screen.getByPlaceholderText("할일 입력하기");
    const buttonElement = screen.getByText("Add");

    // 할일 입력해보기
    fireEvent.change(inputElement, { target: { value: "오늘의 할일" } });
    expect(inputElement).toHaveValue("오늘의 할일"); // 값이 제대로 들어갔는지 확인

    // 버튼 클릭
    fireEvent.click(buttonElement);

    // input이 비워졌는지 확인
    expect(inputElement).toHaveValue("");

    // addTodo 호출 확인
    expect(mockAddTodo).toHaveBeenCalledWith({
      content: "오늘의 할일",
      isDone: false,
      userId: "test00123",
    });
  });
});
