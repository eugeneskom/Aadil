import React, { useEffect } from "react";
import { Product } from "../types/Product";
import { selectProductById, selectProductsByManufacturer } from "../state/products/productsSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toggleWishlist } from "../state/wishlist/wishlistSlice";
import { selectToken } from "../state/token/tokenSlice";
interface ProductPageProps {
  product: Product;
}

const SimilarProducts: React.FC<{ products: Product[] }> = ({ products }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Similar Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <NavLink to={`/product-page/${product.Id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} key={product.Id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={product.ImageUrl} alt={product.Name} className="w-full h-40 object-cover object-center" />
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold text-lg">{product.Name}</h3>
            <p className="text-gray-600 mt-2">
              {product.CurrentPrice} {product.Currency}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  </div>
);

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productSelector = selectProductById(id || "");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => productSelector(state)); // Call the function with the RootState
  const filteredProducts = useSelector(selectProductsByManufacturer(id || ""));
  console.log("ProductPage:", product);
  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = product?.Description || "";

    // Find all video elements in the HTML content
    const videos = container.querySelectorAll("video");

    // Loop through each video element
    videos.forEach((video) => {
      // Mute the video
      video.muted = true;

      // Pause the video
      video.pause();
    });
  }, [product?.Description]);

  const toggleWishlistHandler = async (productId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wishlist/toggle`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        dispatch(toggleWishlist(productId));
      }
      console.log("toggleWishlist", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to toggle product in wishlist");
    }
  };

  console.log("filteredProducts", filteredProducts);
  if (id === undefined || product === undefined) return <h1>Product id is undefined</h1>;

  return (
    <div
      className="container "
      // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block mt-5 mb-5 ml-3 go-back-arrow text-gray-600 hover:text-gray-800 transition duration-300">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </NavLink>
      <div className="lg:flex lg:-mx-4">
        <div className="lg:px-4 lg:w-1/2">
          <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
            <img src={product.ImageUrl} alt={product.Name} className="object-center object-cover" />
          </div>
        </div>
        <div className="lg:px-4 lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.Name}</h1>
          <p className="mt-3 text-xl text-gray-900">
            {product.CurrentPrice} {product.Currency}
          </p>
          <p className="text-gray-500 mb-2">
            {/* From: <span className="text-black font-bold">{product.CampaignName}</span>{" "} */}
            From: <span className="text-black font-bold">{product.Manufacturer}</span>{" "}
          </p>
          {product.Colors.length > 0 ? (
            <p className="mb-2">
              Colors:{" "}
              {product.Colors.map((color) => (
                <span>{color}</span>
              ))}
            </p>
          ) : (
            ""
          )}

          {product.Category && (
            <p className="text-gray-500 mb-2">
              Category: <span className="text-black font-bold">{product.Category}</span>{" "}
            </p>
          )}
          {product.SubCategory && (
            <p className="text-gray-500 mb-2">
              Category: <span className="text-black font-bold">{product.SubCategory}</span>{" "}
            </p>
          )}

          <div className="mt-8 product-page__actions">
            <button
              onClick={() => toggleWishlistHandler(product.Id)}
              type="button"
              className="product-page__add-wishlist inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Wishlist
            </button>
            <NavLink to={`${product.Url}`} target="_blank" className="product-page__buy inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              But it now
            </NavLink>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.Description }} />

        {/* <div className="text-base text-gray-700 space-y-6">{product.Description}</div> */}
      </div>
      {filteredProducts.length > 0 && <SimilarProducts products={filteredProducts.slice(0, 5)} />}
    </div>
  );
};

export default ProductPage;
