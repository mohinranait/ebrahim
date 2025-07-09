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
      enum: ["frontend", "backend", "database", "tools",'package', "mobile", "cloud", "testing"],
    },
    icon: {
      type: String,
      default: "Code",
    },
    color: {
      type : String,
       default: "#3B82F6",
    },
    image: {
      type: String,
    },
    status: {
      type: Boolean,
      default:false
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
