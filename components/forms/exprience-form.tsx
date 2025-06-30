import { Experience } from "@/types/exprience.type";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ExperienceForm({
  experience,
  onSubmit,
  onCancel,
}: {
  experience: Experience | null;
  onSubmit: (experience: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    company: experience?.company || "",
    position: experience?.position || "",
    type: experience?.type || "full-time",
    startDate: experience?.startDate ? experience.startDate.split("T")[0] : "",
    endDate: experience?.endDate ? experience.endDate.split("T")[0] : "",
    current: experience?.current || false,
    description: experience?.description || "",
    achievements: experience?.achievements.join("\n") || "",
    technologies: experience?.technologies.join(", ") || "",
    teamSize: experience?.teamSize || "",
    location: experience?.location || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const experienceData = {
      ...formData,
      achievements: formData.achievements.split("\n").filter((a) => a.trim()),
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((t) => t),
      startDate: new Date(formData.startDate),
      endDate: formData.current
        ? undefined
        : formData.endDate
        ? new Date(formData.endDate)
        : undefined,
      ...(experience && { _id: experience._id }),
    };
    onSubmit(experienceData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-96 overflow-y-auto"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="internship">Internship</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            disabled={formData.current}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) =>
            setFormData({
              ...formData,
              current: e.target.checked,
              endDate: e.target.checked ? "" : formData.endDate,
            })
          }
          className="rounded"
        />
        <Label htmlFor="current">Currently working here</Label>
      </div>

      <div>
        <Label htmlFor="teamSize">Team Size</Label>
        <Input
          id="teamSize"
          value={formData.teamSize}
          onChange={(e) =>
            setFormData({ ...formData, teamSize: e.target.value })
          }
          placeholder="e.g., 10-12 developers"
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
        <Label htmlFor="achievements">Achievements (one per line)</Label>
        <Textarea
          id="achievements"
          value={formData.achievements}
          onChange={(e) =>
            setFormData({ ...formData, achievements: e.target.value })
          }
          rows={4}
          placeholder="Each achievement on a new line"
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

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {experience ? "Update" : "Create"} Experience
        </Button>
      </div>
    </form>
  );
}
