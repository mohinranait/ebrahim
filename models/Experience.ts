import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["internship", "full-time", "part-time", "contract", "freelance"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    achievements: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
      },
    ],
    teamSize: {
      type: String,
    },
    location: {
      type: String,
    },
    companyWebsite: {
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

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema)
