"use client";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  Award,
  Code,
  Database,
  Palette,
  Server,
  PanelTopClose,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import { PersonalInfo } from "@/types/personal.type";
import Link from "next/link";

export default function CVPage() {
  const { data: personalInfo, loading: personalInfoLoading } =
    useApi<PersonalInfo>("/api/personal-info");
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
              <Image
                src={"/ebrahim.png"}
                width={150}
                height={150}
                alt="Ebrahim"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Md. Ebrahim
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-950 mb-4">
                Full Stack Web Developer
              </h2>
              <div className="flex flex-wrap justify-center text-gray-700 md:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>ebrahimit49@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+8801728068200</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Professional Summary */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-black gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Passionate Full Stack Web Developer with 1.5+ years of
                    hands-on experience in building responsive, user-friendly
                    web applications. Proficient in modern JavaScript
                    frameworks, backend technologies, and database management.
                    Strong problem-solving skills with a keen eye for detail and
                    commitment to delivering high-quality code.
                  </p>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-black gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Web Developer</h3>
                        <p className="text-blue-600 font-medium">SDB IT</p>
                      </div>
                      <Badge variant="secondary">March 2023 - Present</Badge>
                    </div>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Developed and maintained responsive web applications
                        using React.js and Next.js
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Built RESTful APIs using Node.js and Express.js
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Implemented database solutions using MongoDB and MySQL
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Collaborated with cross-functional teams using Agile
                        methodologies
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-black gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    Key Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      E-commerce Platform
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Full-stack e-commerce solution with user authentication,
                      product management, shopping cart, and payment
                      integration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-black text-white">React.js</Badge>
                      <Badge className="bg-black text-white">Node.js</Badge>
                      <Badge className="bg-black text-white">MongoDB</Badge>
                      <Badge className="bg-black text-white">Stripe API</Badge>
                    </div>
                  </div>

                  <Separator className="border-gray-200 bg-gray-200" />

                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      Task Management System
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Collaborative project management tool with real-time
                      updates, team collaboration features, and progress
                      tracking.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-black text-white">Next.js</Badge>
                      <Badge className="bg-black text-white">TypeScript</Badge>
                      <Badge className="bg-black text-white">PostgreSQL</Badge>
                      <Badge className="bg-black text-white">Socket.io</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-black gap-2">
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <Link href={"https://ebrahim-beta.vercel.app"}>
                      <span className="text-sm text-gray-900">
                        ebrahim-beta.vercel.app
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-blue-600" />
                    <Link href={`${personalInfo?.socialLinks?.github}`}>
                      <span className="text-sm text-gray-900">Github</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <Link href={`${personalInfo?.socialLinks?.linkedin}`}>
                      <span className="text-sm text-gray-900">Linkedin</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Skills */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-black gap-2 text-lg">
                    <Code className="w-5 h-5 text-blue-600" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-gray-900">
                        HTML5
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        CSS3
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        JavaScript
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Redux / Redux Toolkit
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        React.js
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Next.js
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Tailwind CSS
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-gray-900">
                        Node.js
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Express.js
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        PHP
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Database
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-gray-900">
                        MongoDB
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        MySQL
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <PanelTopClose className="w-4 h-4" />
                      Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-gray-900">
                        VS Code
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        GitHub
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Git
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        Figma
                      </Badge>
                      <Badge variant="outline" className="text-gray-900">
                        SCSS
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg text-black">
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-900">বাংলা</span>
                    <Badge className="bg-black text-white">Native</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">English</span>
                    <Badge className="bg-black text-white">Fluent</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
