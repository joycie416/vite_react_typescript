import { Todo } from "../types/todo";
import supabase from "./supabaseClient";

export const getTodo = async (userId: string | null) => {
  const {data, error} = await supabase.from('todos').select().eq('user_id', userId);
  if (error || !userId) {
    throw new Error('Todo 가져오지 못했습니다.')
  }
  return data
}

export const addTodo = async (todo:Todo) => {
  const {error} = await supabase.from('todos').insert(todo);
  if (error) {
    throw new Error('Todo 등록 실패')
  }
}

export const editTodo = async ({id, isDone}: {id: string; isDone:boolean}) => {
  const {error} = await supabase.from('todos').update({is_done: !isDone}).eq('id', id);
  if (error) {
    throw new Error('Todo 수정 실패')
  }
}

export const deleteTodo = async (id: string) => {
  const response = await supabase.from('todos').delete().eq('id', id);
  if (response.error) {
    throw new Error('Todo 삭제 실패')
  }
}