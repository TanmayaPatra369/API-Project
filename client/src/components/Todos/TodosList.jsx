import './Todos.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';

import { Todo } from './Todo';
import todosApi from '../../api/todosApi';
import { TodoModal } from './TodoModal';
import sortTodos from '../../utils/sortTodos';
import { useError } from '../../context/ErrorContext';
import { TodosContext } from '../../context/TodosContext';

export function TodosList() {
  let navigate = useNavigate();
  const { todos, setTodos } = useContext(TodosContext);
  const [modalTodoId, setModalTodoId] = useState(null);
  const { showError } = useError();
  let isAnyCompleted = false;

  useEffect(() => {
    const fetchData = async () => {
      const response = await todosApi.fetch();
      if (response.error) {
        navigate('/login');
        showError(response.error);
      } else {
        setTodos(response.todos);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTodo = async (id) => {
    if (!id) {
      return;
    }
    const response = await todosApi.delete(id);
    if (response.error) {
      navigate('/login');
      showError(response.error);
    } else {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  const handleEditTodo = async (id, name, description, priority) => {
    const response = await todosApi.edit(id, name, description, priority);

    if (response.error) {
      navigate('/login');
      showError(response.error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo._id === id
            ? {
                ...todo,
                name: name,
                description: description,
                priority: priority,
              }
            : todo
        )
      );
    }
  };

  const handleCheckTodo = async (id, isCompleted) => {
    const response = await todosApi.check(id, isCompleted);

    if (response.error) {
      navigate('/login');
      showError(response.error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    }
  };

  const findTodoById = (id) => todos.find((todo) => todo._id === id) || null;

  const SeparationLine = () => {
    return <hr className="todos-divider" key={'line-01'} />;
  };

  const sortedTodos = sortTodos(todos);

  return (
    <div className="todo-list">
      {sortedTodos.map((todo) => {
        const shouldShowSeparator = todo.isCompleted && !isAnyCompleted;

        // Actualizar isAnyCompleted para futuras iteraciones
        if (shouldShowSeparator) {
          isAnyCompleted = true;
        }

        return (
          <React.Fragment key={todo._id}>
            {shouldShowSeparator && <SeparationLine />}
            <Todo
              key={todo._id}
              todo={todo}
              deleteTodo={handleDeleteTodo}
              checkTodo={handleCheckTodo}
              openModal={() => setModalTodoId(todo._id)}
            />
          </React.Fragment>
        );
      })}
      <TodoModal
        isOpen={modalTodoId}
        onClose={() => setModalTodoId(undefined)}
        editTodo={handleEditTodo}
        todo={findTodoById(modalTodoId)}
      />
    </div>
  );
}
