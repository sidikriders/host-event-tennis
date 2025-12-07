import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { StoredEvent } from '../services/events';
import { db } from '../firebase';
import { deleteEvent } from '../services/events';
import CasualButton from './ui/CasualButton';

interface Props {
  event: StoredEvent;
  onView?: (id: string) => void;
  onDuplicate?: (event: StoredEvent) => void;
  onDelete?: (id: string) => void;
}

const formatDate = (value: unknown, fmt?: string): string => {
  if (!value) return '';

  type WithToDate = { toDate: () => Date };
  const toDate = (v: unknown): Date | null => {
    if (!v) return null;
    if ((v as WithToDate)?.toDate && typeof (v as WithToDate).toDate === 'function') {
      return (v as WithToDate).toDate();
    }
    if (v instanceof Date) return v;
    const d = new Date(String(v));
    return isNaN(d.getTime()) ? null : d;
  };

  const dt = toDate(value);
  if (!dt) return String(value);

  // If a format string is provided, use dayjs to format it (supports Moment-like tokens)
  if (fmt) return dayjs(dt).format(fmt);

  // Otherwise fallback to locale string for readability
  return dt.toLocaleString();
};

const EventCard: React.FC<Props> = ({ event, onView, onDuplicate, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const ok = window.confirm(`Delete event "${event.name}"? This action cannot be undone.`);
    if (!ok) return;
    setError(null);
    setDeleting(true);
    try {
      await deleteEvent(db, event.id);
      // parent will receive realtime update; call optional callback if provided
      onDelete?.(event.id);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold">{event.name}</h4>
          {event.location && <div className="text-sm text-gray-500">{event.location}</div>}
        </div>
        <div className="text-sm text-gray-400">ID: {event.id}</div>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <div><strong>Start:</strong> {formatDate(event.date_start, 'HH:mm DD MMM YYYY')}</div>
        {event.date_end && <div><strong>End:</strong> {formatDate(event.date_end, 'HH:mm DD MMM YYYY')}</div>}
      </div>


      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      <div className="mt-4 flex gap-2">
        <CasualButton onClick={() => onView?.(event.id)} disabled={deleting}>
          View
        </CasualButton>
        <CasualButton onClick={() => onDuplicate?.(event)} disabled={deleting}>
          Duplicate
        </CasualButton>
        <CasualButton variant="danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </CasualButton>
      </div>
    </div>
  );
};

export default EventCard;
