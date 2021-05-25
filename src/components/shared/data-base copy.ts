// export class DataBase {
//   private readonly openRequest: IDBOpenDBRequest;

//   private db?: IDBDatabase;

//   constructor(name: string) {
//     this.openRequest = indexedDB.open(name, 1);
//     this.openRequest.onsuccess = (): void => {
//       this.db = this.openRequest.result;
//       this.db.createObjectStore('users', { keyPath: 'firstName' });
//     };
//   }

//   async addUserToDB(user: any): Promise<string> {
//     const transaction: IDBTransaction | undefined = this.db?.transaction(
//       'users',
//       'readwrite'
//     );
//     const users: IDBObjectStore | undefined = transaction?.objectStore('users');
//     const request: IDBRequest<IDBValidKey> | undefined = users?.add(user);

//     if (request) {
//       request.onsuccess = function () {
//         alert('BINGO!!!');
//       };
//     }
//     return 'ddd';
//   }
// }
