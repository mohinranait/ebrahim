"use client";
import React from "react";
import { motion } from "framer-motion";
import ProjectSectionAdmin from "@/components/common/project-section-admin";

const ProjectPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your all project and content
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <ProjectSectionAdmin />
      </div>
    </motion.div>
  );
};

export default ProjectPage;
