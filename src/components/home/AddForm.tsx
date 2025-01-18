import { useRef } from "react";
import { useAddTodoMutation } from "../../hooks/useTodoMutation";

const AddForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: addTodo } = useAddTodoMutation("test00123");

  const onAdd = () => {
    if (!inputRef.current?.value.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    addTodo({
      content: inputRef.current?.value.trim(),
      isDone: false,
      userId: "test00123",
    });
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <p>할일 등록하기</p>
      <form >
        <input type="text" className="border" placeholder="할일 입력하기" ref={inputRef} />
        <button type="button" onClick={onAdd}>Add</button>
      </form>
    </div>
  );
};

export default AddForm;
