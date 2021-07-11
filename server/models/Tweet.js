import mongoose from 'mongoose';
const { Schema } = mongoose;

const tweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
