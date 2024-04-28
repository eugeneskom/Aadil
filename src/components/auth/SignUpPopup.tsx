import React, { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toggleAuthPopup } from "../../state/AuthPopupStateSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaApple } from "react-icons/fa";
import facebookIcon from "../../assets/icons/facebook.svg";
import { IoMdClose } from "react-icons/io";

interface SignUpPopupProps {
  togglePopup: () => void;
}

const SignUpPopup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted email:", email);
    togglePopup();
    dispatch(toggleAuthPopup());
  };

  const togglePopup = () => {
    dispatch(toggleAuthPopup());
  };

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  const facebookAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/facebook`, "_self");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 signup-popup">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 p-6 signup-popup__inner">
        <button className="signup-popup__close-btn" onClick={togglePopup}>
          <IoMdClose size={25} className="bg-white" />
        </button>
        <div className="signup-popup__left">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Sign up to save the items you love. We’ll let you know when they go on sale.</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className=" mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className=" mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className=" mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <button className="bg-black text-white w-full px-3 py-3 text-sm font-bold">Save product</button>

              <div className="flex items-center my-5">
                <div className="flex-grow bg-gray-400 h-px"></div>
                <p className="mx-4 text-black">OR</p>
                <div className="flex-grow bg-gray-400 h-px"></div>
              </div>
            </div>

            <div className="signup-popup__btns">
              <button
                className="social-signup-btn bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  // Handle continue with Google, Apple, or Facebook logic here
                  console.log("Continue with Google, Apple, or Facebook");
                  // setShowPopup(false);
                  googleAuth();
                  // togglePopup();
                }}
              >
                <FcGoogle size={20} className="signup-google-btn" />
                Continue with Google
              </button>

              <button
                className="social-signup-btn bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  // Handle continue with Google, Apple, or Facebook logic here
                  console.log("Continue with Google, Apple, or Facebook");
                  // setShowPopup(false);
                  facebookAuth();
                  togglePopup();
                }}
              >
                {/* <RiFacebookCircleFill  className="signup-google-btn" />
                 */}
                <img src={facebookIcon} width="20" className="signup-google-btn" alt="Facebook login" />
                Continue with Facebook
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-500 text-sm">
            <span>
              By creating an account, you consent to Lyst's{" "}
              <a href="/help/terms-and-conditions/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                Terms & Conditions
              </a>{" "}
              and you agree to receive email updates from Lyst. To learn more about how Lyst uses and protects your personal data, please read Lyst's{" "}
              <a href="/help/privacy-policy/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </div>
        </div>
        <div className="signup-popup__right">
          <img src="https://via.placeholder.com/300" alt="Signup" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
