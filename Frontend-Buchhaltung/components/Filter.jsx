import React from 'react';
import '../src/App.css';

const Filter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <select
      name="categoryFilter"
      id="categoryFilter"
      value={selectedCategory}
      onChange={(event) => setSelectedCategory(event.target.value)}
    >
      <option value="">Alle Kategorien</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
