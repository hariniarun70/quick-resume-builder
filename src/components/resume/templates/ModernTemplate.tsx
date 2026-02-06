import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { contact, careerObjective, education, skills, projects, experience, certifications, languages, hobbies, sports, courses, activities } = data;

  const hasOptionalSections = languages.length > 0 || hobbies.length > 0 || sports.length > 0 || courses.length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans text-[12px] leading-relaxed flex" style={{ minHeight: '297mm' }}>
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a2744] text-white p-5 flex flex-col">
        {/* Profile Image */}
        {contact.profileImage && (
          <div className="mb-4 flex justify-center">
            <img
              src={contact.profileImage}
              alt="Profile"
              className="w-24 h-24 object-cover border-2 border-amber-400"
            />
          </div>
        )}

        {/* Name */}
        <div className="mb-5 text-center">
          <h1 className="font-bold tracking-tight leading-none" style={{ fontSize: '28px' }}>
            {contact.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-5">
          <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
            Contact
          </h2>
          {contact.email && (
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="break-all text-[12px]">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="text-[12px]">{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="text-[12px]">{contact.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <div className="flex items-center gap-2 text-gray-300">
              <Linkedin className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="break-all text-[12px]">{contact.linkedin}</span>
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2 text-gray-300">
              <Github className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="break-all text-[12px]">{contact.github}</span>
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="break-all text-[12px]">{contact.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div className="mb-5">
            <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
              Skills
            </h2>
            {skills.technical.length > 0 && (
              <div className="mb-2.5">
                <p className="text-[12px] text-gray-400 mb-1 font-bold">Technical</p>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-white/10 rounded text-[12px] text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <p className="text-[12px] text-gray-400 mb-1 font-bold">Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-amber-400/20 rounded text-[12px] text-gray-200"
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
          <div className="mb-5">
            <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-white text-[12px]">{edu.degree}</h3>
                  <p className="text-gray-300 text-[12px]">{edu.field}</p>
                  <p className="text-gray-400 text-[12px]">{edu.institution}</p>
                  <p className="text-gray-500 text-[12px]">
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
          <div className="mb-5">
            <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-white text-[12px] font-bold">{cert.name}</p>
                  <p className="text-gray-400 text-[12px]">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-5">
            <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
              Languages
            </h2>
            <p className="text-gray-300 text-[12px]">{languages.join(', ')}</p>
          </div>
        )}

        {/* Hobbies & Sports */}
        {(hobbies.length > 0 || sports.length > 0) && (
          <div>
            <h2 className="font-bold uppercase tracking-widest text-amber-400 mb-2" style={{ fontSize: '13px' }}>
              Interests
            </h2>
            {hobbies.length > 0 && (
              <p className="text-gray-300 text-[12px]">{hobbies.join(', ')}</p>
            )}
            {sports.length > 0 && (
              <p className="text-gray-300 text-[12px] mt-1">{sports.join(', ')}</p>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Career Objective */}
        {careerObjective.objective && (
          <section className="mb-5">
            <h2 className="font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: '13px' }}>
              Career Objective
            </h2>
            <p className="text-gray-700 text-[12px]">{careerObjective.objective}</p>
          </section>
        )}

        {/* Experience / Internships */}
        {experience.length > 0 && (
          <section className="mb-5" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: '13px' }}>
              Experience / Internships
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-[12px]">{exp.position}</h3>
                    <span className="text-gray-500 text-[12px]">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-amber-700 font-bold text-[12px]">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-gray-600 whitespace-pre-line text-[12px]">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: '13px' }}>
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-gray-900 text-[12px]">{proj.name}</h3>
                    {proj.link && (
                      <span className="text-amber-600 text-[12px]">{proj.link}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-[12px] italic">{proj.technologies}</p>
                  {proj.description && (
                    <p className="text-gray-600 text-[12px]">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {activities.length > 0 && (
          <section className="mb-5" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: '13px' }}>
              Activities & Participation
            </h2>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div key={activity.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-700 text-[12px]">
                      <span className="font-bold">{activity.title}</span>
                      <span className="text-amber-600 text-[12px] ml-2">({activity.type})</span>
                    </span>
                    {activity.date && <span className="text-gray-500 text-[12px]">{activity.date}</span>}
                  </div>
                  {activity.description && (
                    <p className="text-gray-600 text-[12px]">{activity.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {courses.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: '13px' }}>
              Courses
            </h2>
            <p className="text-gray-700 text-[12px]">{courses.join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};
