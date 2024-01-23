import mongoose, { Schema } from 'mongoose';
import { isEmail, isURL } from 'validator';
import { DEFAULT_USER_NAME, DEFAULT_USER_AVATAR, DEFAULT_USER_ABOUT } from '../utils/constants'

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_NAME
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: DEFAULT_USER_ABOUT
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
    validate: {
      validator: (url: string) => isURL(url),
      message: 'Неправильная ссылка'
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: 'Неправильный e-mail'
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);
