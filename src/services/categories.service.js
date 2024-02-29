import axios from 'axios';

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const fetchCategoriesForCurrentUser = async () => {
  try {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // Handle case where user is not authenticated
      return [];
    }

    const response = await axios.get('http://localhost:8080/api/categories', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error, e.g., show an error message or redirect to login
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Example usage
const loadCategories = async () => {
  const categories = await fetchCategoriesForCurrentUser();
  console.log('Categories for current user:', categories);
};

// Call the function to load categories
loadCategories();

export default fetchCategoriesForCurrentUser;