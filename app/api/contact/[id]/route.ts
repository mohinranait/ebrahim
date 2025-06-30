import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const contact = await Contact.findByIdAndUpdate(params.id, body, { new: true })
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: contact })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update contact" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const contact = await Contact.findByIdAndDelete(params.id)
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Contact deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 })
  }
}
