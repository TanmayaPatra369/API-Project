import { useNavigate } from 'react-router';
import todosApi from '../../api/todosApi';
import { useError } from '../../context/ErrorContext';
import useInput from '../../hooks/useInput';
import ErrorMessage from '../ErrorMessage';
import './Auth.css';

const Login = () => {
  let navigate = useNavigate();

  const emailInput = useInput('');
  const passwordInput = useInput('');
  const { showError } = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await todosApi.login(emailInput.value, passwordInput.value);
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
      <h1 id="login-h1">Login</h1>
      <hr className="header-divider" />
      <ErrorMessage />
      <form onSubmit={handleSubmit} id="login-form">
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
        <button id="login-btn">Submit</button>
      </form>

      <a href="/signup" id="login-to-signup-a">
        Create an user
      </a>
    </div>
  );
};
export default Login;
