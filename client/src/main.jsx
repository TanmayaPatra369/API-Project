import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SortByProvider } from './context/SortByContext.jsx';
import { TodosProvider } from './context/TodosContext.jsx';
import { ErrorProvider } from './context/ErrorContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorProvider>
      <TodosProvider>
        <SortByProvider>
          <App />
        </SortByProvider>
      </TodosProvider>
    </ErrorProvider>
  </StrictMode>
);
