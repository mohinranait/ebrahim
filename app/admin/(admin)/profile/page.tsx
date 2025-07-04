"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PersonalInfoForm from "@/components/forms/personal-info-form";
import { PersonalInfo } from "@/types/personal.type";
import { apiRequest } from "@/hooks/useApi";

const ProfielPage = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  const handleUpdatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    const result = await apiRequest("/api/personal-info", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    console.log({ result });

    if (result.success) {
      setPersonalInfo(result.data as PersonalInfo);
      alert("Personal information updated successfully!");
    } else {
      alert("Failed to update personal information");
    }
  };

  const fetchPersonalInfo = async () => {
    const result = await apiRequest<PersonalInfo>("/api/personal-info");
    if (result.success && result.data) {
      setPersonalInfo(result.data);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your profile content
          </p>
        </div>
      </div>
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
    </motion.div>
  );
};

export default ProfielPage;
