import mongoose from "mongoose"

const PersonalInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    company: {
      type: String,
    },
    joinDate: {
      type: Date,
    },
    avatar: {
      type: String,
      default: "👨‍💻",
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    resumeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.PersonalInfo || mongoose.model("PersonalInfo", PersonalInfoSchema)
