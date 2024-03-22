import axios from "axios";

export const fetchProducts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};
