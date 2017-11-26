import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-generator';
import * as softdelete from 'mongoose-delete';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    products: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true, versionKey: '_version' });

schema.plugin(softdelete, { deletedAt: true });

export default schema;
