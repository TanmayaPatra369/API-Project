import { AddTodo } from './Todos/AddTodo';
import { TodosList } from './Todos/TodosList';
import ErrorMessage from './ErrorMessage';
import { TodoHeader } from './Header/TodoHeader';
import Logout from './Auth/Logout';

const Todos = () => {
  return (
    <>
      <Logout />
      <div id="todo-container">
        <TodoHeader />
        <hr className="header-divider" />
        <ErrorMessage />
        <AddTodo />
        <TodosList />
      </div>
    </>
  );
};

export default Todos;
