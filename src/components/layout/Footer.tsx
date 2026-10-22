import { ArrowUpRight } from 'lucide-react';
export function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-name" href="#home">
        pasindu<span>.</span>
      </a>
      <span>© {new Date().getFullYear()} Pasindu Divyanjana</span>
      <span>
        BUILT WITH INTENTION <span>✳</span>
      </span>
      <a href="#home">
        BACK TO TOP <ArrowUpRight size={15} />
      </a>
    </footer>
  );
}
