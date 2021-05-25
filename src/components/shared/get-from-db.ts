export function getFromDB(
  eMail: string,
  func: (promisedUser: IDBRequest) => void
): void {
  const openRequest: IDBOpenDBRequest = indexedDB.open('Vadavur', 1);

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    const store = db.createObjectStore('users', { keyPath: 'eMail' });
    store.createIndex('NameIndex', ['name.last', 'name.first']);
  };

  openRequest.onsuccess = () => {
    const db = openRequest.result;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');

    const promisedUser: IDBRequest = store.get(eMail);

    promisedUser.onsuccess = () => {
      func(promisedUser.result);
    };

    tx.oncomplete = () => {
      db.close();
    };
  };
}
