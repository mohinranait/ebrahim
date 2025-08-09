"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Code,
  Database,
  Server,
  Smartphone,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  User,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useApi, apiRequest } from "@/hooks/useApi";
import { Navbar } from "@/components/shared/Navbar";
import { AboutSection } from "@/components/sections/about-section";
import { PersonalInfo } from "@/types/personal.type";
import ExperienceSection from "@/components/sections/experience-section";
import { Projects } from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";
import Image from "next/image";
import { TSkill } from "@/types/skills.type";
import { cn } from "@/lib/utils";

const iconMap: { [key: string]: any } = {
  Code,
  Server,
  Database,
  Smartphone,
};

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

// Add these interfaces after the existing ones

interface Technology {
  _id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // API calls
  const { data: projects, loading: projectsLoading } =
    useApi<Project[]>("/api/projects");
  const { data: skills, loading: skillsLoading } =
    useApi<TSkill[]>("/api/skills");
  const { data: personalInfo, loading: personalInfoLoading } =
    useApi<PersonalInfo>("/api/personal-info");

  const { data: technologies, loading: technologiesLoading } =
    useApi<Technology[]>("/api/technologies");

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  if (!mounted) return null;

  const allProjects = projects || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <Navbar />

      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />

        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                {personalInfo?.title?.split(" ")[0] || "MERN"}
              </span>
              <br />
              <span className="text-white">
                {" "}
                {personalInfo?.title?.split(" ").slice(1).join(" ") ||
                  "Developer"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {personalInfo?.bio || "Loading..."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href={"/cv"} target="_blank">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  MY CV
                </Button>
              </Link>
              <Link href={`${personalInfo?.resumeUrl}`} target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Download CV
                </Button>
              </Link>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                {
                  icon: Github,
                  href: personalInfo?.socialLinks?.github || "#",
                },
                {
                  icon: Linkedin,
                  href: personalInfo?.socialLinks?.linkedin || "#",
                },
                {
                  icon: Mail,
                  href: `mailto:${
                    personalInfo?.email || "your.email@example.com"
                  }`,
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                >
                  <social.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown className="h-6 w-6 text-white/60" />
          </motion.div>
        </div>
      </section>

      <AboutSection personalInfo={personalInfo} />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {skillsLoading ? (
            <div className="text-center">Loading skills...</div>
          ) : (
            <div className="grid grid-cols-4 justify-center  gap-2">
              {skills?.map((skill, index) => {
                const IconComponent =
                  (!skill?.image && iconMap[skill.icon]) || Code;
                return (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-white/20 !pr-2 p-0 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300">
                      <CardContent className="p-0 flex gap-2 items-center text-center">
                        <div className="">
                          <div className="w-[60px]  h-[60px] flex items-center justify-center ">
                            {skill?.image ? (
                              <Image
                                src={skill?.image}
                                width={50}
                                height={50}
                                alt={skill?.name}
                                className={cn(
                                  "w-[50px] h-[50px] rounded-md p-[2px] ring-1 ring-purple-400",
                                  skill?.color && `ring-[${skill?.color}]`
                                )}
                              />
                            ) : (
                              <span className="w-[50px] h-[50px] rounded-md p-[2px] ring-1 ring-purple-400 flex items-center justify-center">
                                <IconComponent className="  text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base text-left font-semibold text-white">
                            {skill.name}
                          </h3>
                          <p className="text-sm  capitalize text-gray-400">
                            For: {skill.category}
                          </p>
                          {/* <span className="text-sm text-gray-600 dark:text-gray-300">
                            {skill.level}%
                          </span> */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Projects />

      {/* Contact Section */}
      <ContactSection personalInfo={personalInfo} />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 {personalInfo?.name || "Portfolio"}. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
