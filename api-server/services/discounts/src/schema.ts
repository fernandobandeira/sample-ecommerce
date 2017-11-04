import * as mongoose from 'mongoose';
import * as softdelete from 'mongoose-delete';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Date,
      default: Date.now(),
    },
    end: {
      type: Date,
    },
    percentage: {
      type: Number,
      required: true,
      max: 100,
      min: 0,
    },
  },
  { timestamps: true, versionKey: '_version' });

schema.plugin(softdelete, { deletedAt: true });

export default schema;
