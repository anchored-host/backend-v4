const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var AutoIncrement = require("mongoose-sequence")(mongoose);

const networkSchema = new Schema({
  _id: Number,
  dns: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Uknown",
  },
  __v: {
    type: Number,
    select: false,
  },
  preciselocation: {
    type: String,
    default: "Unknown",
  },
  locationid: {
    type: String,
    default: "Unknown",
  },
});

networkSchema.plugin(AutoIncrement, { inc_field: "_id" });

module.exports = mongoose.model("Network", networkSchema);
