import AddForm from "./AddForm";
import TodoList from "./TodoList";

const HomePage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <AddForm />
      <TodoList />
    </div>
  );
};

export default HomePage;
