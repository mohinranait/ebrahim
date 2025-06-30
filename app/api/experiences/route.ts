import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function GET() {
  try {
    await connectDB()
    const experiences = await Experience.find({}).sort({ order: 1, startDate: -1 })
    return NextResponse.json({ success: true, data: experiences })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const experience = await Experience.create(body)
    return NextResponse.json({ success: true, data: experience }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create experience" }, { status: 500 })
  }
}
