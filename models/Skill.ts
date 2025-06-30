import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database", "tools", "mobile"],
    },
    icon: {
      type: String,
      default: "Code",
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

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema)
