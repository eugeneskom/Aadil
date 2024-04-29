import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { setToken } from "../../state/token/tokenSlice";

const ResetPasswordConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  console.log('token',token)

const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`, { password });
    console.log('ResetPasswordConfirmation', response.data);
    localStorage.setItem("jwt", JSON.stringify(response.data.token) ?? "");
    dispatch(setToken(response.data.token));
    navigate('/');
    setSuccess(true);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data && error.response.data.message) {
      setError(`Failed to reset password: ${error.response.data.message}`);
    } else if (error instanceof Error && error.message) {
      setError(`Failed to reset password: ${error.message}`);
    } else {
      setError(`Failed to reset password: Unknown error`);
    }
  }
};


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Reset Password Confirmation</h2>
    {success ? (
      <p className="text-green-500 mb-4">Your password has been successfully reset.</p>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="new-password" className="block font-medium">New Password:</label>
          <input 
            id="new-password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block font-medium">Confirm Password:</label>
          <input 
            id="confirm-password" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">Reset Password</button>
      </form>
    )}
  </div>
  
  );
};

export default ResetPasswordConfirmation;
