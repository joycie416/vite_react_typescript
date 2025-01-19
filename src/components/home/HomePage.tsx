import AddForm from "./AddForm";
import TodoList from "./TodoList";
import * as Sentry from "@sentry/react";

const HomePage = () => {
  const errorTestButton = () => {
    try {
      throw new Error("커스텀 에러 발생, 센트리 에러 테스트");
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <button onClick={errorTestButton}>에러 발생시키기</button>
      <AddForm />
      <TodoList />
    </div>
  );
};

export default HomePage;
