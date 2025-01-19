import { useTodoQuery } from "../../hooks/useTodoQuery";
import useAuthStore from "../../store/authStore";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const {user} = useAuthStore(state => state)
  const { data: Todos, isLoading } = useTodoQuery(user?.id ?? null);

  const todoList = Todos?.filter((todo) => !todo.is_done) ?? [];
  const doneList = Todos?.filter((todo) => todo.is_done) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-around">
      <div className="w-full max-w-[250px] flex flex-col">
        <p className="mx-auto mb-10">해야 할 일</p>
        <ul>
          {todoList?.map((todo) => (
            <li key={todo.id}>
              <TodoCard todo={todo} user={user?.id ?? ""} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-[250px] flex flex-col">
        <p className="mx-auto mb-10">끝난 일</p>
        <ul>
          {doneList?.map((todo) => (
            <li key={todo.id}>
              <TodoCard todo={todo} user={user?.id ?? ""} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
