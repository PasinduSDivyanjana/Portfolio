import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';
import { profile } from '../../data/profile';
export function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-name" href="#home" aria-label="Pasindu home">
        <BrandMark />
        <span className="footer-wordmark">{profile.name}</span>
      </a>
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>
        BUILT WITH INTENTION <span>✳</span>
      </span>
      <a href="#home">
        BACK TO TOP <ArrowUpRight size={15} />
      </a>
    </footer>
  );
}
