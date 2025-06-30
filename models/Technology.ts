import mongoose from "mongoose"

const TechnologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database", "tools", "mobile", "cloud", "testing"],
    },
    icon: {
      type: String,
      default: "Code",
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema)
