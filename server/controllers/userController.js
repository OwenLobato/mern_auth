import { userModel } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'User not found. Signup' });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid email/password' });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '35s',
  });

  console.log('Generated token', token);
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = '';
  }

  res.cookie(String(existingUser._id), token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: 'lax',
  });

  return res
    .status(200)
    .json({ message: 'Successfully logged in', user: existingUser, token });
};

export const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res
      .status(400)
      .json({ message: 'Invalid cookies, refresh your token' });
  }
  const token = cookies.split('=')[1];
  console.log(token);

  if (!token) {
    return res.status(400).json({ message: 'No token found' });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

export const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await userModel.findById(userId, '-password');
  } catch (err) {
    return new Error(err);
  }

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
};

export const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res
      .status(400)
      .json({ message: 'Invalid cookies, refresh your token' });
  }

  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: 'No current token found' });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '35s',
    });

    console.log('Regenerated token', token);

    res.cookie(String(user.id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: 'lax',
    });
    req.id = user.id;

    next();
  });
};
