import { TSkill } from "@/types/skills.type";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GlobalModal from "../common/global-modal";
import UploadImage from "../common/upload-image";
import { useUploadFile } from "@/hooks/useUploadFile";

export default function SkillForm({
  skill,
  onSubmit,
  onCancel,
  isOpen,
}: {
  skill: TSkill | null;
  onSubmit: (skill: any) => void;
  onCancel: () => void;
  isOpen: boolean;
}) {
  const { uploadFile, loading, error } = useUploadFile();
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: skill?.name || "",
    level: skill?.level || 50,
    category: skill?.category || "frontend",
    icon: skill?.icon || "Code",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillData = {
      ...formData,
      ...(skill && { _id: skill._id }),
    };

    if (file) {
      const res = await uploadFile(file);

      if (res.message === "Success") {
        skillData.image = res.url;
      }
    }

    onSubmit({ ...skillData });
  };

  useEffect(() => {
    if (skill) {
      setFormData((prev) => ({
        ...prev,
        name: skill?.name || "",
        level: skill?.level || 50,
        category: skill?.category || "frontend",
        icon: skill?.icon || "Code",
      }));
    }
  }, [skill]);

  return (
    <GlobalModal
      open={isOpen}
      setOpen={onCancel}
      title={
        <div className="flex  text-white items-center gap-2">
          {skill ? "Update " : "Create new "} Skill
        </div>
      }
      subTitle={
        skill ? "Update skill details" : "Add a new skill to your portfolio"
      }
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
            {skill ? "Update" : "Create"} Skill
          </Button>
        </div>
      }
      className="!w-[550px]"
    >
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

        <UploadImage file={file} setFile={setFile} />

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
      </form>
    </GlobalModal>
  );
}
