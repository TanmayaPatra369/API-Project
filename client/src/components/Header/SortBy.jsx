import { useState, useContext } from 'react';
import { sortByOptions } from '../../utils/constants';
import Select from 'react-select';
import { SortByContext } from '../../context/SortByContext';

export function SortBy() {
  const { sortBy, setSortBy } = useContext(SortByContext);
  const [selectedOption, setSelectedOption] = useState(
    sortByOptions.find((opt) => opt.value === sortBy)
  );

  const handleChange = (opt) => {
    if (opt.value !== sortBy) {
      setSelectedOption(opt);
      setSortBy(opt.value);
      localStorage.setItem('sortBy', opt.value);
    }
  };

  return (
    <Select
      options={sortByOptions}
      className="sort-by-select"
      value={selectedOption}
      onChange={handleChange}
      placeholder="Sort By: "
    />
  );
}
