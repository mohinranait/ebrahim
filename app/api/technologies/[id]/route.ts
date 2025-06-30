import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const technology = await Technology.findByIdAndUpdate(params.id, body, { new: true })
    if (!technology) {
      return NextResponse.json({ success: false, error: "Technology not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: technology })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update technology" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const technology = await Technology.findByIdAndDelete(params.id)
    if (!technology) {
      return NextResponse.json({ success: false, error: "Technology not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Technology deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete technology" }, { status: 500 })
  }
}
