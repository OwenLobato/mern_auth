import { userModel } from '../models/User.js';
import bcrypt from 'bcrypt';

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

  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new userModel({ name, email, password: hashedPassword });

  try {
    await user.save();
  } catch (err) {
    console.log('[ERROR]', err);
  }

  return res.status(201).json({ message: user });
};
