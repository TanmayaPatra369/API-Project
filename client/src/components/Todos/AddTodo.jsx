import useInput from '../../hooks/useInput';
import todosApi from '../../api/todosApi';
import { useError } from '../../context/ErrorContext';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

export function AddTodo() {
  let navigate = useNavigate();

  const { todos, setTodos } = useContext(TodosContext);
  const addValue = useInput('');
  const { showError } = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await todosApi.add(addValue.value);
      if (res.status === 'success') {
        const newTodos = [...todos, res.data.todo];
        setTodos(newTodos);
      } else if (res.error) {
        navigate('/login');
        showError(res.error);
      }

      var frm = document.getElementsByClassName('add-todo-form')[0]; // For reseting the form, and making the input empty after a submission
      frm.reset();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        autoFocus
        autoComplete="off"
        id="add-todo-input"
        onChange={addValue.handleChange}
        placeholder="Add a new task"
      ></input>
      <button id="add-todo-btn">+</button>
    </form>
  );
}
