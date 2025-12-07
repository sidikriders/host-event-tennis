import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { subscribeToUserEvents } from '../services/events';
import EventCard from '../components/EventCard';
import type { StoredEvent } from '../services/events';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // not authenticated — the ProtectedRoute should redirect, but guard here too
      // schedule state updates asynchronously to avoid cascading renders
      queueMicrotask(() => {
        setEvents([]);
        setLoading(false);
      });
      return;
    }

    // schedule state updates to avoid synchronous setState within the effect body
    queueMicrotask(() => {
      setLoading(true);
      setError(null);
    });

    const unsub = subscribeToUserEvents(db, user.uid, (items) => {
      setEvents(items);
      setLoading(false);
    });

    return () => unsub();
  }, [user, authLoading]);

  return (
    <Layout
      title="My Events"
      actions={(
        <PrimaryButton onClick={() => navigate('/events/create')} className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Event
        </PrimaryButton>
      )}
    >

      {authLoading || loading ? (
        <div className="text-center py-16">
          <div className="loader mb-4 mx-auto" />
          <p className="text-gray-600">Loading events…</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-600">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎾</div>
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">No events yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first tennis event</p>
          <PrimaryButton onClick={() => navigate('/events/create')} className="inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </PrimaryButton>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {events.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              onView={(id) => navigate(`/events/${id}`)}
              onDuplicate={() => navigate('/events/create')}
            />
          ))}
        </div>
      )}

    </Layout>
  );
};

export default Events;
