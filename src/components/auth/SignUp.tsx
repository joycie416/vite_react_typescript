import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../api/supabase-auth-api";

const schema = z.object({
  nickname: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "영문, 숫자만 사용할 수 있습니다.")
    .min(2, { message: "2자 이상 입력해주세요." })
    .max(15, { message: "최대 15자 입력 가능합니다." }),
  email: z
    .string()
    .email({ message: "이메일 형식으로 입력해주세요" }),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^]+$/, "영문, 숫자, !@#$%^만 사용할 수 있습니다.")
    .min(8, { message: "8자 이상 입력해주세요." }),
});

const defaultValues = {
  nickname: "",
  email: "",
  password: "",
};

type SignUpForm = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp(data);
      console.log('회원가입 성공')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[300px] flex flex-col gap-4 items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col p-5 gap-4 rounded-lg bg-gray-100"
        >
          <div className="flex flex-col">
            <label>닉네임</label>
            <input
              {...register("nickname")}
              type="text"
              placeholder="닉네임"
              className="py-2 rounded-md"
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
          </div>
          <div className="flex flex-col">
            <label>이메일</label>
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              className="py-2 rounded-md"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label>비밀번호</label>
            <input
              {...register("password")}
              type="password"
              placeholder="비밀번호"
              className="py-2 rounded-md"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button>회원가입</button>
        </form>
        <p>
          계정이 이미 있으신가요?{" "}
          <span>
            <Link to={"/sign-in"}>로그인</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
