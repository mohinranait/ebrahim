import { TSkill } from "@/types/skills.type";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SkillForm({
  skill,
  onSubmit,
  onCancel,
}: {
  skill: TSkill | null;
  onSubmit: (skill: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    level: skill?.level || 50,
    category: skill?.category || "frontend",
    icon: skill?.icon || "Code",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillData = {
      ...formData,
      ...(skill && { _id: skill._id }),
    };
    onSubmit(skillData);
  };

  return (
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

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {skill ? "Update" : "Create"} Skill
        </Button>
      </div>
    </form>
  );
}
