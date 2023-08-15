const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let SchemaTypes = Schema.Types;

const ReportSchema = new Schema(
  {
    reason: {
      type: SchemaTypes.String,
      required: true,
    },
    reported_by_user: {
      type: SchemaTypes.ObjectId,
      ref: "Users",
      required: true,
    },
    reported_user: {
      type: SchemaTypes.ObjectId,
      ref: "Users",
      required: true,
    },
    post: {
      type: SchemaTypes.ObjectId,
      ref: "Posts",
    },
    comment: {
      type: SchemaTypes.ObjectId,
      ref: "Comments",
    },
    is_done: {
      type: SchemaTypes.Boolean,
      default: false,
      required: true,
    },
    notes_from_us: {
      type: SchemaTypes.String,
    },
    last_update_from_user: {
      type: SchemaTypes.ObjectId,
    },
  },
  { collection: "Reports", timestamps: true },
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
