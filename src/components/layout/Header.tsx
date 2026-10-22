import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { BrandMark } from '../ui/BrandMark';
export function Header() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (menu && event.key === 'Escape') {
          event.preventDefault();
          setMenu(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a className="brand" href="#home" aria-label="Pasindu home" onClick={() => setMenu(false)}>
        <BrandMark />
        <span className="brand-wordmark">
          PASINDU S
          <br />
          <small>DIVYANJANA</small>
        </span>
      </a>
      <nav
        id="main-navigation"
        className={menu ? 'top-nav open' : 'top-nav'}
        aria-label="Main navigation"
      >
        {navigation
          .filter((item) => item.headerLabel)
          .map(({ id, headerLabel }) => (
            <a key={id} href={'#' + id} onClick={() => setMenu(false)}>
              {headerLabel}
            </a>
          ))}
      </nav>
      <a className="header-contact" href="#contact" onClick={() => setMenu(false)}>
        Let’s talk <ArrowUpRight size={16} />
      </a>
      <button
        ref={menuButton}
        className="mobile-menu"
        aria-label={menu ? 'Close menu' : 'Open menu'}
        aria-expanded={menu}
        aria-controls="main-navigation"
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
    </header>
  );
}
