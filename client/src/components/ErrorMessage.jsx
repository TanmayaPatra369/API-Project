import { useError } from '../context/ErrorContext';

const ErrorMessage = () => {
  const { error, showError } = useError();

  if (!error) return null;

  return <div id="error-message">{error}</div>;
};

export default ErrorMessage;
