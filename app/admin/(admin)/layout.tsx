"use client";
import { adminLeftMenus } from "@/constant/data";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Database, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest, useApi } from "@/hooks/useApi";
import { TProject } from "@/types/project.type";
import { TSkill } from "@/types/skills.type";
import { PersonalInfo } from "@/types/personal.type";

type PropTypes = {
  children: React.ReactNode;
};
const AdminDashboardLayout = ({ children }: PropTypes) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const handleSeedDatabase = async () => {
    const result = await apiRequest("/api/seed", { method: "POST" });
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

    // API calls
    const {
      data: projects,
      loading: projectsLoading,
      refetch: refetchProjects,
    } = useApi<TProject[]>("/api/projects");
    const {
      data: skills,
      loading: skillsLoading,
      refetch: refetchSkills,
    } = useApi<TSkill[]>("/api/skills");

    const fetchPersonalInfo = async () => {
      const result = await apiRequest<PersonalInfo>("/api/personal-info");
      if (result.success && result.data) {
        setPersonalInfo(result.data);
      }
    };

    if (result.success) {
      alert("Database seeded successfully!");
      refetchProjects();
      refetchSkills();
      fetchPersonalInfo();
    } else {
      alert("Failed to seed database");
    }
  };

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
            <Link href={`${item?.link}`}>
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
            </Link>
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
      <div className="ml-64 p-8">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
