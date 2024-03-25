import axios from "axios";

export const fetchProductsByCatalogId = async (id:string) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/products/byCatalogId/${id}`);
    return response.data.products;
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};
