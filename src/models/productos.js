const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail required"],
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('productos', productSchema);