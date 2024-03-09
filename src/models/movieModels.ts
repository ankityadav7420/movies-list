// models/Movie.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Movie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  streamingLink: {
    type: String,
    required: true
  },
});

export default mongoose.model<Movie>('Movie', movieSchema);
