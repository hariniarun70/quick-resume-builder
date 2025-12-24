import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, User } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { contact, careerObjective, education, skills, projects, experience, certifications, languages, hobbies, sports, courses, activities } = data;

  const hasOptionalSections = languages.length > 0 || hobbies.length > 0 || sports.length > 0 || courses.length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans text-[10px] leading-tight flex min-h-full">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a2744] text-white p-4 flex flex-col">
        {/* Profile Image */}
        {contact.profileImage && (
          <div className="mb-3 flex justify-center">
            <img
              src={contact.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-400"
            />
          </div>
        )}

        {/* Name */}
        <div className="mb-4 text-center">
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
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div className="mb-4">
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Skills
            </h2>
            {skills.technical.length > 0 && (
              <div className="mb-2">
                <p className="text-[8px] text-gray-400 mb-1">Technical</p>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((skill, index) => (
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
            {skills.soft.length > 0 && (
              <div>
                <p className="text-[8px] text-gray-400 mb-1">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-amber-400/20 rounded text-[8px] text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-4">
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-white text-[9px] font-medium">{cert.name}</p>
                  <p className="text-gray-400 text-[8px]">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Languages
            </h2>
            <p className="text-gray-300 text-[9px]">{languages.join(', ')}</p>
          </div>
        )}

        {/* Hobbies & Sports */}
        {(hobbies.length > 0 || sports.length > 0) && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">
              Interests
            </h2>
            {hobbies.length > 0 && (
              <p className="text-gray-300 text-[9px]">{hobbies.join(', ')}</p>
            )}
            {sports.length > 0 && (
              <p className="text-gray-300 text-[9px] mt-1">{sports.join(', ')}</p>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Career Objective */}
        {careerObjective.objective && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-0.5 mb-2">
              Career Objective
            </h2>
            <p className="text-gray-700">{careerObjective.objective}</p>
          </section>
        )}

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
          <section className="mb-4">
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

        {/* Activities */}
        {activities.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-0.5 mb-2">
              Activities & Participation
            </h2>
            <div className="space-y-1.5">
              {activities.map((activity) => (
                <div key={activity.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-700">
                      <span className="font-semibold">{activity.title}</span>
                      <span className="text-amber-600 text-[9px] ml-2">({activity.type})</span>
                    </span>
                    {activity.date && <span className="text-gray-500 text-[9px]">{activity.date}</span>}
                  </div>
                  {activity.description && (
                    <p className="text-gray-600 text-[9px]">{activity.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {courses.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-0.5 mb-2">
              Courses
            </h2>
            <p className="text-gray-700">{courses.join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};
