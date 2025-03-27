import './TodoHeader.css';
import { SortBy } from './SortBy';

export const TodoHeader = () => {
  return (
    <div className="todos-header">
      <h1 className="todos-h1">Todo</h1>
      <SortBy />
    </div>
  );
};
