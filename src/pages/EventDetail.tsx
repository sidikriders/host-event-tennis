import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getEventById, type EventData } from "../services/events";
import { useAuth } from "../hooks/useAuth";
import PrimaryButton from "../components/ui/PrimaryButton";
import CasualButton from "../components/ui/CasualButton";
import Layout from "../components/Layout";
import { formatDate } from "../utils/date";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [event, setEvent] = useState<(EventData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getEventById(db, id)
      .then((e) => {
        if (!mounted) return;
        setEvent(e);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (authLoading || loading) {
    return (
      <div className="text-center py-16">
        <div className="loader mb-4 mx-auto" />
        <p className="text-gray-600">Loading event…</p>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!event)
    return (
      <div className="text-center py-16">
        Event not found or has been deleted.
      </div>
    );

  // optional: restrict access to owner
  if (user && event.created_by_id !== user.uid) {
    return (
      <div className="text-center py-16">
        You don't have permission to view this event.
      </div>
    );
  }

  return (
    <Layout
      title={event.name}
      actions={
        <>
          <CasualButton onClick={() => navigate('/events')}>Back to Events</CasualButton>
        </>
      }
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-4 flex gap-4 justify-between">
          <div>
            {event.location && (
              <div className="text-sm text-gray-500">{event.location}</div>
            )}
            <div className="text-sm text-gray-400">ID: {event.id}</div>
          </div>
          <div className="flex md:flex-row gap-4">
            <div>
              <div className="text-sm text-gray-500">Start</div>
              <div className="text-sm text-gray-400">
                {formatDate(event.date_start, "HH:mm DD MMM YYYY")}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">End</div>
              <div className="text-sm text-gray-400">
                {event.date_end
                  ? formatDate(event.date_end, "HH:mm DD MMM YYYY")
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm flex justify-end items-center">
          <CasualButton className="ml-2" onClick={() => navigate(`/events/${id}/players`)}>
            Manage Players
          </CasualButton>
          <PrimaryButton size="small" className="ml-2" onClick={() => navigate(`/events/${id}/matches/create`)}>
            Create Match
          </PrimaryButton>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
