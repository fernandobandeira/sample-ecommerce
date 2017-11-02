import * as mongoose from 'mongoose'
import * as slug from 'mongoose-slug-generator'
import * as softdelete from 'mongoose-delete'

mongoose.plugin(slug)

const ProductSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: String,
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
}, { timestamps: true })

ProductSchema.plugin(softdelete, { deletedAt: true })

export default ProductSchema
