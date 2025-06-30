import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function GET() {
  try {
    await connectDB()
    const technologies = await Technology.find({}).sort({ order: 1, name: 1 })
    return NextResponse.json({ success: true, data: technologies })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch technologies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const technology = await Technology.create(body)
    return NextResponse.json({ success: true, data: technology }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create technology" }, { status: 500 })
  }
}
