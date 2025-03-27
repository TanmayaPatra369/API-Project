import ReactDOM from 'react-dom';
import Select from 'react-select';
import { useState } from 'react';

import useInput from '../../hooks/useInput';
import { modalOptions } from '../../utils/constants';

export const TodoModal = ({ isOpen, onClose, editTodo, todo }) => {
  if (!isOpen) return null;

  const defaultState = modalOptions.find((opt) => opt.value === todo.priority);

  const [selectPriority, setSelectPriority] = useState(defaultState);
  const nameInput = useInput(todo.name);
  const descriptionInput = useInput(todo.description);

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      width: '95%',
      backgroundColor: state.data.color,
      borderRadius: '8px',
      margin: '4px',
      padding: '10px',
    }),
    control: (provided) => ({
      ...provided,
      alignContent: 'center',
      borderRadius: '8px',
      backgroundColor: selectPriority ? selectPriority.color : '#FFFFFF',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      padding: '8px',
    }),
  };

  const closeModal = () => {
    nameInput.value = nameInput.value.trim();
    descriptionInput.value = descriptionInput.value.trim();

    if (
      nameInput.value !== todo.name ||
      descriptionInput.value !== todo.description ||
      selectPriority.value !== todo.priority
    ) {
      editTodo(
        todo._id,
        nameInput.value,
        descriptionInput.value,
        selectPriority.value
      );
    }

    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className="overlay-todo-modal" onClick={closeModal} />
      <form className="todo-modal">
        <input
          autoFocus
          autoComplete="off"
          type="text"
          id="todo-name-modal"
          defaultValue={todo.name}
          onChange={nameInput.handleChange}
        />
        <Select
          options={modalOptions}
          onChange={setSelectPriority}
          value={selectPriority}
          styles={selectStyles}
        />
        <textarea
          type="text"
          id="todo-description-modal"
          defaultValue={todo.description}
          onChange={descriptionInput.handleChange}
        />
      </form>
    </>,
    document.getElementById('portal')
  );
};
