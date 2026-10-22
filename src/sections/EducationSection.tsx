import { CalendarDays, GraduationCap } from 'lucide-react';
import { degree, schools } from '../data/education';
import { SectionHeading } from '../components/ui/SectionHeading';
import { InstitutionLogo } from '../components/education/InstitutionLogo';
import { SchoolRecord } from '../components/education/SchoolRecord';
export function EducationSection() {
  return (
    <section className="education section-shell" id="education" aria-labelledby="education-title">
      <SectionHeading
        number="05"
        label="ACADEMIC JOURNEY"
        titleId="education-title"
        title={
          <>
            Education &<br />
            <span>qualifications.</span>
          </>
        }
        description={
          <>
            From school to software engineering.
            <br />
            My academic journey, in detail.
          </>
        }
      />
      <article className="degree-card" data-reveal>
        <InstitutionLogo src={degree.logo} alt="SLIIT" />
        <div className="degree-content">
          <div className="education-meta">
            <span>
              <CalendarDays size={13} />
              {degree.duration}
            </span>
            <span className="education-status">
              <span className="live-dot" />
              {degree.status}
            </span>
          </div>
          <h3>{degree.title}</h3>
          <p className="specialization">{degree.specialization}</p>
          <p className="institution-name">{degree.institution}</p>
        </div>
        <div className="degree-gpa">
          <GraduationCap size={22} strokeWidth={1.4} />
          <span>CURRENT GPA</span>
          <strong>{degree.gpa}</strong>
        </div>
      </article>
      <div className="school-records">
        {schools.map((school) => (
          <SchoolRecord school={school} key={school.name} />
        ))}
      </div>
    </section>
  );
}
