// Interfaces
// @ts-ignore
import { Requests, DBTables } from 'swapcast-types';
import { Connection } from 'mysql';

const getUser = ({ username }: {[key: string]: DBTables.User.username}, connection: Connection) => {
  return new Promise((resolve, reject) => {
    let result:DBTables.User|null = null;
    const queryString = `
    SELECT Users.*
    FROM Users
    WHERE Users.Username = '${username}'
  `;

    const query = connection.query(queryString);
    query.on('result', (row: DBTables.User) => {
      result = row;
    }).on('end', () => {
      resolve(result);
    });
  });
};

export {
  getUser,
};