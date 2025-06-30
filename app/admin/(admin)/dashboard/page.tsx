"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest, useApi } from "@/hooks/useApi";
import { TSkill } from "@/types/skills.type";
import SkillForm from "@/components/forms/skills-form";
import { Experience } from "@/types/exprience.type";
import { Technology } from "@/types/techonology.type";
import ExperienceForm from "@/components/forms/exprience-form";
import TechnologyForm from "@/components/forms/techonology-form";
import ProjectSectionAdmin from "@/components/common/project-section-admin";

const DashboardPage = () => {
  const {
    data: skills,
    loading: skillsLoading,
    refetch: refetchSkills,
  } = useApi<TSkill[]>("/api/skills");

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

  const [editingSkill, setEditingSkill] = useState<TSkill | null>(null);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

  // Add these state variables
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(
    null
  );
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [isTechnologyDialogOpen, setIsTechnologyDialogOpen] = useState(false);

  const handleAddSkill = async (skillData: Omit<TSkill, "_id">) => {
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

  const handleEditSkill = async (skillData: TSkill) => {
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

  return (
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
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <ProjectSectionAdmin />
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
                      onSubmit={editingSkill ? handleEditSkill : handleAddSkill}
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
                <div className="text-center py-8">Loading experiences...</div>
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
                          onClick={() => handleDeleteExperience(experience._id)}
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
                <div className="text-center py-8">Loading technologies...</div>
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
                        <Badge variant="outline" className="text-xs capitalize">
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
      </Tabs>
    </motion.div>
  );
};

export default DashboardPage;
