import './Auth.css';

import { useNavigate } from 'react-router';
import todosApi from '../../api/todosApi';
import { useError } from '../../context/ErrorContext';
import useInput from '../../hooks/useInput';
import ErrorMessage from '../ErrorMessage';

const Signup = () => {
  let navigate = useNavigate();

  const nameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const passwordConfirmInput = useInput('');
  const { showError } = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await todosApi.signup(
        nameInput.value,
        emailInput.value,
        passwordInput.value,
        passwordConfirmInput.value
      );
      if (res.error) {
        showError(res.error);
      } else if (res.status === 'success') {
        navigate('/');
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div id="todo-container">
      <h1 id="signup-h1">Signup</h1>
      <hr className="header-divider" />
      <ErrorMessage />
      <form onSubmit={handleSubmit} id="login-form">
        <label id="login-name-label">
          Name
          <input
            autoComplete="off"
            id="login-name-input"
            value={nameInput.value}
            onChange={nameInput.handleChange}
          />
        </label>
        <label id="login-email-label">
          Email
          <input
            autoComplete="off"
            id="login-email-input"
            value={emailInput.value}
            onChange={emailInput.handleChange}
          />
        </label>
        <label id="login-pass-label">
          Password
          <input
            id="login-pass-input"
            type="password"
            value={passwordInput.value}
            onChange={passwordInput.handleChange}
          />
        </label>
        <label id="login-pass-confirm-label">
          Password Confirm
          <input
            id="login-pass-confirm-input"
            type="password"
            value={passwordConfirmInput.value}
            onChange={passwordConfirmInput.handleChange}
          />
        </label>
        <button id="login-btn">Submit</button>
      </form>

      <a href="/login" id="login-to-signup-a">
        Login
      </a>
    </div>
  );
};
export default Signup;
