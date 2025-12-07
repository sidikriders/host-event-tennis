import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tennis-court via-tennis-net to-primary-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/main-logo.png" 
              alt="Host Event Tennis Logo" 
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-tennis-court to-primary-700 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-medium">
            Sign in to manage your tennis events
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            />
          </div>
          
          <button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Sign In
          </button>
          
          <div className="text-center">
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 w-32 h-32 bg-tennis-ball/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-4 left-4 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Login;
