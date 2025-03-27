import React, { useState } from 'react';

export const SortByContext = React.createContext(null);

export const SortByProvider = ({ children }) => {
  const localSortBy = localStorage.getItem('sortBy');

  const [sortBy, setSortBy] = useState(localSortBy ? localSortBy : 'None');

  return (
    <SortByContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortByContext.Provider>
  );
};
