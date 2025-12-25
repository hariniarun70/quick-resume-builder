import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
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

  return (
    <div className={`w-full bg-white text-gray-900 font-sans ${baseFontSize} leading-relaxed p-6`}>
      {/* Header with Profile Image */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <div className="flex items-center justify-center gap-4">
          {contact.profileImage && (
            <img
              src={contact.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-serif">
              {contact.fullName || 'Your Name'}
            </h1>
            <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-gray-600 ${smallFontSize}`}>
              {contact.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {contact.email}
                </span>
              )}
              {contact.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {contact.phone}
                </span>
              )}
              {contact.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {contact.location}
                </span>
              )}
              {contact.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="h-3 w-3" />
                  {contact.linkedin}
                </span>
              )}
              {contact.github && (
                <span className="flex items-center gap-1">
                  <Github className="h-3 w-3" />
                  {contact.github}
                </span>
              )}
              {contact.website && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {contact.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Career Objective */}
      {careerObjective.objective && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Career Objective
          </h2>
          <p className={`text-gray-700 ${smallFontSize}`}>{careerObjective.objective}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className={`font-bold text-gray-900 ${baseFontSize}`}>{edu.institution}</h3>
                  <span className={`text-gray-500 ${tinyFontSize}`}>
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className={`text-gray-700 ${smallFontSize}`}>
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span className="text-gray-500"> • GPA: {edu.gpa}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience / Internships */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
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
                <p className={`text-gray-700 italic ${smallFontSize}`}>{exp.company}</p>
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className={`font-bold text-gray-900 ${baseFontSize}`}>{proj.name}</h3>
                  {proj.link && (
                    <span className={`text-gray-500 ${tinyFontSize}`}>{proj.link}</span>
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

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Skills
          </h2>
          <div className="space-y-1.5">
            {skills.technical.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Technical:</span> {skills.technical.join(' • ')}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Soft Skills:</span> {skills.soft.join(' • ')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className={`text-gray-700 ${smallFontSize}`}>
                  <span className="font-bold">{cert.name}</span> — {cert.issuer}
                </span>
                {cert.date && <span className={`text-gray-500 ${tinyFontSize}`}>{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Activities & Participation
          </h2>
          <div className="space-y-2">
            {activities.map((activity) => (
              <div key={activity.id}>
                <div className="flex justify-between items-baseline">
                  <span className={`text-gray-700 ${smallFontSize}`}>
                    <span className="font-bold">{activity.title}</span>
                    <span className={`text-gray-500 ${tinyFontSize} ml-2`}>({activity.type.replace(/([A-Z])/g, ' $1').trim()})</span>
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

      {/* Optional Sections */}
      {hasOptionalSections && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2 font-serif">
            Additional Information
          </h2>
          <div className="space-y-1.5">
            {languages.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Languages:</span> {languages.join(', ')}
              </p>
            )}
            {courses.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Courses:</span> {courses.join(', ')}
              </p>
            )}
            {hobbies.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Hobbies:</span> {hobbies.join(', ')}
              </p>
            )}
            {sports.length > 0 && (
              <p className={`text-gray-700 ${smallFontSize}`}>
                <span className="font-bold">Sports:</span> {sports.join(', ')}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
