import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { contact, education, skills, projects, experience } = data;

  return (
    <div className="w-full bg-white text-gray-900 font-sans text-[10px] leading-tight flex min-h-full">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a2744] text-white p-4 flex flex-col">
        {/* Name */}
        <div className="mb-4">
          <h1 className="text-base font-bold tracking-tight leading-none">
            {contact.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div className="space-y-1.5 mb-4">
          <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
            Contact
          </h2>
          {contact.email && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <Mail className="h-2.5 w-2.5 text-amber-400 shrink-0" />
              <span className="break-all text-[9px]">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <Phone className="h-2.5 w-2.5 text-amber-400 shrink-0" />
              <span className="text-[9px]">{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="h-2.5 w-2.5 text-amber-400 shrink-0" />
              <span className="text-[9px]">{contact.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <Linkedin className="h-2.5 w-2.5 text-amber-400 shrink-0" />
              <span className="break-all text-[9px]">{contact.linkedin}</span>
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <Globe className="h-2.5 w-2.5 text-amber-400 shrink-0" />
              <span className="break-all text-[9px]">{contact.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-white/10 rounded text-[8px] text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-white text-[9px]">{edu.degree}</h3>
                  <p className="text-gray-300 text-[9px]">{edu.field}</p>
                  <p className="text-gray-400 text-[8px]">{edu.institution}</p>
                  <p className="text-gray-500 text-[8px]">
                    {edu.startDate} — {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-0.5 mb-2">
              Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-500 text-[9px]">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-amber-700 font-medium">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-gray-600 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-0.5 mb-2">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && (
                      <span className="text-amber-600 text-[9px]">{proj.link}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-[9px] italic">{proj.technologies}</p>
                  {proj.description && (
                    <p className="text-gray-600">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
