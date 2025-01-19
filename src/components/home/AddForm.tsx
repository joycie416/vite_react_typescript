import { useRef } from "react";
import { useAddTodoMutation } from "../../hooks/useTodoMutation";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const { user } = useAuthStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate: addTodo } = useAddTodoMutation(user?.id ?? null);

  const onAdd = () => {
    if (!user?.id) {
      const toSignIn = confirm(
        "로그인 후 등록 가능합니다. 로그인하시겠습니까?"
      );
      if (toSignIn) {
        navigate("/sign-in");
        return;
      }
      return;
    }

    if (!inputRef.current?.value.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    addTodo({
      content: inputRef.current?.value.trim(),
      userId: user?.id ?? "",
    });
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <p>할일 등록하기</p>
      <form>
        <input
          type="text"
          className="border"
          placeholder="할일 입력하기"
          ref={inputRef}
        />
        <button type="button" onClick={onAdd}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
