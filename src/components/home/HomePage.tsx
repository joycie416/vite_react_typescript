import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTodoMutation } from "../../hooks/useTodoMutation";

const HomePage = () => {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: addTodo } = useAddTodoMutation("1", queryClient);

  const onClick = () => {
    if (!inputRef.current?.value) {
      alert("내용을 입력해주세요.");
      return;
    }

    addTodo({
      todo: { content: inputRef.current?.value, isDone: false, userId: "1" },
    });
    inputRef.current.value = "";
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div>
        <p>할일 등록하기</p>
        <input type="text" className="border" ref={inputRef} />
        <button onClick={onClick}>버튼</button>
      </div>
      <ul>{}</ul>
    </div>
  );
};

export default HomePage;
