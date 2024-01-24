import mongoose, { Schema } from 'mongoose';
import { isEmail, isURL } from 'validator';
import bcrypt from 'bcrypt';
import { DEFAULT_USER_NAME, DEFAULT_USER_AVATAR, DEFAULT_USER_ABOUT } from '../utils/constants'


interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
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
    select: false
  },
});

userSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(email: string, password: string) {
    const user: IUser | null = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new Error('Неверная почта или пароль'))
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return Promise.reject(new Error('Неверная почта или пароль'))
    }
    return user;
  }
);

export default mongoose.model<IUser, UserModel>('user', userSchema);
