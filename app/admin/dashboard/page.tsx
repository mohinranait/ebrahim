"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Home,
  User,
  Briefcase,
  Mail,
  Settings,
  BarChart3,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApi, apiRequest } from "@/hooks/useApi";
import { adminLeftMenus } from "@/constant/data";

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

interface Skill {
  _id: string;
  name: string;
  level: number;
  category: string;
  icon: string;
}

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

interface PersonalInfo {
  _id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  joinDate: string;
  avatar: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resumeUrl?: string;
}

// Add these interfaces after existing ones
interface Experience {
  _id: string;
  company: string;
  position: string;
  type: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  teamSize?: string;
  location?: string;
}

interface Technology {
  _id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const router = useRouter();

  // Add these state variables
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(
    null
  );
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [isTechnologyDialogOpen, setIsTechnologyDialogOpen] = useState(false);

  // API calls
  const {
    data: projects,
    loading: projectsLoading,
    refetch: refetchProjects,
  } = useApi<Project[]>("/api/projects");
  const {
    data: skills,
    loading: skillsLoading,
    refetch: refetchSkills,
  } = useApi<Skill[]>("/api/skills");
  const {
    data: contacts,
    loading: contactsLoading,
    refetch: refetchContacts,
  } = useApi<Contact[]>("/api/contact");

