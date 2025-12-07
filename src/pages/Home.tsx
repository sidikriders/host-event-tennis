import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="">
      <div className="text-center">
        <div className="bg-linear-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <img src="/main-logo.png" alt="Host Event Tennis Logo" className="h-16 w-auto" />
        </div>
        <p className="text-xl text-gray-600 font-medium mb-6">Welcome to your tennis event management platform!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <button
          type="button"
          onClick={() => navigate('/events')}
          className="text-left bg-linear-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200 hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Go to Events"
        >
          <div className="text-3xl mb-3">🎾</div>
          <h3 className="font-display font-bold text-xl text-tennis-court mb-2">Manage Events</h3>
          <p className="text-gray-600">Create and organize tennis tournaments with ease</p>
        </button>

        <div className="bg-linear-to-br from-accent-blue/10 to-accent-blue/20 p-6 rounded-2xl border border-accent-blue/30">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="font-display font-bold text-xl text-tennis-court mb-2">Track Players <i>(soon)</i></h3>
          <p className="text-gray-600">Monitor participants and their performance</p>
        </div>

        <div className="bg-linear-to-br from-accent-orange/10 to-accent-orange/20 p-6 rounded-2xl border border-accent-orange/30">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-display font-bold text-xl text-tennis-court mb-2">View Results <i>(soon)</i></h3>
          <p className="text-gray-600">Access scores and tournament standings</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
