import { TProject } from "@/types/project.type";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import GlobalModal from "../common/global-modal";
import { useUploadFile } from "@/hooks/useUploadFile";
import UploadImage from "../common/upload-image";
import MultiSelectDropdown, {
  MultiSelectDropdownValues,
} from "../common/multi-select-dropdown";
import { useApi } from "@/hooks/useApi";
import { Technology } from "@/types/techonology.type";

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
  const { uploadFile } = useUploadFile();
  const {
    data: technologies,
    loading: technologiesLoading,
    refetch: refetchTechnologies,
  } = useApi<Technology[]>("/api/technologies");

  const getTechonologys: MultiSelectDropdownValues[] =
    technologies?.map((tec) => ({
      label: tec.name,
      value: tec?.name,
    })) || [];

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    technologies: project?.technologies || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      ...(project && { _id: project._id }),
    };

    if (file) {
      const res = await uploadFile(file);

      if (res.message === "Success") {
        projectData.image = res.url;
      }
    }

    onSubmit(projectData);
    resetFrom();
  };

  // Handle technology selection
  const handleTechnologyChange = (
    value: string[] | ((prev: string[]) => string[])
  ) => {
    if (typeof value === "function") {
      setFormData((prev) => ({
        ...prev,
        technologies: value(prev.technologies),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        technologies: value,
      }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: project?.title || "",
      description: project?.description || "",
      image: project?.image || "",
      technologies: project?.technologies || [],
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
      featured: project?.featured || false,
    }));
  }, [project]);

  const resetFrom = () => {
    setFormData((prev) => ({
      title: "",
      description: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      featured: false,
    }));
  };

  return (
    <GlobalModal
      open={isOpen}
      setOpen={() => {
        onCancel();
        resetFrom();
      }}
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

        <UploadImage file={file} setFile={setFile} />

        <MultiSelectDropdown
          label="Technologies"
          frameworks={getTechonologys}
          selectedValues={formData.technologies}
          setSelectedValues={handleTechnologyChange}
        />

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
