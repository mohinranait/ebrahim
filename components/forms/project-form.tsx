import { TProject } from "@/types/project.type";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import GlobalModal from "../common/global-modal";

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isOpen,
}: {
  project: TProject | null;
  onSubmit: (project: any) => void;
  onCancel: () => void;
  isOpen: boolean;
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: project?.title || "",
      description: project?.description || "",
      image: project?.image || "",
      technologies: project?.technologies.join(", ") || "",
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
      featured: project?.featured || false,
    }));
  }, [project]);

  return (
    <GlobalModal
      open={isOpen}
      setOpen={onCancel}
      title={
        <div className="flex  text-white items-center gap-2">
          {project ? "Update " : "Create new "} Project
        </div>
      }
      subTitle="Securely add your payment details to continue  shopping"
      withFooter={
        <div className="grid grid-cols-2 w-full gap-2 items-center">
          <Button
            onClick={() => onCancel()}
            variant="outline"
            className=" h-10 w-full "
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className=" w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {project ? "Update" : "Create"} Project
          </Button>
        </div>
      }
      className="!w-[550px]"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
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
      </form>
    </GlobalModal>
  );
}
