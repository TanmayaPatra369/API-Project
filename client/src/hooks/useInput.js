import { useState } from 'react';

export default (defaultVal) => {
  const [value, setValue] = useState(defaultVal);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};
