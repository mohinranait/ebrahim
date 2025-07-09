import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=300&width=500",
    },
    status:{
      type : Boolean,
      default: true,
    },
    topPriority:{
      type : Number,
      default: 0,
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    liveUrl: {
      type: String,
      default: "#",
    },
    githubUrl: {
      type: String,
      default: "#",
    },
    featured: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
