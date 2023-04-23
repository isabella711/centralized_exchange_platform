// AddValue.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const AddValue = () => {
  const [value, setValue] = useState('');
  const { addValue } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addValue(value);
      alert('Value added successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Add Value</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Value</button>
      </form>
    </div>
  );
};

export default AddValue;