import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PersonalInfo from "@/models/PersonalInfo"

export async function GET() {
  try {
    await connectDB()
    let personalInfo = await PersonalInfo.findOne({})

    // Create default personal info if none exists
    if (!personalInfo) {
      personalInfo = await PersonalInfo.create({
        name: "Your Name",
        title: "MERN Stack Developer",
        bio: "Passionate full-stack developer with expertise in MongoDB, Express.js, React, and Node.js. Currently working at ts4u since March 2024.",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, Country",
        company: "ts4u",
        joinDate: new Date("2024-03-01"),
        socialLinks: {
          github: "https://github.com/yourusername",
          linkedin: "https://linkedin.com/in/yourusername",
          twitter: "https://twitter.com/yourusername",
        },
      })
    }

    return NextResponse.json({ success: true, data: personalInfo })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch personal info" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    let personalInfo = await PersonalInfo.findOne({})

    if (personalInfo) {
      personalInfo = await PersonalInfo.findByIdAndUpdate(personalInfo._id, body, { new: true })
    } else {
      personalInfo = await PersonalInfo.create(body)
    }

    return NextResponse.json({ success: true, data: personalInfo })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update personal info" }, { status: 500 })
  }
}
