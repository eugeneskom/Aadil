import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWishlist, toggleProjectId } from "../state/wishlist/wishlistSlice";
import { AppDispatch, RootState } from "../state/store";
import { selectUser } from "../state/user/userSlice";
import { Product } from "../types/Product";
import { selectProducts } from "../state/products/productsSlice";

const WishlistPage = () => {
  // Dummy data for wishlist items
  const user = useSelector(selectUser);
  const products: Product[] = useSelector(selectProducts);
  const wishlist: string[] = useSelector(selectWishlist);

  function getRepeatedProductIds(products: Product[]): { [key: string]: number } {
    const idCounts: { [key: string]: number } = {};

    products.forEach((product) => {
      if (idCounts[product.Id]) {
        idCounts[product.Id]++;
      } else {
        idCounts[product.Id] = 1;
      }
    });

    const repeatedIds: { [key: string]: number } = {};

    Object.entries(idCounts).forEach(([id, count]) => {
      if (count > 1) {
        repeatedIds[id] = count;
      }
    });

    return repeatedIds;
  }

  const repeatingProducts = getRepeatedProductIds(products)
  console.log('repeatingProducts',repeatingProducts)
  const productsWishlist: Product[] = products.filter((product) => wishlist.includes(product.Id));
  console.log("wishlist___", wishlist, productsWishlist);
  const dispatch: AppDispatch = useDispatch(); // Cast the dispatch to AppDispatch
  // const wishlist = useSelector(selectWishlist);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  // console.log('wishlistItems',wishlistItems)

  const userEmail = user ? user.email : "";

  const handleToggleWishlist = (product: Product) => {
    if (userEmail) {
      dispatch(toggleProjectId({ email: userEmail, productId: product.Id }));
    }
  };

  // const wishlist = useSelector(selectWishlist);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      {productsWishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
          {productsWishlist.map((product) => (
            <div key={product.Id} className="bg-white rounded-lg shadow-md overflow-hidden grid grid-rows-auto gap-4">
              <img src={product.ImageUrl} alt={product.Name} className="w-full h-48 object-contain" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.Name}</h2>
                <p className="text-gray-600 mb-2 font-bold">
                  {product.OriginalPrice !== product.CurrentPrice && (
                    <span className="text-gray-500 line-through">
                      {product.OriginalPrice} {product.Currency}
                    </span>
                  )}
                  {product.CurrentPrice && (
                    <span className={product.OriginalPrice === product.CurrentPrice ? "text-black" : "text-red-500 ml-2"}>
                      {product.CurrentPrice} {product.Currency}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-around mb-5">
                <button className="mt-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md">Add to Cart</button>
                <button className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">Remove from wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
