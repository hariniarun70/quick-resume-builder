export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  profileImage?: string;
}

export interface CareerObjective {
  objective: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface Activity {
  id: string;
  type: 'paper' | 'workshop' | 'hackathon' | 'club' | 'extracurricular' | 'cocurricular';
  title: string;
  description?: string;
  date?: string;
}

export interface ResumeData {
  contact: ContactInfo;
  careerObjective: CareerObjective;
  education: Education[];
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  languages: string[];
  hobbies: string[];
  sports: string[];
  courses: string[];
  activities: Activity[];
  template: 'classic' | 'modern';
}

export const initialResumeData: ResumeData = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    profileImage: '',
  },
  careerObjective: {
    objective: '',
  },
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  projects: [],
  experience: [],
  certifications: [],
  languages: [],
  hobbies: [],
  sports: [],
  courses: [],
  activities: [],
  template: 'classic',
};
