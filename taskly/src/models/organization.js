const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
