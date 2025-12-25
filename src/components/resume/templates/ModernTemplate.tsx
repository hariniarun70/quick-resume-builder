import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { contact, careerObjective, education, skills, projects, experience, certifications, languages, hobbies, sports, courses, activities } = data;

  const hasOptionalSections = languages.length > 0 || hobbies.length > 0 || sports.length > 0 || courses.length > 0;

  // Calculate content density to adjust font size
  const contentSections = [
    careerObjective.objective ? 1 : 0,
    education.length,
    experience.length,
    projects.length,
    certifications.length,
    activities.length,
    skills.technical.length > 0 || skills.soft.length > 0 ? 1 : 0,
    hasOptionalSections ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const isLightContent = contentSections <= 4;
  const baseFontSize = isLightContent ? 'text-[14px]' : 'text-[12px]';
  const smallFontSize = isLightContent ? 'text-[13px]' : 'text-[11px]';
  const tinyFontSize = isLightContent ? 'text-[12px]' : 'text-[10px]';
  const sidebarSmall = isLightContent ? 'text-[12px]' : 'text-[10px]';
  const sidebarTiny = isLightContent ? 'text-[11px]' : 'text-[9px]';

  return (
    <div className={`w-full bg-white text-gray-900 font-sans ${baseFontSize} leading-relaxed flex min-h-full`}>
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a2744] text-white p-5 flex flex-col">
        {/* Profile Image */}
        {contact.profileImage && (
          <div className="mb-4 flex justify-center">
            <img
              src={contact.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-400"
            />
          </div>
        )}

        {/* Name */}
        <div className="mb-5 text-center">
          <h1 className="text-lg font-bold tracking-tight leading-none">
            {contact.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-5">
          <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
            Contact
          </h2>
          {contact.email && (
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={`break-all ${sidebarSmall}`}>{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={sidebarSmall}>{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={sidebarSmall}>{contact.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <div className="flex items-center gap-2 text-gray-300">
              <Linkedin className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={`break-all ${sidebarSmall}`}>{contact.linkedin}</span>
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2 text-gray-300">
              <Github className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={`break-all ${sidebarSmall}`}>{contact.github}</span>
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="h-3 w-3 text-amber-400 shrink-0" />
              <span className={`break-all ${sidebarSmall}`}>{contact.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div className="mb-5">
            <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
              Skills
            </h2>
            {skills.technical.length > 0 && (
              <div className="mb-2.5">
                <p className={`${sidebarTiny} text-gray-400 mb-1 font-bold`}>Technical</p>
                <div className="flex flex-wrap gap-1">
                  {skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 bg-white/10 rounded ${sidebarTiny} text-gray-200`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <p className={`${sidebarTiny} text-gray-400 mb-1 font-bold`}>Soft Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 bg-amber-400/20 rounded ${sidebarTiny} text-gray-200`}
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
            <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className={`font-bold text-white ${sidebarSmall}`}>{edu.degree}</h3>
                  <p className={`text-gray-300 ${sidebarSmall}`}>{edu.field}</p>
                  <p className={`text-gray-400 ${sidebarTiny}`}>{edu.institution}</p>
                  <p className={`text-gray-500 ${sidebarTiny}`}>
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
            <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className={`text-white ${sidebarSmall} font-bold`}>{cert.name}</p>
                  <p className={`text-gray-400 ${sidebarTiny}`}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-5">
            <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
              Languages
            </h2>
            <p className={`text-gray-300 ${sidebarSmall}`}>{languages.join(', ')}</p>
          </div>
        )}

        {/* Hobbies & Sports */}
        {(hobbies.length > 0 || sports.length > 0) && (
          <div>
            <h2 className={`${smallFontSize} font-bold uppercase tracking-widest text-amber-400 mb-2`}>
              Interests
            </h2>
            {hobbies.length > 0 && (
              <p className={`text-gray-300 ${sidebarSmall}`}>{hobbies.join(', ')}</p>
            )}
            {sports.length > 0 && (
              <p className={`text-gray-300 ${sidebarSmall} mt-1`}>{sports.join(', ')}</p>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Career Objective */}
        {careerObjective.objective && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2">
              Career Objective
            </h2>
            <p className={`text-gray-700 ${smallFontSize}`}>{careerObjective.objective}</p>
          </section>
        )}

        {/* Experience / Internships */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2">
              Experience / Internships
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-gray-900 ${baseFontSize}`}>{exp.position}</h3>
                    <span className={`text-gray-500 ${tinyFontSize}`}>
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`text-amber-700 font-bold ${smallFontSize}`}>{exp.company}</p>
                  {exp.description && (
                    <p className={`mt-1 text-gray-600 whitespace-pre-line ${smallFontSize}`}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2">
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className={`font-bold text-gray-900 ${baseFontSize}`}>{proj.name}</h3>
                    {proj.link && (
                      <span className={`text-amber-600 ${tinyFontSize}`}>{proj.link}</span>
                    )}
                  </div>
                  <p className={`text-gray-500 ${tinyFontSize} italic`}>{proj.technologies}</p>
                  {proj.description && (
                    <p className={`text-gray-600 ${smallFontSize}`}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {activities.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2">
              Activities & Participation
            </h2>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div key={activity.id}>
                  <div className="flex justify-between items-baseline">
                    <span className={`text-gray-700 ${smallFontSize}`}>
                      <span className="font-bold">{activity.title}</span>
                      <span className={`text-amber-600 ${tinyFontSize} ml-2`}>({activity.type})</span>
                    </span>
                    {activity.date && <span className={`text-gray-500 ${tinyFontSize}`}>{activity.date}</span>}
                  </div>
                  {activity.description && (
                    <p className={`text-gray-600 ${tinyFontSize}`}>{activity.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {courses.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 border-b-2 border-amber-400 pb-1 mb-2">
              Courses
            </h2>
            <p className={`text-gray-700 ${smallFontSize}`}>{courses.join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};
