import { request } from '../utils/requests';

const useUsers = (headers) => {
  const getUsers = async () => {
    return await request('GET', `/users`, headers);
  };

  return {
    getUsers,
  };
};

export default useUsers;
