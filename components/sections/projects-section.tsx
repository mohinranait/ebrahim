"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import { TProject } from "@/types/project.type";

export function Projects() {
  const { data: projects, loading: projectsLoading } = useApi<TProject[]>(
    "/api/projects?accessBy=user"
  );

  const [filter, setFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<TProject[]>([]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects || []);
    } else if (filter === "featured") {
      setFilteredProjects(
        projects?.filter((project) => project.featured) || []
      );
    }
  }, [filter, projects]);

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
  ];

  return (
    <section id="projects" className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A showcase of my recent work, demonstrating my skills in full-stack
            development, UI/UX design, and problem-solving.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {filters.map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "outline"}
                onClick={() => setFilter(filterOption.key)}
                className={
                  filter === filterOption.key
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "border-white/20 text-white hover:bg-white/10"
                }
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, index) => (
            <motion.div
              key={project?._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-white/5 gap-3 p-0 border-white/10 hover:bg-white/10 transition-all duration-300 h-full overflow-hidden">
                <CardHeader className="gap-0 p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project?.liveUrl && (
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={project?.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project?.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project?.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>

                    {project.featured && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4 h-full ">
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex  flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-purple-600/20 text-purple-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* <div className="flex space-x-2 pt-4">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-none bg-gradient-to-r from-purple-600 to-pink-600"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
