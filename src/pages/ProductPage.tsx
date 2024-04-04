import React, { useEffect } from "react";
import { Product } from "../types/Product";
import { selectProductById, selectProductsByManufacturer } from "../state/products/productsSlice";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleWishlistAsync } from "../state/wishlist/wishlistSlice";
import { selectToken } from "../state/token/tokenSlice";
import CountdownTimer from "../components/CountDownTimer";
import ShareComponent from "../components/ShareComponent";
import axios from "axios";

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
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => productSelector(state)); // Call the function with the RootState
  const filteredProducts = useSelector(selectProductsByManufacturer(id || ""));
  console.log("ProductPage:", product, "id", id);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.includes(id ?? "");
  const isSale = product && product.CurrentPrice && product.OriginalPrice && product.CurrentPrice < product.OriginalPrice;
  const [fetchedProduct, setFetchedProduct] = React.useState<Product | null>(null);

  useEffect(() => {
    const fetchSingleProduct = async (id: string) => {
      // Fetch single product
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        const data = response.data;
        console.log("Single product data", data);
        setFetchedProduct(data.product);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    if (!id) return;
    fetchSingleProduct(id);

    return () => {};
  }, [id, product]);

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
    if (!token) return;
    dispatch(toggleWishlistAsync({ productId, token }));
  };

  console.log("filteredProducts", filteredProducts);
  if (id === undefined || (product === undefined && fetchedProduct === null)) return <h1>Product id is undefined</h1>;

  const productToRender = product || fetchedProduct;

  if (!productToRender) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container  overflow-hidden">
      <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block mt-5 mb-5 ml-3 go-back-arrow text-gray-600 hover:text-gray-800 transition duration-300">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </NavLink>
      <div className="lg:flex lg:-mx-4">
        <div className="lg:px-4 lg:w-1/2">
          <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img src={productToRender.ImageUrl} alt={productToRender.Name} className="object-center object-cover w-full h-auto" />
          </div>
        </div>
        <div className="lg:px-4 lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-5">{productToRender.Name}</h1>
          <div className="product-page__price mb-7 pb-5">
            {productToRender.CurrentPrice && (
              <span className={productToRender.OriginalPrice === productToRender.CurrentPrice ? "current text-gray-500" : " current price-color-standard mr-2"}>
                {productToRender.CurrentPrice} {productToRender.Currency}
              </span>
            )}
            {productToRender.OriginalPrice && productToRender.OriginalPrice !== productToRender.CurrentPrice && (
              <span className="text-gray-500 line-through">
                {productToRender.OriginalPrice} {productToRender.Currency}
              </span>
            )}
          </div>
          <p className="text-gray-500 mb-5">
            {/* From: <span className="text-black font-bold">{product.CampaignName}</span>{" "} */}
            From: <span className="text-black font-bold">{productToRender.Manufacturer}</span>{" "}
          </p>
          {productToRender.Colors.length > 0 ? (
            <p className="mb-3">
              Colors:{" "}
              {productToRender.Colors.map((color) => (
                <span>{color}</span>
              ))}
            </p>
          ) : (
            ""
          )}

          {productToRender.Category && (
            <p className="text-gray-500 mb-5">
              Category: <span className="text-black font-bold">{productToRender.Category}</span>{" "}
            </p>
          )}
          {productToRender.SubCategory && (
            <p className="text-gray-500 mb-5">
              Category: <span className="text-black font-bold">{productToRender.SubCategory}</span>{" "}
            </p>
          )}

          <div className="mt-8 product-page__actions flex space-x-4 mb-5">
            <button
              onClick={() => toggleWishlistHandler(productToRender.Id)}
              type="button"
              className="product-page__add-wishlist flex-1 inline-flex items-center justify-center px-6 py-5 border border-transparent text-base font-medium rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <NavLink
              to={`${productToRender.Url}`}
              target="_blank"
              className="product-page__buy flex-1 inline-flex items-center justify-center px-6 py-5 border border-transparent text-base font-medium rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buy it now
            </NavLink>
          </div>
          {/* {isSale ? ( */}
          <div className="mb-5">
            <CountdownTimer />
          </div>
          {/* ) : ( */}
          {/* "" */}
          {/* )} */}
          <div className="mb-5">
            <ShareComponent />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: productToRender.Description }} />
      </div>
      {filteredProducts.length > 0 && <SimilarProducts products={filteredProducts.slice(0, 5)} />}
    </div>
  );
};

export default ProductPage;
