import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../state/token/tokenSlice";
import { validateToken } from "../state/token/isValidToken";
import { emptyWishlist } from "../state/wishlist/wishlistSlice";
import { UserType } from "../types/UserType";
function UserAccount() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user: UserType | null = useSelector((state: RootState) => state.isValidToken.user);

  const logout = () => {
    // Handle logout logic here
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    // dispatch(setWishlist([]));
    dispatch(setToken(""));
    dispatch(emptyWishlist());
    dispatch(validateToken(""));
    navigate('/')
  };
  return (
    <section className="user-page">
      <div className="container">
        <div className="user-page__inner">
          <h1 className="text-3xl font-bold mb-6">User Account</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-lg">Personal Information</h3>
                <p className="text-gray-600 mt-2">Name: {user?.firstName}</p>
                <p className="text-gray-600 mt-2">Last Name: {user?.lastName}</p>
                <p className="text-gray-600 mt-2">Email: {user?.email}</p>
                <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAccount;
