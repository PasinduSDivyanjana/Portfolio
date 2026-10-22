import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../../data/navigation';
export function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Pasindu home">
        <span className="brand-symbol">
          p<span>.</span>
        </span>
        <span>
          PASINDU
          <br />
          <small>DIVYANJANA</small>
        </span>
      </a>
      <nav className={menu ? 'top-nav open' : 'top-nav'} aria-label="Main navigation">
        {navigation
          .filter((item) => item.headerLabel)
          .map(({ id, headerLabel }) => (
            <a key={id} href={'#' + id} onClick={() => setMenu(false)}>
              {headerLabel}
            </a>
          ))}
      </nav>
      <a className="header-contact" href="#contact">
        Let’s talk <ArrowUpRight size={16} />
      </a>
      <button
        className="mobile-menu"
        aria-label={menu ? 'Close menu' : 'Open menu'}
        aria-expanded={menu}
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
    </header>
  );
}
