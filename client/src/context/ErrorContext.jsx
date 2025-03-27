import React, { useContext, useState } from 'react';

const ErrorContext = React.createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = async (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 3000);
  };
  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
