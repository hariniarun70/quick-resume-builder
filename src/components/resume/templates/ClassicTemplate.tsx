import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, User } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { contact, careerObjective, education, skills, projects, experience, certifications, languages, hobbies, sports, courses, activities } = data;

  const hasOptionalSections = languages.length > 0 || hobbies.length > 0 || sports.length > 0 || courses.length > 0;

  return (
    <div className="w-full bg-white text-gray-900 font-sans text-[10px] leading-tight p-6">
      {/* Header with Profile Image */}
      <div className="text-center border-b-2 border-gray-800 pb-3 mb-4">
        <div className="flex items-center justify-center gap-4">
          {contact.profileImage && (
            <img
              src={contact.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div>
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
        </div>
      </div>

      {/* Career Objective */}
      {careerObjective.objective && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Career Objective
          </h2>
          <p className="text-gray-700">{careerObjective.objective}</p>
        </section>
      )}

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
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.technical.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Technical:</span> {skills.technical.join(' • ')}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Soft Skills:</span> {skills.soft.join(' • ')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className="text-gray-700">
                  <span className="font-semibold">{cert.name}</span> — {cert.issuer}
                </span>
                {cert.date && <span className="text-gray-500 text-[9px]">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Activities & Participation
          </h2>
          <div className="space-y-1.5">
            {activities.map((activity) => (
              <div key={activity.id}>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-700">
                    <span className="font-semibold">{activity.title}</span>
                    <span className="text-gray-500 text-[9px] ml-2">({activity.type.replace(/([A-Z])/g, ' $1').trim()})</span>
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

      {/* Optional Sections */}
      {hasOptionalSections && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-0.5 mb-2 font-serif">
            Additional Information
          </h2>
          <div className="space-y-1">
            {languages.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Languages:</span> {languages.join(', ')}
              </p>
            )}
            {courses.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Courses:</span> {courses.join(', ')}
              </p>
            )}
            {hobbies.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Hobbies:</span> {hobbies.join(', ')}
              </p>
            )}
            {sports.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Sports:</span> {sports.join(', ')}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
