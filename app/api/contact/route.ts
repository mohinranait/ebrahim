import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: contacts })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const contact = await Contact.create(body)
    return NextResponse.json({ success: true, data: contact }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create contact" }, { status: 500 })
  }
}
