import User from '../../models/User.js';

export const getAllCustomers = async () => {
  try {
    const allUsers = await User.find({});
    return allUsers;
  } catch (error) {
    throw new Error('Error finding users');
  }
};
