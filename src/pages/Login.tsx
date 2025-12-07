import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.error('Error signing in with Google:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-tennis-court via-tennis-net to-primary-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
        <div className="text-center mb-8">
          <div className="bg-linear-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/main-logo.png" 
              alt="Host Event Tennis Logo" 
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-4xl font-display font-bold bg-linear-to-r from-tennis-court to-primary-700 bg-clip-text mb-2">
            Welcome
          </h1>
          <p className="text-gray-600 font-medium">
            Sign in to manage your tennis events
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 w-32 h-32 bg-tennis-ball/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-4 left-4 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Login;
