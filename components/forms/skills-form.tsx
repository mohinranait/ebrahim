import { TSkill } from "@/types/skills.type";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GlobalModal from "../common/global-modal";
import UploadImage from "../common/upload-image";
import { useUploadFile } from "@/hooks/useUploadFile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

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
    name: "",
    level: 50,
    category: "frontend",
    icon: "Code",
    image: "",
    color: skill?.color,
    status: skill?.status,
  });

  console.log({ skill, formData });

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
    resetForm();
  };

  useEffect(() => {
    if (skill) {
      setFormData((prev) => ({
        ...prev,
        ...skill,
        name: skill?.name,
        level: skill?.level,
        category: skill?.category,
        icon: skill?.icon,
        image: skill?.image,
        status: skill?.status,
        color: skill?.color,
      }));
    }
  }, [skill]);

  const resetForm = () => {
    setFormData({
      name: "",
      level: 0,
      category: "frontend",
      icon: "Code",
      image: "",
      color: "",
      status: true,
    });
  };

  return (
    <GlobalModal
      open={isOpen}
      setOpen={() => {
        resetForm();
        onCancel();
      }}
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

        {!file && formData?.image && (
          <Image
            src={formData?.image}
            width={100}
            height={100}
            alt="image"
            className="w-16 h-16 ring-1 ring-black rounded"
          />
        )}
        <div>
          <Label htmlFor="color">Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-16 h-10"
            />
            <Input
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              placeholder="#3B82F6"
              className="flex-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(e) => setFormData({ ...formData, category: e })}
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status ? "true" : "false"}
              onValueChange={(e) =>
                setFormData({
                  ...formData,
                  status: e === "true" ? true : false,
                })
              }
            >
              <SelectTrigger className="w-full" id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">In-active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </GlobalModal>
  );
}
