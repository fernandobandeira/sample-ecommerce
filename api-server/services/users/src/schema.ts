import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-generator';
import * as softdelete from 'mongoose-delete';
import * as argon2 from 'argon2';

mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: '_version' });

schema.plugin(softdelete, { deletedAt: true });
schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  argon2.hash(this.password)
    .then((hash) => {
      this.password = hash;
      next();
    });
});

export default schema;
