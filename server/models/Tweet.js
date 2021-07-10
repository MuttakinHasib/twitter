import mongoose, { Schema } from 'mongoose';

const tweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
