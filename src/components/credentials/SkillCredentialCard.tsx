import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { SkillCredential } from '../../types/portfolio';
import { formatCredentialDate } from '../../lib/credentials';

export function SkillCredentialCard({
  credential,
  onSelect,
}: {
  credential: SkillCredential;
  onSelect: () => void;
}) {
  return (
    <button
      className="skill-credential-card"
      onClick={onSelect}
      aria-label={'View credential: ' + credential.skill}
    >
      <span className="skill-credential-topline">
        <span>{credential.category}</span>
        <BadgeCheck size={16} aria-hidden="true" />
      </span>
      <span className="skill-credential-body">
        <img
          src={credential.badge}
          alt={credential.skill + ' skill badge'}
          loading="lazy"
          width={80}
          height={80}
        />
        <span>
          <span className="skill-credential-issuer">MongoDB</span>
          <h4>{credential.skill}</h4>
        </span>
      </span>
      <span className="skill-credential-footer">
        <time dateTime={credential.issuedOn}>{formatCredentialDate(credential.issuedOn)}</time>
        <span>
          View credential <ArrowUpRight size={14} />
        </span>
      </span>
    </button>
  );
}
