import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Skill from "@/models/Skill"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const skill = await Skill.findByIdAndUpdate(params.id, body, { new: true })
    if (!skill) {
      return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: skill })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const skill = await Skill.findByIdAndDelete(params.id)
    if (!skill) {
      return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Skill deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete skill" }, { status: 500 })
  }
}
