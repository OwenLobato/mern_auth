import { userModel } from '../models/User.js';

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (err) {
    console.log('Error searching user', err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exists, login instead' });
  }

  const user = new userModel({ name, email, password });

  try {
    await user.save();
  } catch (err) {
    console.log('[ERROR]', err);
  }

  return res.status(201).json({ message: user });
};
