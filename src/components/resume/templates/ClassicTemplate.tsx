import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { contact, education, skills, projects, experience } = data;

  return (
    <div className="w-full bg-white text-gray-900 font-sans text-[10px] leading-tight p-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 font-serif">
          {contact.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1.5 text-gray-600">
          {contact.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" />
              {contact.email}
            </span>
          )}
          {contact.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5" />
              {contact.phone}
            </span>
          )}
          {contact.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              {contact.location}
            </span>
          )}
          {contact.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-2.5 w-2.5" />
              {contact.linkedin}
            </span>
          )}
          {contact.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-2.5 w-2.5" />
              {contact.website}
            </span>
          )}
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
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
                <p className="text-gray-700 italic">{exp.company}</p>
                {exp.description && (
                  <p className="mt-1 text-gray-600 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <span className="text-gray-500 text-[9px]">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span className="text-gray-500"> • GPA: {edu.gpa}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-gray-500 text-[9px]">{proj.link}</span>
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

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Skills
          </h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );
};
