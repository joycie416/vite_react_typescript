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
    throw new Error(error.message);
  }
  return user;
};

export const signIn = async (userData: SignInData): Promise<User|null> => {
  const { data: {user}, error } = await supabase.auth.signInWithPassword(userData);
  if (error) {
    console.log(error)
    throw new Error(error.message);
  }
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }


  return { id: user.id, nickname: user.user_metadata.nickname as string };
};

export const updateUser = async ({
  id,
  nickname,
}: {
  id: string;
  nickname: string;
}) => {
  const { error: authError } = await supabase.auth.updateUser({
    data: { nickname },
  });
  const { error: tableError } = await supabase
    .from("users")
    .update({ nickname })
    .eq("user_id", id);
  if (authError || tableError) {
    throw new Error("닉네임 수정에 실패하였습니다.");
  }
};
