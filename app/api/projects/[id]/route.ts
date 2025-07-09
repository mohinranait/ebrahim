import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findById(params.id)
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    console.log({body});
    
    const project = await Project.findByIdAndUpdate(params.id, body, { new: true })
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findByIdAndDelete(params.id)
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  }
}
