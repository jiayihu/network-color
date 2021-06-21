import { FirebaseFirestore, getFirestore } from 'firebase/firestore';

let db: FirebaseFirestore | null = null;

export function getDb() {
  if (!db) db = getFirestore();

  return db;
}
