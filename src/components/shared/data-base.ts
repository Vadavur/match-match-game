interface UserInterfase {
  email: string;
  firstName: string;
  lastName: string;
}

export class DataBase {
  private static dbName = 'Vadavur';

  private static activateDB(
    transactionMode: IDBTransactionMode,
    storeName: string,
    keyPathName: string,
    someDBAction: (store: IDBObjectStore) => void
  ) {
    const openRequest: IDBOpenDBRequest = indexedDB.open(DataBase.dbName, 3);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      db.deleteObjectStore(storeName);
      db.createObjectStore(storeName, { keyPath: keyPathName });
      // const store = db.createObjectStore('users', { keyPath: 'email' });
      // store.createIndex('NameIndex', ['name.last', 'name.first']);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction(storeName, transactionMode);
      const store = tx.objectStore(storeName);

      someDBAction(store);

      tx.oncomplete = () => {
        db.close();
      };
    };
  }

  public static async putToDB(user: UserInterfase): Promise<void> {
    function putItemToDB(store: IDBObjectStore): void {
      const request = store.put(user);

      request.onsuccess = () => {};

      request.onerror = () => {
        console.log('Error', request.error);
      };
    }

    DataBase.activateDB('readwrite', 'users', 'email', putItemToDB);
  }

  public static getFromDB(
    keyPathName: string,
    callback: (request: IDBRequest) => void
  ): void {
    function getItemFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.get(keyPathName);

      request.onsuccess = () => {
        callback(request.result);
      };
    }
    DataBase.activateDB('readwrite', 'users', 'email', getItemFromDB);
  }

  // public static async putToDBB(user: UserInterfase): Promise<void> {
  //   const openRequest: IDBOpenDBRequest = indexedDB.open('Vadavur', 3);

  //   openRequest.onupgradeneeded = () => {
  //     const db = openRequest.result;
  //     db.deleteObjectStore('users');
  //     db.createObjectStore('users', { keyPath: 'email' });
  //     // const store = db.createObjectStore('users', { keyPath: 'email' });
  //     // store.createIndex('NameIndex', ['name.last', 'name.first']);
  //   };

  //   openRequest.onsuccess = () => {
  //     const db = openRequest.result;
  //     const tx = db.transaction('users', 'readwrite');
  //     const store = tx.objectStore('users');
  //     const request = store.put(user);

  //     request.onsuccess = () => {};

  //     request.onerror = () => {
  //       console.log('Error', request.error);
  //     };

  //     tx.oncomplete = () => {
  //       db.close();
  //     };
  //   };
  // }

  // public static getFromDBB(
  //   email: string,
  //   callback: (promisedUser: IDBRequest) => void
  // ): void {
  //   const openRequest: IDBOpenDBRequest = indexedDB.open('Vadavur', 3);

  //   openRequest.onupgradeneeded = () => {
  //     const db = openRequest.result;
  //     db.deleteObjectStore('users');
  //     db.createObjectStore('users', { keyPath: 'email' });
  //     // const store = db.createObjectStore('users', { keyPath: 'email' });
  //     // store.createIndex('NameIndex', ['name.last', 'name.first']);
  //   };

  //   openRequest.onsuccess = () => {
  //     const db = openRequest.result;
  //     const tx = db.transaction('users', 'readonly');
  //     const store = tx.objectStore('users');

  //     const promisedUser: IDBRequest = store.get(email);

  //     promisedUser.onsuccess = () => {
  //       callback(promisedUser.result);
  //     };

  //     tx.oncomplete = () => {
  //       db.close();
  //     };
  //   };
  // }
}
