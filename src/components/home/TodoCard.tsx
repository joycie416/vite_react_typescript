import { useDeleteTodoMutation, useEditTodoMutation } from "../../hooks/useTodoMutation"
import { Todo } from "../../types/todo"

const TodoCard = ({user, todo}: {user:string, todo: Todo}) => {

  const {mutate:editTodo} = useEditTodoMutation(user)
  const {mutate:deleteTodo} = useDeleteTodoMutation(user)
  
  const onEdit = () => {
    editTodo({id:todo.id, isDone:todo.isDone})
  }

  const onDelete = () => {
    deleteTodo({id: todo.id})
  }

  return (
    <div>
      <p>{todo.content}</p>
      <div className="flex justify-end">
        <button onClick={onEdit} >{todo.isDone? '취소': '완료'}</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  )
}

export default TodoCard