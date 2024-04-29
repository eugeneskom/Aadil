import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../state/token/tokenSlice";
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../components/auth/SignUpPopup";

function AuthenticationPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);
  console.log("successMessage", successMessage);
  const isLogin = location.pathname === "/auth/login";
  const isForgetPassword = location.pathname === "/auth/password";
  const isRegister = location.pathname === "/auth/register";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    (e as React.FormEvent<HTMLFormElement>).preventDefault();
    // Handle form submission based on isLogin and isForgetPassword state
    // You can make API calls or perform authentication logic here
    authenticate();
    console.log("Form submitted");
  };
  const authenticate = async () => {
    console.log("Form submitted");
    setDisabled(true);

    // Handle login logic here
    let params = {};
    let endpoint = "";
    try {
      if (isRegister) {
        endpoint = "register";
        params = {
          email,
          password,
          firstName: name,
        };
      } else if (isForgetPassword) {
        endpoint = "reset-password";
        params = {
          email,
        };
      } else if (isLogin) {
        endpoint = "login";
        params = {
          email,
          password,
        };
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/${endpoint}`, params);
      console.log("response: " + endpoint, response.data);
      const data = response.data;
      if (data.success) {
        // Save the token in local storage
        const token = JSON.stringify(data.token);
        if (token) {
          localStorage.setItem("jwt", token);
          dispatch(setToken(response.data));
        }
        // Redirect the user to the dashboard
        if (isRegister) {
          navigate("/auth/login");
        } else if (isForgetPassword) {
          // navigate("/auth/reset-confirm")
        } else {
          navigate("/");
        }
        setSuccessMessage(data.message);
      } else {
        // Display error message
        console.log("Error:", data.message);
        setErrorMessage(data.message);
      }
    setDisabled(false);
    } catch (error) {
    setDisabled(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error response:", error.response.data);
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
          setErrorMessage("No response from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error:", error.message);
          setErrorMessage("An error occurred");
        }
      } else {
        console.log("Unknown error:", error);
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const navigateToLogin = () => {
    setSuccessMessage('')
    setErrorMessage('')
    navigate("/auth/login");
  };

  const navigateToRegister = () => {
    setSuccessMessage('')
    setErrorMessage('')
    navigate("/auth/register");
  };

  const navigateToForgotPassword = () => {
    setSuccessMessage('')
    setErrorMessage('')
    navigate("/auth/password");
  };

  useEffect(() => {
    return () => {};
  }, []);

  {console.log('isLogin',   isLogin,isForgetPassword && !successMessage)}


  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? "Sign in to your account" : isRegister ? "Create a new account" : "Reset your password"}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm ">
            <div className="mb-5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!isForgetPassword && (
              <>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none mb-5 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            {isRegister && (
              <>
                <>
                  <label htmlFor="name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="name"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none mb-5 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Abdul"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
                <div className="mb-5">
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          {errorMessage && (
            <div className="text-red-600 text-center bg-red-100 p-3 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 text-center bg-green-100 p-3 rounded-md">
              <p>{successMessage}.</p>
            </div>
          )}

          <div>
            {/* {isLogin || (isForgetPassword && !successMessage)   && ( */}
            {!(isForgetPassword && successMessage ) && (
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLogin ? "Sign in" : isForgetPassword ? "Reset Password" : "Register"}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between">
            {!isRegister && (
              <div className="text-sm">
                {isLogin ? (
                  <button type="button" onClick={navigateToForgotPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </button>
                ) : (
                  <button type="button" onClick={navigateToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Back to Sign in
                  </button>
                )}
              </div>
            )}
            {!isForgetPassword && (
              <div className="text-sm">
                {isLogin ? (
                  <button type="button" onClick={navigateToRegister} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create an account
                  </button>
                ) : (
                  <button type="button" onClick={navigateToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </button>
                )}
              </div>
            )}

          </div>
            <div className="flex items-center my-5">
              <div className="flex-grow bg-gray-400 h-px"></div>
              <p className="mx-4 text-black">OR</p>
              <div className="flex-grow bg-gray-400 h-px"></div>
            </div>

            <button
              className="social-signup-btn bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                googleAuth();
              }}
            >
              <FcGoogle size={20} className="signup-google-btn" />
              Continue with Google
            </button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationPage;
