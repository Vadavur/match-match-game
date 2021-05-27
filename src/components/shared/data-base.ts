import { IndexedDataType } from './interfaces';
import { DATABASES } from './constants';

export class DataBase {
  private static dbName = 'Vadavur';

  private static dbVersion = 8;

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
    openRequest.onerror = () => {
      console.log('Error', openRequest.error);
    };
  }

  public static async putToDB(
    item: IndexedDataType,
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
    callback: (request: IndexedDataType) => void
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
    callback: (request: IndexedDataType) => void
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
    callback: (user: IndexedDataType[]) => void
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
