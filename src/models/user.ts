import mongoose, { Schema } from 'mongoose';
import validator, {isEmail, isURL} from 'validator';

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
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true
  },
  avatar: {
    type: String,
    required: true,
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
