export interface Experience {
  _id: string;
  company: string;
  position: string;
  type: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  teamSize?: string;
  location?: string;
}