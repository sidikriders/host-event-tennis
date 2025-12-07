import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import type { Firestore, DocumentData, Unsubscribe } from 'firebase/firestore';

export interface PlayerData {
  created_by_id: string;
  name: string;
  gender: 'M' | 'F';
  present?: boolean;
  is_soft_deleted?: boolean;
  created_at?: Date | Timestamp;
}

export interface StoredPlayer extends PlayerData {
  id: string;
}

export interface EventPlayerData {
  player_id?: string | null;
  name: string;
  gender: 'M' | 'F';
  present: boolean;
  added_by: string;
  added_at: Timestamp;
  is_soft_deleted?: boolean;
}

export interface StoredEventPlayer extends EventPlayerData {
  id: string;
}

const playersCollection = (firestore: Firestore) => collection(firestore, 'players');

/** Create a global player document (reusable across events). */
export async function createPlayer(firestore: Firestore, data: PlayerData) {
  const payload: DocumentData = {
    ...data,
    present: data.present ?? false,
    is_soft_deleted: data.is_soft_deleted ?? false,
    created_at: data.created_at instanceof Date ? Timestamp.fromDate(data.created_at) : Timestamp.now(),
  };
  const docRef = await addDoc(playersCollection(firestore), payload);
  return docRef.id;
}

/** Get players created by a user (not soft-deleted). */
export async function getPlayersByUser(firestore: Firestore, userId: string) {
  const q = query(playersCollection(firestore), where('created_by_id', '==', userId), where('is_soft_deleted', '==', false), orderBy('name'));
  const snap = await getDocs(q);
  const items: StoredPlayer[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as PlayerData) }));
  return items;
}

/** Add an existing player to an event by creating a document under events/{eventId}/players.
 * This stores a reference to the player and a snapshot of player fields for convenience.
 */
export async function addPlayerToEvent(firestore: Firestore, eventId: string, player: StoredPlayer | { id?: string; name: string; gender: 'M' | 'F'; present?: boolean }, addedBy: string) {
  const ref = collection(firestore, 'events', eventId, 'players');
  const payload: DocumentData = {
    player_id: (player as any).id ?? null,
    name: player.name,
    gender: player.gender,
    present: player.present ?? false,
    added_by: addedBy,
    added_at: Timestamp.now(),
    is_soft_deleted: false,
  };
  const docRef = await addDoc(ref, payload);
  return docRef.id;
}

/** Optionally create an event-player doc with a specific ID (not used yet). */
export async function setEventPlayerDoc(firestore: Firestore, eventId: string, docId: string, data: DocumentData) {
  const ref = doc(firestore, 'events', eventId, 'players', docId);
  await setDoc(ref, data);
}

/** Subscribe to players under events/{eventId}/players (not soft-deleted). Returns an unsubscribe function. */
export function subscribeToEventPlayers(
  firestore: Firestore,
  eventId: string,
  cb: (items: StoredEventPlayer[]) => void
): Unsubscribe {
  const ref = collection(firestore, 'events', eventId, 'players');
  const q = query(ref, where('is_soft_deleted', '==', false), orderBy('name'));
  const unsub = onSnapshot(q, (snap) => {
    const items: StoredEventPlayer[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventPlayerData) }));
    cb(items);
  });
  return unsub;
}

/** Toggle or set the `present` flag for an event-player document. */
export async function setEventPlayerPresent(firestore: Firestore, eventId: string, eventPlayerId: string, present: boolean) {
  const ref = doc(firestore, 'events', eventId, 'players', eventPlayerId);
  await updateDoc(ref, { present });
}
