import { useRef } from "react";
import useAuthStore from "../../store/authStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "../../hooks/useUserMutation";

const schema = z.object({
  nickname: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "영문, 숫자만 사용할 수 있습니다.")
    .min(2, { message: "2자 이상 입력해주세요." })
    .max(15, { message: "최대 15자 입력 가능합니다." }),
});

const defaultValues = {
  nickname: "",
};

const MyPage = () => {
  const { user, editUser } = useAuthStore((state) => state);
  const { mutate: updateUser } = useUpdateUserMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  console.log("user :", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ nickname: string }>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onEditUser = (data: { nickname: string }) => {
    if (data.nickname && data.nickname.trim() !== user?.nickname) {
      const nickname = data.nickname.trim();
      updateUser({ userId: user?.id ?? "", nickname });
      editUser(nickname);
      reset({ nickname: "" });
      alert("닉네임이 수정되었습니다.");
    }
  };

  return (
    <div>
      <p>
        닉네임: <span>{user?.nickname}</span>
      </p>
      <form onSubmit={handleSubmit(onEditUser)}>
        <p>닉네임 변경하기</p>
        <input
          {...register("nickname")}
          placeholder="변경할 닉네임"
          className="border"
        />
        <button>수정</button>
        {errors.nickname && <p>{errors.nickname.message}</p>}
      </form>
    </div>
  );
};

export default MyPage;
