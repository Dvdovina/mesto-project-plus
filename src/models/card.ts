import mongoose, { ObjectId, Schema } from 'mongoose';
import { isValidUrl } from '../utils/validation';

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) =>
        isValidUrl(url),
      message: 'Неправильная ссылка'
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ICard>('card', cardSchema);
