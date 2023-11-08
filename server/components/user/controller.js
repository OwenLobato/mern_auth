import { getAllCustomers } from './store.js';

export const getPrivateData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await getAllCustomers();

      resolve(allUsers);
    } catch (err) {
      reject(err);
    }
  });
};
