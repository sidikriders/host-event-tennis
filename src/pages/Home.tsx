import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <img 
          src="/main-logo.png" 
          alt="Host Event Tennis Logo" 
          className="mx-auto mb-6 h-32 w-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Host Event Tennis
        </h1>
        <p className="text-gray-600">
          Welcome to your tennis event management platform!
        </p>
      </div>
    </div>
  );
};

export default Home;
