import { useRef } from "react";
import { useAddTodoMutation } from "../../hooks/useTodoMutation";
import { useTodoQuery } from "../../hooks/useTodoQuery";
import TodoCard from "./TodoCard";

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: Todos, isLoading } = useTodoQuery("test00123");

  const todoList = Todos?.filter((todo) => !todo.isDone) ?? [];
  const doneList = Todos?.filter((todo) => todo.isDone) ?? [];

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div>
        <p>할일 등록하기</p>
        <input type="text" className="border" ref={inputRef} />
        <button onClick={onAdd}>Add</button>
      </div>
      <div className="flex">
        <div>
          <p>해야 할 일</p>
          <ul>
            {todoList?.map((todo) => (
              <li key={todo.id}>
                <TodoCard todo={todo} user={"test00123"} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>끝난 일</p>
          <ul>
            {doneList?.map((todo) => (
              <li key={todo.id}>
                <TodoCard todo={todo} user={"test00123"} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
