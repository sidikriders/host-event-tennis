import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <img 
            src="/main-logo.png" 
            alt="Host Event Tennis Logo" 
            className="mx-auto mb-4 h-24 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to manage your tennis events
          </p>
        </div>
        {/* Login form will be added here */}
      </div>
    </div>
  );
};

export default Login;
