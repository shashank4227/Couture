import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (params = {}) => {
  // params: limit, skip, select, sortBy, order
  // For search, we need a different endpoint if 'q' is present
  const { q, ...rest } = params;
  let endpoint = '/products';
  if (q) {
    endpoint = '/products/search';
    rest.q = q;
  }
  
  const response = await api.get(endpoint, { params: rest });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category, params = {}) => {
  const response = await api.get(`/products/category/${category}`, { params });
  return response.data;
};

export default api;
