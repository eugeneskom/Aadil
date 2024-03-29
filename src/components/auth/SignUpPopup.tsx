import React, { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toggleAuthPopup } from "../../state/AuthPopupStateSlice";
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";

interface SignUpPopupProps {
  togglePopup: () => void;
}


const SignUpPopup = ( ) => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted email:", email);
    togglePopup()
    dispatch(toggleAuthPopup());
  };

  const togglePopup = () => {
    dispatch(toggleAuthPopup());
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sign up to save the items you love. We’ll let you know when they go on sale.</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={togglePopup}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                // Handle continue with Google, Apple, or Facebook logic here
                console.log("Continue with Google, Apple, or Facebook");
                // setShowPopup(false);
                togglePopup()
              }}
            >
              <FcGoogle />
              Continue with Google
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
    </div>
  );
};

export default SignUpPopup;
