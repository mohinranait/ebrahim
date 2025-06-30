import { Technology } from "@/types/techonology.type";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import GlobalModal from "../common/global-modal";

export default function TechnologyForm({
  technology,
  onSubmit,
  onCancel,
  isOpen,
}: {
  technology: Technology | null;
  onSubmit: (technology: any) => void;
  onCancel: () => void;
  isOpen: boolean;
}) {
  const [formData, setFormData] = useState({
    name: technology?.name || "",
    category: technology?.category || "frontend",
    icon: technology?.icon || "Code",
    color: technology?.color || "#3B82F6",
    description: technology?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const technologyData = {
      ...formData,
      ...(technology && { _id: technology._id }),
    };
    onSubmit(technologyData);
  };

  useEffect(() => {
    if (technology) {
      setFormData({
        name: technology?.name || "",
        category: technology?.category || "frontend",
        icon: technology?.icon || "Code",
        color: technology?.color || "#3B82F6",
        description: technology?.description || "",
      });
    } else {
      resetForm();
    }
  }, [technology]);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "frontend",
      icon: "Code",
      color: "#3B82F6",
      description: "",
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
          {technology ? "Update " : "Create new "} Technology
        </div>
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
            {technology ? "Update" : "Create"} Technology
          </Button>
        </div>
      }
      className="!w-[550px]"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Technology Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

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
            <option value="mobile">Mobile</option>
            <option value="cloud">Cloud</option>
            <option value="testing">Testing</option>
          </select>
        </div>

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

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={2}
          />
        </div>
      </form>
    </GlobalModal>
  );
}
