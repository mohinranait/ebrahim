export interface PersonalInfo {
  _id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  joinDate: string;
  avatar: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resumeUrl?: string;
}