export class DataBase {
  public static async putToDB(user: {
    email: string;
    name: { first: string; last: string };
  }): Promise<void> {
    const openRequest: IDBOpenDBRequest = indexedDB.open('Vadavur', 2);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      db.deleteObjectStore('users');
      const store = db.createObjectStore('users', { keyPath: 'email' });
      // store.createIndex('NameIndex', ['name.last', 'name.first']);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const request = store.put(user);

      request.onsuccess = () => {};

      request.onerror = () => {
        console.log('Error', request.error);
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  }

  public static getFromDB(
    email: string,
    callback: (promisedUser: IDBRequest) => void
  ): void {
    const openRequest: IDBOpenDBRequest = indexedDB.open('Vadavur', 2);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      db.deleteObjectStore('users');
      const store = db.createObjectStore('users', { keyPath: 'email' });
      // store.createIndex('NameIndex', ['name.last', 'name.first']);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');

      const promisedUser: IDBRequest = store.get(email);

      promisedUser.onsuccess = () => {
        callback(promisedUser.result);
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  }
}
