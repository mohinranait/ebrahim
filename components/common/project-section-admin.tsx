import { apiRequest, useApi } from "@/hooks/useApi";
import { TProject } from "@/types/project.type";
import { Briefcase, Edit, Eye, Plus, Settings, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import ProjectForm from "../forms/project-form";
import { Badge } from "../ui/badge";
import Image from "next/image";

const ProjectSectionAdmin = () => {
  // API calls
  const {
    data: projects,
    loading: projectsLoading,
    refetch: refetchProjects,
  } = useApi<TProject[]>("/api/projects?accessBy=admin");

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<TProject | null>(null);
  console.log({ projects });

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

  const handleAddProject = async (projectData: Omit<TProject, "_id">) => {
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

  const handleEditProject = async (projectData: TProject) => {
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

  return (
    <>
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
                  <stat.icon className="h-8 w-8 text-white" />
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
            <Button
              onClick={() => setIsProjectDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
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
                  className="flex gap-4 justify-between p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                >
                  <div className="w-[200px] max-h-[150px]">
                    <Image
                      src={project?.image}
                      width={200}
                      height={200}
                      alt="image"
                      className="rounded-md max-h-[130px] object-cover"
                    />
                  </div>
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
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant={project.status ? "default" : "destructive"}>
                      {project?.status ? "Active" : "Pending"}
                    </Badge>
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

      <ProjectForm
        project={editingProject}
        onSubmit={editingProject ? handleEditProject : handleAddProject}
        onCancel={() => {
          setEditingProject(null);
          setIsProjectDialogOpen(false);
        }}
        isOpen={isProjectDialogOpen}
      />
    </>
  );
};

export default ProjectSectionAdmin;
