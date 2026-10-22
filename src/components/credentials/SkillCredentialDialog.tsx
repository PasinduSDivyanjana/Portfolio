import { useState } from 'react';
import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react';
import type { SkillCredential } from '../../types/portfolio';
import { formatCredentialDate } from '../../lib/credentials';
import { Modal } from '../ui/Modal';

export function SkillCredentialDialog({
  credential,
  onClose,
}: {
  credential: SkillCredential | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={credential !== null}
      onClose={onClose}
      label="Skill credential"
      closeLabel="Close skill credential"
      className="project-dialog credential-dialog"
      header={
        <>
          <span className="dialog-eyebrow">
            <BadgeCheck size={16} /> SKILL CREDENTIAL
          </span>
          <span className="dialog-project-number">MONGODB</span>
        </>
      }
    >
      {credential && <CredentialContent key={credential.id} credential={credential} />}
    </Modal>
  );
}

// Reset the preview when selection changes without remounting the native dialog itself.
function CredentialContent({ credential }: { credential: SkillCredential }) {
  const [view, setView] = useState<'certificate' | 'badge'>('certificate');
  return (
    <article className="credential-overview">
      <div className="credential-document">
        <div className="credential-view-switch" role="group" aria-label="Credential preview">
          <button onClick={() => setView('certificate')} aria-pressed={view === 'certificate'}>
            Certificate
          </button>
          <button onClick={() => setView('badge')} aria-pressed={view === 'badge'}>
            Badge
          </button>
        </div>
        <div className={'credential-media credential-media-' + view}>
          <img
            src={view === 'certificate' ? credential.preview : credential.badge}
            alt={credential.title + (view === 'certificate' ? ' certificate' : ' badge')}
          />
        </div>
        <a
          className="credential-original-link"
          href={credential.pdf}
          target="_blank"
          rel="noreferrer"
        >
          <FileText size={15} /> Open original PDF <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="dialog-content credential-details">
        <span className="micro-label">{credential.category} · Skill badge</span>
        <h2>{credential.title}</h2>
        <p>{credential.description}</p>
        <dl className="credential-facts">
          <div>
            <dt>Issued by</dt>
            <dd>MongoDB</dd>
          </div>
          <div>
            <dt>Issued on</dt>
            <dd>
              <time dateTime={credential.issuedOn}>
                {formatCredentialDate(credential.issuedOn)}
              </time>
            </dd>
          </div>
          <div>
            <dt>Learning path</dt>
            <dd>MongoDB Atlas Administrator Path</dd>
          </div>
        </dl>
        <a
          className="project-dialog-link"
          href={credential.verificationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Verify on Credly <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
