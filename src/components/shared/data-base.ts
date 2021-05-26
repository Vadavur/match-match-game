import { UserInterface, TogglerInterface } from './interfaces';

export class DataBase {
  private static dbName = 'Vadavur';

  private static dbVersion = 4;

  private static activateDB(
    transactionMode: IDBTransactionMode,
    storeName: string,
    keyPathName: string,
    someDBAction: (store: IDBObjectStore) => void
  ) {
    const openRequest: IDBOpenDBRequest = indexedDB.open(
      DataBase.dbName,
      DataBase.dbVersion
    );

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
    openRequest.onerror = () => {
      console.log('Error', openRequest.error);
    };
  }

  public static async putToDB(
    item: UserInterface | TogglerInterface,
    storeName: string,
    keyPathName: string
  ): Promise<void> {
    function putItemToDB(store: IDBObjectStore): void {
      const request = store.put(item);

      request.onsuccess = () => {};

      request.onerror = () => {
        console.log('Error', request.error);
      };
    }

    DataBase.activateDB('readwrite', storeName, keyPathName, putItemToDB);
  }

  public static getFromDB(
    keyValue: string,
    storeName: string,
    keyPathName: string,
    callback: (request: UserInterface | TogglerInterface) => void
  ): void {
    function getItemFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.get(keyValue);

      request.onsuccess = () => {
        callback(request.result);
      };
      request.onerror = () => {
        console.log('Error', request.error);
      };
    }
    DataBase.activateDB('readwrite', storeName, keyPathName, getItemFromDB);
  }

  public static async forEachItemInDB(
    storeName: string,
    keyPathName: string,
    callback: (request: UserInterface) => void
  ): Promise<void> {
    function setCallbackToCursor(store: IDBObjectStore) {
      const request: IDBRequest = store.openCursor();

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          callback(cursor.value);
          cursor.continue();
        }
      };
      request.onerror = () => {
        console.log('Error', request.error);
      };
    }
    DataBase.activateDB(
      'readwrite',
      storeName,
      keyPathName,
      setCallbackToCursor
    );
  }

  public static getAllFromDB(
    storeName: string,
    keyPathName: string,
    callback: (user: UserInterface[]) => void
  ): void {
    function getAllItemsFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.getAll();

      request.onsuccess = () => {
        callback(request.result);
      };
      request.onerror = () => {
        console.log('Error', request.error);
      };
    }
    DataBase.activateDB('readwrite', storeName, keyPathName, getAllItemsFromDB);
  }
}
