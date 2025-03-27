import { useContext } from 'react';
import { SortByContext } from '../context/SortByContext';

export default function sortTodos(todos) {
  let sortedTodos;
  const { sortBy, setSortBy } = useContext(SortByContext);

  const prioritySortOrder = ['Urgent', 'High', 'Medium', 'Low', 'None'];

  const sortByPriority = prioritySortOrder.reduce((obj, item, index) => {
    return {
      ...obj,
      [item]: index,
    };
  }, {});

  if (sortBy === 'date') {
    sortedTodos = [...todos].sort((a, b) => a.createdAt - b.createdAt);
  } else if (sortBy === 'priority') {
    sortedTodos = [...todos].sort(
      (a, b) => sortByPriority[a.priority] - sortByPriority[b.priority]
    );
  } else {
    sortedTodos = [...todos];
  }

  const sortedCompletedTodos = [...sortedTodos].sort(
    (a, b) => a.isCompleted - b.isCompleted
  );

  return sortedCompletedTodos;
}
