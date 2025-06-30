import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import Skill from "@/models/Skill"
import PersonalInfo from "@/models/PersonalInfo"
import Experience from "@/models/Experience"
import Technology from "@/models/Technology"

export async function POST() {
  try {
    await connectDB()

    // Seed Skills
    const skillsData = [
      { name: "React.js", level: 95, category: "frontend", icon: "Code", order: 1 },
      { name: "Node.js", level: 90, category: "backend", icon: "Server", order: 2 },
      { name: "MongoDB", level: 85, category: "database", icon: "Database", order: 3 },
      { name: "Express.js", level: 88, category: "backend", icon: "Server", order: 4 },
      { name: "TypeScript", level: 82, category: "frontend", icon: "Code", order: 5 },
      { name: "Next.js", level: 88, category: "frontend", icon: "Code", order: 6 },
      { name: "React Native", level: 75, category: "mobile", icon: "Smartphone", order: 7 },
      { name: "PostgreSQL", level: 80, category: "database", icon: "Database", order: 8 },
    ]

    await Skill.deleteMany({})
    await Skill.insertMany(skillsData)

    // Seed Projects
    const projectsData = [
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        order: 1,
      },
      {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates using Socket.io and React.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        order: 2,
      },
      {
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management with data visualization and reporting features.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["Next.js", "TypeScript", "Chart.js", "MongoDB"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        order: 3,
      },
    ]

    await Project.deleteMany({})
    await Project.insertMany(projectsData)

    // Seed Personal Info
    const personalInfoData = {
      name: "Your Name",
      title: "MERN Stack Developer",
      bio: "Passionate full-stack developer with expertise in MongoDB, Express.js, React, and Node.js. Currently working at ts4u since March 2024.",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "Your City, Country",
      company: "ts4u",
      joinDate: new Date("2024-03-01"),
      avatar: "👨‍💻",
      socialLinks: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
      },
    }

    await PersonalInfo.deleteMany({})
    await PersonalInfo.create(personalInfoData)

    // Seed Experiences
    const experiencesData = [
      {
        company: "ts4u",
        position: "MERN Stack Developer Intern",
        type: "internship",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-09-01"),
        current: false,
        description:
          "Started my journey as a MERN stack developer intern, learning and contributing to various web development projects.",
        achievements: [
          "Learned full-stack development with MERN stack",
          "Contributed to multiple client projects",
          "Gained experience in modern web technologies",
          "Worked in an agile development environment",
        ],
        technologies: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
        teamSize: "5-8 developers",
        location: "Remote",
        order: 2,
      },
      {
        company: "sdb it",
        position: "Full Stack Developer",
        type: "full-time",
        startDate: new Date("2024-09-01"),
        current: true,
        description:
          "Working as a full-time MERN stack developer, collaborating with a team of 10-12 developers on various enterprise projects.",
        achievements: [
          "Contributing to large-scale web applications",
          "Collaborating with 10-12 developers in cross-functional teams",
          "Implementing modern development practices",
          "Mentoring junior developers",
          "Leading feature development initiatives",
        ],
        technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Express.js"],
        teamSize: "10-12 developers",
        location: "Remote",
        order: 1,
      },
    ]

    await Experience.deleteMany({})
    await Experience.insertMany(experiencesData)

    // Seed Technologies
    const technologiesData = [
      { name: "React", category: "frontend", icon: "Code", color: "#61DAFB", order: 1 },
      { name: "Next.js", category: "frontend", icon: "Code", color: "#000000", order: 2 },
      { name: "TypeScript", category: "frontend", icon: "Code", color: "#3178C6", order: 3 },
      { name: "JavaScript", category: "frontend", icon: "Code", color: "#F7DF1E", order: 4 },
      { name: "Node.js", category: "backend", icon: "Server", color: "#339933", order: 5 },
      { name: "Express.js", category: "backend", icon: "Server", color: "#000000", order: 6 },
      { name: "MongoDB", category: "database", icon: "Database", color: "#47A248", order: 7 },
      { name: "PostgreSQL", category: "database", icon: "Database", color: "#336791", order: 8 },
      { name: "React Native", category: "mobile", icon: "Smartphone", color: "#61DAFB", order: 9 },
      { name: "Tailwind CSS", category: "frontend", icon: "Code", color: "#06B6D4", order: 10 },
    ]

    await Technology.deleteMany({})
    await Technology.insertMany(technologiesData)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        skills: skillsData.length,
        projects: projectsData.length,
        experiences: experiencesData.length,
        technologies: technologiesData.length,
        personalInfo: 1,
      },
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
