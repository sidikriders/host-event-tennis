import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Events: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="My Events"
      actions={(
        <button onClick={() => navigate('/events/create')} className="btn-primary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Event
        </button>
      )}
    >

      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎾</div>
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">No events yet</h3>
        <p className="text-gray-600 mb-6">Get started by creating your first tennis event</p>
        <button onClick={() => navigate('/events/create')} className="btn-primary inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

    </Layout>
  );
};

export default Events;
