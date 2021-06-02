import { IndexedDataType } from './interfaces';
import { DATABASES } from './constants';

export class DataBase {
  private static dbName = 'Vadavur';

  private static dbVersion = 1;

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
      Object.entries(DATABASES).forEach((database) => {
        if (db.objectStoreNames.contains(database[1].name)) {
          db.deleteObjectStore(database[1].name);
        }
        db.createObjectStore(database[1].name, {
          keyPath: database[1].keyPath,
        });
      });
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
    openRequest.onerror = () => {};
  }

  public static async putToDB(
    item: IndexedDataType,
    storeName: string,
    keyPathName: string
  ): Promise<void> {
    function putItemToDB(store: IDBObjectStore): void {
      const request = store.put(item);

      request.onsuccess = () => {};

      request.onerror = () => {};
    }

    DataBase.activateDB('readwrite', storeName, keyPathName, putItemToDB);
  }

  public static getFromDB(
    keyValue: string,
    storeName: string,
    keyPathName: string,
    callback: (request: IndexedDataType | null) => void
  ): void {
    function getItemFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.get(keyValue);

      request.onsuccess = () => {
        callback(request.result);
      };
      request.onerror = () => {
        try {
          throw new Error();
        } catch {
          callback(null);
        }
      };
    }
    DataBase.activateDB('readwrite', storeName, keyPathName, getItemFromDB);
  }

  public static getAllFromDB(
    storeName: string,
    keyPathName: string,
    callback: (user: IndexedDataType[]) => void
  ): void {
    function getAllItemsFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.getAll();

      request.onsuccess = () => {
        callback(request.result);
      };
      request.onerror = () => {};
    }
    DataBase.activateDB('readwrite', storeName, keyPathName, getAllItemsFromDB);
  }

  public static clearDB(
    storeName: string,
    keyPathName: string,
    callback: (user: IndexedDataType[]) => void
  ): void {
    function removeAllItemsFromDB(store: IDBObjectStore) {
      const request: IDBRequest = store.clear();

      request.onsuccess = () => {
        callback(request.result);
      };
      request.onerror = () => {};
    }
    DataBase.activateDB(
      'readwrite',
      storeName,
      keyPathName,
      removeAllItemsFromDB
    );
  }
}
