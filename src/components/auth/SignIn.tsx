import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../api/supabase-auth-api";
import useAuthStore from "../../store/authStore";

const schema = z.object({
  email: z.string().email({ message: "이메일 형식으로 입력해주세요" }),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^]+$/, "영문, 숫자, !@#$%^만 사용할 수 있습니다.")
    .min(8, { message: "8자 이상 입력해주세요." }),
});

const defaultValues = {
  email: "",
  password: "",
};

type SignInForm = z.infer<typeof schema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn: StoreSignIn } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      const user = await signIn(data);
      console.log("로그인 성공");
      StoreSignIn({
        userId: user?.id ?? "",
        nickname: user?.user_metadata.nickname ?? "",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
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
          <button>로그인</button>
        </form>
        <p>
          아직 계정이 없으신가요?{" "}
          <span>
            <Link to={"/sign-up"}>회원가입</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
