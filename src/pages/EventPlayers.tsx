import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PrimaryButton from '../components/ui/PrimaryButton';
import CasualButton from '../components/ui/CasualButton';
import { db } from '../firebase';
import { subscribeToEventPlayers, setEventPlayerPresent } from '../services/players';
import type { StoredEventPlayer } from '../services/players';

const EventPlayers: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<StoredEventPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const unsub = subscribeToEventPlayers(db, id, (items) => {
      setPlayers(items);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  return (
    <Layout
      title="Players"
      actions={(
        <>
          <CasualButton onClick={() => navigate(`/events/${id}`)}>Back to Event</CasualButton>
          <PrimaryButton size="small" className="ml-2" onClick={() => navigate(`/events/${id}/players/create`)}>
            Add Player
          </PrimaryButton>
        </>
      )}
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-medium">Players for Event</div>
              <div className="text-sm text-gray-500">Event ID: {id}</div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading players…</div>
          ) : players.length === 0 ? (
            <div className="text-center py-8 text-gray-600">No players added to this event yet.</div>
          ) : (
            <div className="space-y-2">
              {players.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">{p.gender === 'M' ? 'Male' : 'Female'}</div>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-3 text-sm">Present</label>
                    <input
                      type="checkbox"
                      checked={!!p.present}
                      onChange={async () => {
                        const newVal = !p.present;
                        // optimistic update
                        setPlayers((prev) => prev.map((x) => (x.id === p.id ? { ...x, present: newVal } : x)));
                        try {
                          if (!id) throw new Error('Missing event id');
                          await setEventPlayerPresent(db, id, p.id, newVal);
                        } catch (err) {
                          // revert on error
                          setPlayers((prev) => prev.map((x) => (x.id === p.id ? { ...x, present: p.present } : x)));
                          // eslint-disable-next-line no-alert
                          alert('Failed to update present status');
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EventPlayers;
