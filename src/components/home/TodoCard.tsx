import { Tables } from "../../../database.types"
import { useDeleteTodoMutation, useEditTodoMutation } from "../../hooks/useTodoMutation"
// import { Todo } from "../../types/todo"
type Todo = Tables<'todos'>

const TodoCard = ({user, todo}: {user:string, todo: Todo}) => {

  const {mutate:editTodo} = useEditTodoMutation(user)
  const {mutate:deleteTodo} = useDeleteTodoMutation(user)
  
  const onEdit = () => {
    editTodo({id:todo.id, isDone:todo.is_done})
  }

  const onDelete = () => {
    deleteTodo({id: todo.id})
  }

  return (
    <div>
      <p>{todo.content}</p>
      <div className="flex justify-end">
        <button onClick={onEdit} >{todo.is_done? '취소': '완료'}</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  )
}

export default TodoCard