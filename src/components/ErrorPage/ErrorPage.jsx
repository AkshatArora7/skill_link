import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white font-medium py-3 px-6 rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
        >
          Return To Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;