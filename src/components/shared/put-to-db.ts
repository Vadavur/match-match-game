export function putToDB(user: {
  eMail: string;
  name: { first: string; last: string };
}): void {
  const openRequest: IDBOpenDBRequest = indexedDB.open('usersDatabase', 1);

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    const store = db.createObjectStore('users', { keyPath: 'eMail' });
    store.createIndex('NameIndex', ['name.last', 'name.first']);
  };

  openRequest.onsuccess = () => {
    const db = openRequest.result;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    store.index('NameIndex');

    store.put(user);

    tx.oncomplete = () => {
      db.close();
    };
  };
}
