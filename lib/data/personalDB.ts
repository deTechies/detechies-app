"use client"
import { openDB } from 'idb';

const DB_NAME = 'nextAuthDatabase';
const STORE_NAME = 'sessionStore';

const setupDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    }
  });
  return db;
};

export const saveToIDB = async (key: string, val: any) => {
  const db = await setupDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(val, key);
  await tx.done;
};

export const getFromIDB = async (key: string) => {
  const db = await setupDB();
  return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(key);
};

export const deleteFromIDB = async (key: string) => {
  const db = await setupDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).delete(key);
  await tx.done;
};
