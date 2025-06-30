import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Skill from "@/models/Skill"

export async function GET() {
  try {
    await connectDB()
    const skills = await Skill.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json({ success: true, data: skills })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const skill = await Skill.create(body)
    return NextResponse.json({ success: true, data: skill }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create skill" }, { status: 500 })
  }
}
