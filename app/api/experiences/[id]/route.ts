import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const experience = await Experience.findByIdAndUpdate(params.id, body, { new: true })
    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const experience = await Experience.findByIdAndDelete(params.id)
    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Experience deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete experience" }, { status: 500 })
  }
}
