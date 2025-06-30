"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfo } from "@/types/personal.type";
import { useApi } from "@/hooks/useApi";
import { Experience } from "@/types/exprience.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";

const ExperienceSection = () => {
  // Add these API calls after the existing ones
  const { data: experiences, loading: experiencesLoading } =
    useApi<Experience[]>("/api/experiences");
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My journey in software development and the companies I've worked
            with
          </p>
        </motion.div>

        {experiencesLoading ? (
          <div className="text-center">Loading experiences...</div>
        ) : (
          <div className="space-y-8">
            {experiences?.map((experience, index) => (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {experience.position}
                          </h3>
                          {experience.current && (
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <h4 className="text-xl font-semibold text-white">
                            {experience.company}
                          </h4>
                          <Badge variant="outline" className="capitalize">
                            {experience.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                experience.startDate
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}{" "}
                              -{" "}
                              {experience.current
                                ? "Present"
                                : new Date(
                                    experience.endDate!
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                  })}
                            </span>
                          </div>
                          {experience.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{experience.location}</span>
                            </div>
                          )}
                          {experience.teamSize && (
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{experience.teamSize}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    {experience.achievements &&
                      experience.achievements.length > 0 && (
                        <div className="mb-6">
                          <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                            Key Achievements:
                          </h5>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-gray-300">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {experience.technologies &&
                      experience.technologies.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                            Technologies Used:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>

                {/* Timeline connector */}
                {index < (experiences?.length || 0) - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-blue-600 to-purple-600 mt-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
