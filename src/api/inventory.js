import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchInventory = async () => {
  const response = await axios.get(`${API_URL}/inventory`);
  return response.data;
};

export const updateInventory = async (updates) => {
  const response = await axios.patch(`${API_URL}/inventory`, updates);
  return response.data;
};
