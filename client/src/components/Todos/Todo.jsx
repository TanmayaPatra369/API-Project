import { modalOptions } from '../../utils/constants';
import { MdDelete } from 'react-icons/md';

export function Todo({ todo, deleteTodo, checkTodo, openModal }) {
  const check = todo.isCompleted ? true : false;

  const todoClassName = `todo${todo.isCompleted ? ' completed' : ''}`;

  const todoBgColor = modalOptions.find(
    (opt) => opt.value === todo.priority
  ).color;

  const todoPriorityStyles = {
    backgroundColor: todoBgColor,
  };

  return (
    <>
      <div className={todoClassName}>
        <input
          className="todo-checkbox"
          type="checkbox"
          name="checkbox"
          onChange={() => checkTodo(todo._id, todo.isCompleted)}
          checked={check}
        />

        <p className="todo-name" onClick={openModal}>
          {todo.name}
        </p>

        {todo.priority !== 'None' ? (
          <p className="todo-priority" style={todoPriorityStyles}>
            {todo.priority}
          </p>
        ) : (
          <p className="todo-priority" />
        )}

        <button
          className="todo-delete-btn"
          type="button"
          icon="fa-solid fa-trash"
          onClick={() => deleteTodo(todo._id)}
        >
          <MdDelete className="delete-icon" />
        </button>
      </div>
    </>
  );
}
