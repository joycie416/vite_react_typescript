import { createClient } from "@supabase/supabase-js";
import { SignInData, SignUpData } from "../types/auth";

const supabaseUrl:string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey:string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const signUp = async (userData: SignUpData) => {
  const { email, password, nickname } = userData;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { email, nickname } },
  });
  if (error) {
    console.log(error)
    throw new Error("회원가입에 실패하였습니다.");
  }
};

export const signIn = async (userData: SignInData) => {
  const { error } = await supabase.auth.signInWithPassword(userData);
  if (error) {
    console.log(error)
    throw new Error("로그인에 실패하였습니다.");
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("로그아웃에 실패하였습니다.");
  }
};

export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("사용자 정보를 가져오지 못했습니다.");
  }

  return { userId: user.id, nickname: user.user_metadata.nickname };
};

export const updateUser = async ({
  userId,
  nickname,
}: {
  userId: string;
  nickname: string;
}) => {
  const { error: authError } = await supabase.auth.updateUser({
    data: { nickname },
  });
  const { error: tableError } = await supabase
    .from("users")
    .update({ nickname })
    .eq("user_id", userId);
  if (authError || tableError) {
    throw new Error("닉네임 수정에 실패하였습니다.");
  }
};
