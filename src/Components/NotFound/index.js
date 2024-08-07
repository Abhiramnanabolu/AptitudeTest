// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-400 text-lg font-semibold">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
