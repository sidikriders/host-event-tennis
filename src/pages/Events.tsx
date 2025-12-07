import React from 'react';
import { useNavigate } from 'react-router-dom';

const Events: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-tennis-court via-tennis-net to-primary-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold bg-linear-to-r from-tennis-court to-primary-700 bg-clip-text mb-2">
                My Events
              </h1>
              <p className="text-gray-600 font-medium">
                Manage your tennis tournaments and events
              </p>
            </div>
            <button
              onClick={() => navigate('/events/create')}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Event
            </button>
          </div>

          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎾</div>
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first tennis event
            </p>
            <button
              onClick={() => navigate('/events/create')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
