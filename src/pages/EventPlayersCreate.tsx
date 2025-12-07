import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PrimaryButton from '../components/ui/PrimaryButton';
import CasualButton from '../components/ui/CasualButton';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { createPlayer, getPlayersByUser, addPlayerToEvent, type StoredPlayer } from '../services/players';

const EventPlayersCreate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [mode, setMode] = useState<'create' | 'reuse'>('create');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [present, setPresent] = useState(false);
  const [existing, setExisting] = useState<StoredPlayer[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getPlayersByUser(db, user.uid).then(setExisting).catch((e) => console.error(e));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!id) return setError('Missing event id');
    if (!user) return setError('Not authenticated');

    setSaving(true);
    try {
      if (mode === 'create') {
        // create global player then add to event
        const playerId = await createPlayer(db, { created_by_id: user.uid, name, gender, present });
        await addPlayerToEvent(db, id, { id: playerId, name, gender, present }, user.uid);
      } else {
        if (!selectedPlayerId) throw new Error('Select a player to reuse');
        const player = existing.find((p) => p.id === selectedPlayerId)!;
        await addPlayerToEvent(db, id, player, user.uid);
      }
      navigate(`/events/${id}/players`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div className="text-center py-16">Loading…</div>;

  return (
    <Layout title="Add Player" actions={<CasualButton onClick={() => navigate(`/events/${id}/players`)}>Back</CasualButton>}>
      <div className="max-w-2xl mx-auto py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="inline-flex items-center mr-4">
              <input type="radio" name="mode" value="create" checked={mode === 'create'} onChange={() => setMode('create')} className="mr-2" />
              Create new player
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="mode" value="reuse" checked={mode === 'reuse'} onChange={() => setMode('reuse')} className="mr-2" />
              Reuse existing player
            </label>
          </div>

          {mode === 'create' ? (
            <>
              <div className="mb-3">
                <label className="block text-sm text-gray-700">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded border" required />
              </div>

              <div className="mb-3 flex gap-4 items-center">
                <div>
                  <label className="block text-sm text-gray-700">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value as 'M' | 'F')} className="px-3 py-2 rounded border">
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={present} onChange={(e) => setPresent(e.target.checked)} className="mr-2" /> Present
                </label>
              </div>
            </>
          ) : (
            <div className="mb-4">
              {existing.length === 0 ? (
                <div className="text-gray-600">No saved players yet.</div>
              ) : (
                <select value={selectedPlayerId ?? ''} onChange={(e) => setSelectedPlayerId(e.target.value)} className="w-full px-3 py-2 rounded border">
                  <option value="">Select a player to reuse</option>
                  {existing.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {p.gender}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <div className="flex items-center gap-3">
            <PrimaryButton size="small" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</PrimaryButton>
            <CasualButton onClick={() => navigate(`/events/${id}/players`)} type="button">Cancel</CasualButton>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EventPlayersCreate;
