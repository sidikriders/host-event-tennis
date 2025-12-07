import { collection, addDoc, query, where, orderBy, getDocs, onSnapshot, Timestamp } from 'firebase/firestore';
import type { Firestore, DocumentData } from 'firebase/firestore';
// import { db } from '../firebase';

export interface EventData {
  created_by_id: string;
  name: string;
  location?: string;
  date_start: Date | Timestamp;
  date_end?: Date | Timestamp;
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
  };

  const docRef = await addDoc(eventsCollection(firestore), payload);
  return docRef.id;
}

/**
 * Get events created by a specific user (one-time fetch).
 */
export async function getEventsByUser(firestore: Firestore, userId: string) {
  const q = query(eventsCollection(firestore), where('created_by_id', '==', userId), orderBy('date_start'));
  const snap = await getDocs(q);
  const events: StoredEvent[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventData) }));
  return events;
}

/**
 * Listen to realtime updates of events for a user. Returns an unsubscribe function.
 */
export function subscribeToUserEvents(firestore: Firestore, userId: string, callback: (events: StoredEvent[]) => void) {
  const q = query(eventsCollection(firestore), where('created_by_id', '==', userId), orderBy('date_start'));
  const unsub = onSnapshot(q, (snapshot) => {
    const events: StoredEvent[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as EventData) }));
    callback(events);
  });
  return unsub;
}
