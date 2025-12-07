import { collection, addDoc, query, where, orderBy, getDocs, onSnapshot, Timestamp, updateDoc, doc } from 'firebase/firestore';
import type { Firestore, DocumentData } from 'firebase/firestore';
// import { db } from '../firebase';

export interface EventData {
  created_by_id: string;
  name: string;
  location?: string;
  date_start: Date | Timestamp;
  date_end?: Date | Timestamp;
  is_soft_deleted?: boolean;
  deleted_at?: Date | Timestamp | null;
  // additional fields may be added later
}

export interface StoredEvent extends EventData {
  id: string;
}

const eventsCollection = (firestore: Firestore) => collection(firestore, 'events');

/**
 * Create a new event document in Firestore.
 * Converts Date fields to Firestore Timestamps automatically.
 */
export async function createEvent(firestore: Firestore, data: EventData) {
  const payload: DocumentData = {
    ...data,
    date_start: data.date_start instanceof Date ? Timestamp.fromDate(data.date_start) : data.date_start,
    date_end: data.date_end instanceof Date ? Timestamp.fromDate(data.date_end as Date) : data.date_end ?? null,
    created_at: Timestamp.now(),
    is_soft_deleted: false,
    deleted_at: null,
  };

  const docRef = await addDoc(eventsCollection(firestore), payload);
  return docRef.id;
}

/**
 * Get events created by a specific user (one-time fetch).
 */
export async function getEventsByUser(firestore: Firestore, userId: string) {
  // only return events that are not soft-deleted
  const q = query(
    eventsCollection(firestore),
    where('created_by_id', '==', userId),
    where('is_soft_deleted', '==', false),
    orderBy('date_start')
  );
  const snap = await getDocs(q);
  const events: StoredEvent[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventData) }));
  return events;
}

/**
 * Listen to realtime updates of events for a user. Returns an unsubscribe function.
 */
export function subscribeToUserEvents(firestore: Firestore, userId: string, callback: (events: StoredEvent[]) => void) {
  // only subscribe to non-deleted events
  const q = query(
    eventsCollection(firestore),
    where('created_by_id', '==', userId),
    where('is_soft_deleted', '==', false),
    orderBy('date_start')
  );
  const unsub = onSnapshot(q, (snapshot) => {
    const events: StoredEvent[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as EventData) }));
    callback(events);
  });
  return unsub;
}

/**
 * Delete an event document by id.
 */
/** Soft-delete an event by setting `is_soft_deleted = true` and `deleted_at` timestamp. */
export async function deleteEvent(firestore: Firestore, eventId: string) {
  const ref = doc(firestore, 'events', eventId);
  await updateDoc(ref, { is_soft_deleted: true, deleted_at: Timestamp.now() });
}
