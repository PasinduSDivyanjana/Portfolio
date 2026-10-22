import { SectionLabel } from '../components/ui/SectionLabel';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { profile } from '../data/profile';
import { useClipboard } from '../hooks/useClipboard';
import { SectionArtwork } from '../components/ui/SectionArtwork';
import { contactChannels } from '../data/contactChannels';
export function ContactSection() {
  const { copied, copy } = useClipboard();
  const copyEmail = async () => {
    if (!(await copy(profile.email))) location.href = 'mailto:' + profile.email;
  };
  return (
    <section className="contact section-shell" id="contact">
      <div className="contact-glow" />
      <SectionLabel number="07">GOOD THINGS START WITH A CONVERSATION</SectionLabel>
      <div className="conversation-network">
        <SectionArtwork kind="contact" className="contact-artwork" />
        <nav className="conversation-channels" aria-label="Conversation channels">
          {contactChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.id === 'email' ? undefined : '_blank'}
              rel={channel.id === 'email' ? undefined : 'noreferrer'}
            >
              <img src={channel.icons[0]} alt="" width={18} height={18} />
              <span>{channel.name}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </nav>
      </div>
      <h2>
        Have an idea?
        <br />
        Let’s make it <em>happen.</em>
      </h2>
      <p>
        A website, an app, or something a little unexpected.
        <br />
        I’d love to hear what you have in mind.
      </p>
      <a className="contact-button" href={'mailto:' + profile.email}>
        Say hello <ArrowUpRight size={22} />
      </a>
      <button className="copy-email" onClick={copyEmail}>
        {copied ? 'Copied to clipboard' : profile.email}
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </section>
  );
}
