import { useState } from 'react';
import { BadgeCheck, Check, Database } from 'lucide-react';
import { mongodbCredentials, mongodbPath } from '../../data/mongodbCredentials';
import type { CredentialCategory, SkillCredential } from '../../types/portfolio';
import { SkillCredentialCard } from './SkillCredentialCard';
import { SkillCredentialDialog } from './SkillCredentialDialog';

const filters = [
  'All skills',
  'Foundations',
  'Performance',
  'Scaling & resilience',
  'Security',
] as const;

export function LearningPath() {
  const [category, setCategory] = useState<'All skills' | CredentialCategory>('All skills');
  const [selected, setSelected] = useState<SkillCredential | null>(null);
  const visible = mongodbCredentials.filter(
    (credential) => category === 'All skills' || credential.category === category,
  );
  return (
    <div className="learning-path" aria-labelledby="mongodb-path-title">
      <div className="learning-path-summary">
        <div className="learning-path-copy">
          <span className="learning-path-eyebrow">
            <Database size={17} /> MONGODB · OCTOBER 2026
          </span>
          <h3 id="mongodb-path-title">
            MongoDB Atlas
            <br />
            <span>Administrator Path</span>
          </h3>
          <p>{mongodbPath.description}</p>
          <span className="learning-path-earned">
            <BadgeCheck size={17} /> Learning path completed{' '}
            <span>{mongodbCredentials.length} skill credentials earned</span>
          </span>
        </div>
        <div className="learning-path-completion">
          <span className="learning-path-count">
            <Check size={20} />
            <strong>
              {mongodbCredentials.length}
              <span> / {mongodbPath.requiredSkills}</span>
            </strong>
          </span>
          <span>REQUIRED SKILLS COMPLETED</span>
          <div className="learning-path-badge-stack" aria-hidden="true">
            {mongodbCredentials.slice(0, 3).map((credential) => (
              <img
                key={credential.id}
                src={credential.badge}
                alt=""
                loading="lazy"
                width={76}
                height={76}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="learning-path-gallery-heading">
        <h4>Skills, backed by credentials.</h4>
        <span>{mongodbCredentials.length} BADGES & CERTIFICATES</span>
      </div>
      <div className="credential-filters" role="group" aria-label="Filter MongoDB skills">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setCategory(filter)}
            aria-pressed={category === filter}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="skill-credential-grid">
        {visible.map((credential) => (
          <SkillCredentialCard
            key={credential.id}
            credential={credential}
            onSelect={() => setSelected(credential)}
          />
        ))}
      </div>
      <SkillCredentialDialog credential={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