  // Add these API calls
  const {
    data: experiences,
    loading: experiencesLoading,
    refetch: refetchExperiences,
  } = useApi<Experience[]>("/api/experiences");
  const {
    data: technologies,
    loading: technologiesLoading,
    refetch: refetchTechnologies,
  } = useApi<Technology[]>("/api/technologies");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchPersonalInfo();
    } else {
      router.push("/admin");
    }
  }, [router]);

  const fetchPersonalInfo = async () => {
    const result = await apiRequest<PersonalInfo>("/api/personal-info");
    if (result.success && result.data) {
      setPersonalInfo(result.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const handleSeedDatabase = async () => {
    const result = await apiRequest("/api/seed", { method: "POST" });
    if (result.success) {
      alert("Database seeded successfully!");
      refetchProjects();
      refetchSkills();
      fetchPersonalInfo();
    } else {
      alert("Failed to seed database");
    }
  };

  const handleAddProject = async (projectData: Omit<Project, "_id">) => {
    const result = await apiRequest("/api/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });

    if (result.success) {
      refetchProjects();
      setIsProjectDialogOpen(false);
    } else {
      alert("Failed to add project");
    }
  };

  const handleEditProject = async (projectData: Project) => {
    const result = await apiRequest(`/api/projects/${projectData._id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });

    if (result.success) {
      refetchProjects();
      setEditingProject(null);
      setIsProjectDialogOpen(false);
    } else {
      alert("Failed to update project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const result = await apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchProjects();
      } else {
        alert("Failed to delete project");
      }
    }
  };

  const handleAddSkill = async (skillData: Omit<Skill, "_id">) => {
    const result = await apiRequest("/api/skills", {
      method: "POST",
      body: JSON.stringify(skillData),
    });

    if (result.success) {
      refetchSkills();
      setIsSkillDialogOpen(false);
    } else {
      alert("Failed to add skill");
    }
  };

  const handleEditSkill = async (skillData: Skill) => {
    const result = await apiRequest(`/api/skills/${skillData._id}`, {
      method: "PUT",
      body: JSON.stringify(skillData),
    });

    if (result.success) {
      refetchSkills();
      setEditingSkill(null);
      setIsSkillDialogOpen(false);
    } else {
      alert("Failed to update skill");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const result = await apiRequest(`/api/skills/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchSkills();
      } else {
        alert("Failed to delete skill");
      }
    }
  };

  const handleUpdatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    const result = await apiRequest("/api/personal-info", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (result.success) {
      setPersonalInfo(result.data);
      alert("Personal information updated successfully!");
    } else {
      alert("Failed to update personal information");
    }
  };

  const handleMarkContactAsRead = async (id: string) => {
    const result = await apiRequest(`/api/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "read" }),
    });

    if (result.success) {
      refetchContacts();
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const result = await apiRequest(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchContacts();
      } else {
        alert("Failed to delete contact");
      }
    }
  };

  // Add these handler functions
  const handleAddExperience = async (
    experienceData: Omit<Experience, "_id">
  ) => {
    const result = await apiRequest("/api/experiences", {
      method: "POST",
      body: JSON.stringify(experienceData),
    });

    if (result.success) {
      refetchExperiences();
      setIsExperienceDialogOpen(false);
    } else {
      alert("Failed to add experience");
    }
  };

  const handleEditExperience = async (experienceData: Experience) => {
    const result = await apiRequest(`/api/experiences/${experienceData._id}`, {
      method: "PUT",
      body: JSON.stringify(experienceData),
    });

    if (result.success) {
      refetchExperiences();
      setEditingExperience(null);
      setIsExperienceDialogOpen(false);
    } else {
      alert("Failed to update experience");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      const result = await apiRequest(`/api/experiences/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchExperiences();
      } else {
        alert("Failed to delete experience");
      }
    }
  };

  const handleAddTechnology = async (
    technologyData: Omit<Technology, "_id">
  ) => {
    const result = await apiRequest("/api/technologies", {
      method: "POST",
      body: JSON.stringify(technologyData),
    });

    if (result.success) {
      refetchTechnologies();
      setIsTechnologyDialogOpen(false);
    } else {
      alert("Failed to add technology");
    }
  };

  const handleEditTechnology = async (technologyData: Technology) => {
    const result = await apiRequest(`/api/technologies/${technologyData._id}`, {
      method: "PUT",
      body: JSON.stringify(technologyData),
    });

    if (result.success) {
      refetchTechnologies();
      setEditingTechnology(null);
      setIsTechnologyDialogOpen(false);
    } else {
      alert("Failed to update technology");
    }
  };

  const handleDeleteTechnology = async (id: string) => {
    if (confirm("Are you sure you want to delete this technology?")) {
      const result = await apiRequest(`/api/technologies/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchTechnologies();
      } else {
        alert("Failed to delete technology");
      }
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-r border-white/30 dark:border-gray-700/30">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <nav className="px-4 space-y-2">
          {adminLeftMenus.map((item, index) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/20"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button
            onClick={handleSeedDatabase}
            variant="outline"
            className="w-full bg-transparent"
            size="sm"
          >
            <Database className="mr-2 h-4 w-4" />
            Seed Database
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              size="sm"
            >
              <Home className="mr-2 h-4 w-4" />
              View Site
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your portfolio content
              </p>
            </div>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            {/* Update the TabsList to include new tabs */}
            <TabsList className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Total Projects",
                    value: projects?.length || 0,
                    icon: Briefcase,
                  },
                  {
                    title: "Featured Projects",
                    value: projects?.filter((p) => p.featured).length || 0,
                    icon: Eye,
                  },
                  {
                    title: "Technologies",
                    value: projects
                      ? new Set(projects.flatMap((p) => p.technologies)).size
                      : 0,
                    icon: Settings,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-800 dark:text-white">
                              {stat.value}
                            </p>
                          </div>
                          <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Projects Management */}
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">
                        Projects
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Manage your portfolio projects
                      </CardDescription>
                    </div>
                    <Dialog
                      open={isProjectDialogOpen}
                      onOpenChange={setIsProjectDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProject
                              ? "Edit Project"
                              : "Add New Project"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingProject
                              ? "Update project details"
                              : "Create a new project for your portfolio"}
                          </DialogDescription>
                        </DialogHeader>
                        <ProjectForm
                          project={editingProject}
                          onSubmit={
                            editingProject
                              ? handleEditProject
                              : handleAddProject
                          }
                          onCancel={() => {
                            setEditingProject(null);
                            setIsProjectDialogOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="text-center py-8">Loading projects...</div>
                  ) : (
                    <div className="space-y-4">
                      {projects?.map((project) => (
                        <motion.div
                          key={project._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {project.title}
                              </h3>
                              {project.featured && (
                                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingProject(project);
                                setIsProjectDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">
                        Skills
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Manage your technical skills
                      </CardDescription>
                    </div>
                    <Dialog
                      open={isSkillDialogOpen}
                      onOpenChange={setIsSkillDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Skill
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingSkill ? "Edit Skill" : "Add New Skill"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingSkill
                              ? "Update skill details"
                              : "Add a new skill to your portfolio"}
                          </DialogDescription>
                        </DialogHeader>
                        <SkillForm
                          skill={editingSkill}
                          onSubmit={
                            editingSkill ? handleEditSkill : handleAddSkill
                          }
                          onCancel={() => {
                            setEditingSkill(null);
                            setIsSkillDialogOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {skillsLoading ? (
                    <div className="text-center py-8">Loading skills...</div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {skills?.map((skill) => (
                        <motion.div
                          key={skill._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {skill.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingSkill(skill);
                                  setIsSkillDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSkill(skill._id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {skill.category}
                            </Badge>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add these new TabsContent sections after the skills tab */}
            <TabsContent value="experience" className="space-y-6">
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">
                        Experience
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Manage your work experience
                      </CardDescription>
                    </div>
                    <Dialog
                      open={isExperienceDialogOpen}
                      onOpenChange={setIsExperienceDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingExperience
                              ? "Edit Experience"
                              : "Add New Experience"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingExperience
                              ? "Update experience details"
                              : "Add a new work experience"}
                          </DialogDescription>
                        </DialogHeader>
                        <ExperienceForm
                          experience={editingExperience}
                          onSubmit={
                            editingExperience
                              ? handleEditExperience
                              : handleAddExperience
                          }
                          onCancel={() => {
                            setEditingExperience(null);
                            setIsExperienceDialogOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {experiencesLoading ? (
                    <div className="text-center py-8">
                      Loading experiences...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {experiences?.map((experience) => (
                        <motion.div
                          key={experience._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {experience.position}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {experience.type}
                              </Badge>
                              {experience.current && (
                                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                              {experience.company}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                              {experience.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                {new Date(
                                  experience.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {experience.current
                                  ? "Present"
                                  : new Date(
                                      experience.endDate!
                                    ).toLocaleDateString()}
                              </span>
                              {experience.teamSize && (
                                <span>{experience.teamSize}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingExperience(experience);
                                setIsExperienceDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteExperience(experience._id)
                              }
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technologies" className="space-y-6">
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">
                        Technologies
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Manage available technologies for projects
                      </CardDescription>
                    </div>
                    <Dialog
                      open={isTechnologyDialogOpen}
                      onOpenChange={setIsTechnologyDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Technology
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingTechnology
                              ? "Edit Technology"
                              : "Add New Technology"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingTechnology
                              ? "Update technology details"
                              : "Add a new technology"}
                          </DialogDescription>
                        </DialogHeader>
                        <TechnologyForm
                          technology={editingTechnology}
                          onSubmit={
                            editingTechnology
                              ? handleEditTechnology
                              : handleAddTechnology
                          }
                          onCancel={() => {
                            setEditingTechnology(null);
                            setIsTechnologyDialogOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {technologiesLoading ? (
                    <div className="text-center py-8">
                      Loading technologies...
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {technologies?.map((technology) => (
                        <motion.div
                          key={technology._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {technology.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingTechnology(technology);
                                  setIsTechnologyDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteTechnology(technology._id)
                                }
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {technology.category}
                            </Badge>
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: technology.color }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {personalInfo && (
                    <PersonalInfoForm
                      personalInfo={personalInfo}
                      onSubmit={handleUpdatePersonalInfo}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">
                    Contact Messages
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Messages from your portfolio contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contactsLoading ? (
                    <div className="text-center py-8">Loading messages...</div>
                  ) : contacts && contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <motion.div
                          key={contact._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {contact.firstName} {contact.lastName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {contact.email}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  contact.status === "unread"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {contact.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleMarkContactAsRead(contact._id)
                                }
                                disabled={contact.status === "read"}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteContact(contact._id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                            {contact.subject}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {contact.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                      No messages yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

// Add these form components at the end of the file
function ExperienceForm({
  experience,
  onSubmit,
  onCancel,
}: {
  experience: Experience | null;
  onSubmit: (experience: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    company: experience?.company || "",
    position: experience?.position || "",
    type: experience?.type || "full-time",
    startDate: experience?.startDate ? experience.startDate.split("T")[0] : "",
    endDate: experience?.endDate ? experience.endDate.split("T")[0] : "",
    current: experience?.current || false,
    description: experience?.description || "",
    achievements: experience?.achievements.join("\n") || "",
    technologies: experience?.technologies.join(", ") || "",
    teamSize: experience?.teamSize || "",
    location: experience?.location || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const experienceData = {
      ...formData,
      achievements: formData.achievements.split("\n").filter((a) => a.trim()),
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((t) => t),
      startDate: new Date(formData.startDate),
      endDate: formData.current
        ? undefined
        : formData.endDate
        ? new Date(formData.endDate)
        : undefined,
      ...(experience && { _id: experience._id }),
    };
    onSubmit(experienceData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-96 overflow-y-auto"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="internship">Internship</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            disabled={formData.current}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: e.target.checked,
              endDate: e.target.checked ? "" : formData.endDate,
            })
          }
          className="rounded"
        />
        <Label htmlFor="current">Currently working here</Label>
      </div>

      <div>
        <Label htmlFor="teamSize">Team Size</Label>
        <Input
          id="teamSize"
          value={formData.teamSize}
          onChange={(e) =>
            setFormData({ ...formData, teamSize: e.target.value })
          }
          placeholder="e.g., 10-12 developers"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="achievements">Achievements (one per line)</Label>
        <Textarea
          id="achievements"
          value={formData.achievements}
          onChange={(e) =>
            setFormData({ ...formData, achievements: e.target.value })
          }
          rows={4}
          placeholder="Each achievement on a new line"
        />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) =>
            setFormData({ ...formData, technologies: e.target.value })
          }
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {experience ? "Update" : "Create"} Experience
        </Button>
      </div>
    </form>
  );
}

function TechnologyForm({
  technology,
  onSubmit,
  onCancel,
}: {
  technology: Technology | null;
  onSubmit: (technology: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: technology?.name || "",
    category: technology?.category || "frontend",
    icon: technology?.icon || "Code",
    color: technology?.color || "#3B82F6",
    description: technology?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const technologyData = {
      ...formData,
      ...(technology && { _id: technology._id }),
    };
    onSubmit(technologyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Technology Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="tools">Tools</option>
          <option value="mobile">Mobile</option>
          <option value="cloud">Cloud</option>
          <option value="testing">Testing</option>
        </select>
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            className="w-16 h-10"
          />
          <Input
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            placeholder="#3B82F6"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {technology ? "Update" : "Create"} Technology
        </Button>
      </div>
    </form>
  );
}

function PersonalInfoForm({
  personalInfo,
  onSubmit,
}: {
  personalInfo: PersonalInfo;
  onSubmit: (data: Partial<PersonalInfo>) => void;
}) {
  const [formData, setFormData] = useState({
    name: personalInfo.name || "",
    title: personalInfo.title || "",
    bio: personalInfo.bio || "",
    email: personalInfo.email || "",
    phone: personalInfo.phone || "",
    location: personalInfo.location || "",
    company: personalInfo.company || "",
    avatar: personalInfo.avatar || "👨‍💻",
    github: personalInfo.socialLinks?.github || "",
    linkedin: personalInfo.socialLinks?.linkedin || "",
    twitter: personalInfo.socialLinks?.twitter || "",
    website: personalInfo.socialLinks?.website || "",
    resumeUrl: personalInfo.resumeUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        website: formData.website,
      },
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="avatar">Avatar (Emoji)</Label>
        <Input
          id="avatar"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          placeholder="👨‍💻"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Social Links
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input
          id="resumeUrl"
          value={formData.resumeUrl}
          onChange={(e) =>
            setFormData({ ...formData, resumeUrl: e.target.value })
          }
          placeholder="https://drive.google.com/file/d/your-resume"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Update Personal Information
      </Button>
    </form>
  );
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: Project | null;
  onSubmit: (project: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    technologies: project?.technologies.join(", ") || "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((t) => t),
      ...(project && { _id: project._id }),
    };
    onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) =>
            setFormData({ ...formData, technologies: e.target.value })
          }
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div>
        <Label htmlFor="liveUrl">Live URL</Label>
        <Input
          id="liveUrl"
          value={formData.liveUrl}
          onChange={(e) =>
            setFormData({ ...formData, liveUrl: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input
          id="githubUrl"
          value={formData.githubUrl}
          onChange={(e) =>
            setFormData({ ...formData, githubUrl: e.target.value })
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
          className="rounded"
        />
        <Label htmlFor="featured">Featured Project</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {project ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  );
}

function SkillForm({
  skill,
  onSubmit,
  onCancel,
}: {
  skill: Skill | null;
  onSubmit: (skill: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    level: skill?.level || 50,
    category: skill?.category || "frontend",
    icon: skill?.icon || "Code",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillData = {
      ...formData,
      ...(skill && { _id: skill._id }),
    };
    onSubmit(skillData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Skill Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="level">Level (0-100)</Label>
        <Input
          id="level"
          type="number"
          value={formData.level}
          onChange={(e) =>
            setFormData({
              ...formData,
              level: Math.max(0, Math.min(100, Number(e.target.value))),
            })
          }
          min="0"
          max="100"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="tools">Tools</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {skill ? "Update" : "Create"} Skill
        </Button>
      </div>
    </form>
  );
}
