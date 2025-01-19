import { User } from "@supabase/supabase-js";
import { SignInData, SignUpData } from "../types/auth";
import supabase from "./supabaseClient";

export const signUp = async (userData: SignUpData): Promise<User|null> => {
  const { email, password, nickname } = userData;
  const { data: {user}, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { email, nickname } },
  });
  if (error) {
    console.log(error)
    throw new Error("회원가입에 실패하였습니다.");
  }
  return user;
};

export const signIn = async (userData: SignInData): Promise<User|null> => {
  const { data: {user}, error } = await supabase.auth.signInWithPassword(userData);
  if (error) {
    console.log(error)
    throw new Error("로그인에 실패하였습니다.");
  }
  return user;
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
    return null
  }


  return { userId: user.id, nickname: user.user_metadata.nickname as string };
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
