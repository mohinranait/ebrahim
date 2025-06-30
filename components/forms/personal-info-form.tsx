import { PersonalInfo } from "@/types/personal.type";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function PersonalInfoForm({
  personalInfo,
  onSubmit,
}: {
  personalInfo: PersonalInfo;
  onSubmit: (data: Partial<PersonalInfo>) => void;
}) {
  const [formData, setFormData] = useState({
    name: personalInfo.name || "",
    title: personalInfo.title || "",
    bio: personalInfo.bio || "",
    email: personalInfo.email || "",
    phone: personalInfo.phone || "",
    location: personalInfo.location || "",
    company: personalInfo.company || "",
    avatar: personalInfo.avatar || "👨‍💻",
    github: personalInfo.socialLinks?.github || "",
    linkedin: personalInfo.socialLinks?.linkedin || "",
    twitter: personalInfo.socialLinks?.twitter || "",
    website: personalInfo.socialLinks?.website || "",
    resumeUrl: personalInfo.resumeUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        website: formData.website,
      },
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="avatar">Avatar (Emoji)</Label>
        <Input
          id="avatar"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          placeholder="👨‍💻"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Social Links
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input
          id="resumeUrl"
          value={formData.resumeUrl}
          onChange={(e) =>
            setFormData({ ...formData, resumeUrl: e.target.value })
          }
          placeholder="https://drive.google.com/file/d/your-resume"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Update Personal Information
      </Button>
    </form>
  );
}
