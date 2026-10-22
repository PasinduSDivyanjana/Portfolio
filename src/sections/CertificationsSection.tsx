import { useState } from 'react';
import { ArrowUpRight, Award, CalendarDays, Trophy } from 'lucide-react';
import { achievement, certificates } from '../data/credentials';
import { profile } from '../data/profile';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CertificateRecord } from '../components/CertificateRecord';
import { Modal } from '../components/ui/Modal';
export function CertificationsSection() {
  const [showPhoto, setShowPhoto] = useState(false);
  return (
    <section
      className="credentials section-shell"
      id="certifications"
      aria-labelledby="credentials-title"
    >
      <SectionHeading
        number="06"
        label="LEARNING & RECOGNITION"
        titleId="credentials-title"
        title={
          <>
            Certifications
            <br />
            <span>& achievements.</span>
          </>
        }
        description={
          <>
            Professional learning and recognition.
            <br />
            Completed courses and the work in progress.
          </>
        }
      />
      <div className="achievement-feature" data-reveal>
        <div className="achievement-visual">
          <img
            src={profile.portrait}
            alt="Pasindu holding a certificate and trophy at the Iconic Awards Sri Lanka 2025"
            loading="lazy"
          />
          <span className="achievement-image-label">
            <Trophy size={14} />
            {achievement.event}
          </span>
        </div>
        <div className="achievement-copy">
          <span className="achievement-category">
            <Trophy size={16} />
            ACHIEVEMENT
          </span>
          <h3>{achievement.title}</h3>
          <p className="achievement-recipient">{achievement.recipient}</p>
          <p className="achievement-description">{achievement.description}</p>
          <span className="achievement-date">
            <CalendarDays size={14} />
            {achievement.date}
          </span>
          <button className="inline-link" onClick={() => setShowPhoto(true)}>
            View achievement photo <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
      <div className="certificate-list-heading">
        <div>
          <Award size={20} />
          <h3>Certificates & professional learning</h3>
        </div>
        <span>{String(certificates.length).padStart(2, '0')} COURSES</span>
      </div>
      <div className="certificate-list">
        {certificates.map((certificate, i) => (
          <CertificateRecord key={certificate.title} certificate={certificate} number={i + 1} />
        ))}
      </div>
      <Modal
        open={showPhoto}
        onClose={() => setShowPhoto(false)}
        label="Achievement photograph"
        closeLabel="Close achievement photograph"
        className="achievement-dialog"
      >
        <img
          src={profile.originalPortrait}
          alt="Full photograph of Pasindu with the Sakura Elegance certificate and trophy"
        />
      </Modal>
    </section>
  );
}
