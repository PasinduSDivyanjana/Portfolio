import { ArrowUp } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';
import { profile } from '../../data/profile';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <a className="footer-name" href="#home" aria-label="Pasindu home">
          <BrandMark />
          <span className="footer-wordmark">{profile.name}</span>
        </a>
        <span className="footer-note">
          BUILT WITH INTENTION <span aria-hidden="true">✳</span>
        </span>
      </div>
      <span className="footer-copyright">
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a className="footer-top" href="#home">
        Back to top <ArrowUp size={16} aria-hidden="true" />
      </a>
    </footer>
  );
}
