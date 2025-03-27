import { useNavigate } from 'react-router';
import Select from 'react-select';
import todosApi from '../../api/todosApi';
import { useError } from '../../context/ErrorContext';

const Logout = () => {
  let navigate = useNavigate();
  const { showError } = useError();

  const handleClick = async () => {
    try {
      const res = await todosApi.logout();
      if (res.error) {
        showError(res.error);
      } else if (res.status === 'success') {
        navigate('/login');
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div id="logout-div">
      <button id="logout-btn" onClick={() => handleClick()}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
