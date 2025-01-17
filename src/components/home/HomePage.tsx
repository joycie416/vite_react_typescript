import { useRef } from "react";
import { useAddTodoMutation } from "../../hooks/useTodoMutation";
import { useTodoQuery } from "../../hooks/useTodoQuery";
import TodoCard from "./TodoCard";

const HomePage = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const {data: Todos, isLoading} = useTodoQuery('1');

  const { mutate: addTodo } = useAddTodoMutation("1");

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
      <ul>{Todos?.map(todo => (<li key={todo.id}>
        <TodoCard todo={todo} user={'1'}/>
      </li>))}</ul>
    </div>
  );
};

export default HomePage;
