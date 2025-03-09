import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import Login from './auth/Login';  // Import the login component
import Signup from './auth/SignUp';  // Import the signup component


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome</h1>

            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                <LogIn size={20} />
                Sign In
              </Link>

              <Link
                to="/signup"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-150 ease-in-out"
              >
                <UserPlus size={20} />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Define the routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
