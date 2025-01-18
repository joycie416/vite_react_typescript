import { useTodoQuery } from "../../hooks/useTodoQuery";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const { data: Todos, isLoading } = useTodoQuery("test00123");

  const todoList = Todos?.filter((todo) => !todo.isDone) ?? [];
  const doneList = Todos?.filter((todo) => todo.isDone) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default TodoList;
