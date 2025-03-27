export const apiTodosRoute = 'http://127.0.0.1:3001/api/v1/todos/';
export const apiUsersRoute = 'http://127.0.0.1:3001/api/v1/users/';

export const sortByOptions = [
  { value: 'none', label: 'None' },
  { value: 'date', label: 'Date' },
  { value: 'priority', label: 'Priority' },
];

export const modalOptions = [
  {
    value: 'None',
    label: 'None',
    color: '#dadada',
  },
  {
    value: 'Low',
    label: 'Low',
    color: '#FFDC49',
  },
  {
    value: 'Medium',
    label: 'Medium',
    color: '#FFA344',
  },
  {
    value: 'High',
    label: 'High',
    color: '#E2671F',
  },
  {
    value: 'Urgent',
    label: 'Urgent',
    color: '#f03c3c',
  },
];
