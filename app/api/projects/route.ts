import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

export async function GET(request: NextRequest, ) {
  try {
    
    await connectDB()
    const accessBy = request.nextUrl.searchParams.get('accessBy') || "user"
    let query: any =  {}
    if(accessBy === 'user') {
      query.status = true
    }
    const projects = await Project.find(query).sort({  topPriority: -1 })
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const project = await Project.create(body)
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
