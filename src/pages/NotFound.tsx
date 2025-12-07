import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg text-center px-6 py-12 bg-white/80 dark:bg-gray-900/60 rounded-lg shadow">
        <div className="text-7xl mb-4">😕</div>
        <h1 className="text-2xl font-display font-bold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the page you're looking for.</p>
        <div className="flex justify-center gap-3">
          <button
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
          <button
            className="px-4 py-2 rounded-lg border text-sm"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
