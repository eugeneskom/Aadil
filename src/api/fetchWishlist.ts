import axios from 'axios';

const BASE_URL = 'http://your-backend-url.com'; // Replace with your backend URL

export const api = {
  toggleProductInWishlist: async (email: string, productId: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/wishlist/toggle`, { email, productId });
      return response.data;
    } catch (error) {
      throw new Error('Failed to toggle product in wishlist');
    }
  },

  getWishlist: async (email: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist`, { params: { email } });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve wishlist');
    }
  },
};