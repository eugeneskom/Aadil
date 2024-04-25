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

import { Helmet } from "react-helmet-async";
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
            <p className="text-gray-600 mt-2">$ {product.CurrentPrice}</p>
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

    // Find all iframe elements in the HTML content
    const iframes = container.querySelectorAll("iframe");

    // Loop through each iframe element
    iframes.forEach((iframe) => {
      // Remove the autoplay attribute from the iframe
      iframe.removeAttribute("autoplay");

      // Remove the allow attribute or remove 'autoplay' from the allow attribute
      const allowAttr = iframe.getAttribute("allow");
      if (allowAttr) {
        const allowValues = allowAttr.split("; ");
        const updatedAllowValues = allowValues.filter((value) => value !== "autoplay");
        iframe.setAttribute("allow", updatedAllowValues.join("; "));
      }
    });

    // Find the description container in the DOM
    const descriptionContainer = document.querySelector(".text-gray-700");

    // Clear the existing content
    if (descriptionContainer) {
      descriptionContainer.innerHTML = "";

      // Append the modified HTML content to the description container
      descriptionContainer.appendChild(container);
    }
  }, [product?.Description]);

  const toggleWishlistHandler = async (productId: string) => {
    if (!token) return;
    dispatch(toggleWishlistAsync({ productId, token }));
  };

  console.log("filteredProducts", filteredProducts);
  if (id === undefined || (product === undefined && fetchedProduct === null)) return <h1>Product id is undefined</h1>;

  const productToRender = product || fetchedProduct;

  if (!productToRender) {
    return <div className="container">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{productToRender.Name}</title>
        <meta property="og:title" content={productToRender.Name} />
        <meta property="og:description" content={productToRender.Description} />
        <meta property="og:image" content={productToRender?.ImageUrl} />
        <meta property="og:url" content={`https://example.com/product/${productToRender.Id}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={productToRender.CurrentPrice} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="instock" />
      </Helmet>
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
              {productToRender.CurrentPrice && <span className={productToRender.OriginalPrice === productToRender.CurrentPrice ? "current text-gray-500" : " current price-color-standard mr-2"}>$ {productToRender.CurrentPrice}</span>}
              {productToRender.OriginalPrice && productToRender.OriginalPrice !== productToRender.CurrentPrice && <span className="text-gray-500 line-through">$ {productToRender.OriginalPrice}</span>}
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
                Category: <span className="text-black font-bold">{productToRender.Category.join(", ")}</span>{" "}
              </p>
            )}
            {productToRender.SubCategory && (
              <p className="text-gray-500 mb-5">
                Subcategory: <span className="text-black font-bold">{productToRender.SubCategory?.join(', ')}</span>{" "}
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
              <ShareComponent title={productToRender.Name} imageUrl={productToRender.ImageUrl}/>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
          <div
            className="text-gray-700"
            // dangerouslySetInnerHTML={{ __html: productToRender.Description }}
          />
        </div>
        {filteredProducts.length > 0 && <SimilarProducts products={filteredProducts.slice(0, 5)} />}
      </div>
    </>
  );
};

export default ProductPage;
