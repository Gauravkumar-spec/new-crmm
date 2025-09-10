import axios from 'axios';

const api = axios.create({
 baseUrl: import.meta.env.VITE_BASE_URL,    // your backend base URL
});

export const getListings = () => api.get('/listings');
export const addListing = (formData) => api.post('/listings', formData);

export default api;
