import dayjs from 'dayjs';

type WithToDate = { toDate: () => Date };

export function toDate(value: unknown): Date | null {
  if (value == null) return null;
  if ((value as WithToDate)?.toDate && typeof (value as WithToDate).toDate === 'function') {
    return (value as WithToDate).toDate();
  }
  if (value instanceof Date) return value;
  const d = new Date(String(value));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Format a value (Firestore Timestamp, Date, or parsable string) with optional dayjs-like format.
 * If `fmt` is provided, `dayjs` is used to format; otherwise falls back to `toLocaleString()`.
 */
export function formatDate(value: unknown, fmt?: string): string {
  const dt = toDate(value);
  if (!dt) return String(value ?? '');
  if (fmt) return dayjs(dt).format(fmt);
  return dt.toLocaleString();
}
