import mongoose from "mongoose";

const GraphDataSchema = new mongoose.Schema(
  {
    months: {
      type: [String],
      required: true,
    },
    sales: {
      type: [Number],
      required: true,
    },
    charts: {
      type: [String],
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GraphData = mongoose.model("GraphData", GraphDataSchema);
export default GraphData;
