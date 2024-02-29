import React, { useState, useEffect } from 'react';
import fetchCategoriesForCurrentUser from 'services/categories.service'; 

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategoriesForCurrentUser();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  return (
    <div>
      <h2>Categories for Current User</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
