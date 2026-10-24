import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/layout/Header';
import { SkillsSection } from '../sections/SkillsSection';

describe('keyboard and menu navigation', () => {
  it('focuses the opened menu and dismisses it when focus leaves the header', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Header />
        <button>Page content</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('link', { name: 'About' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: 'Selected work' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Page content' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
  it('closes the mobile menu after selecting education', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.click(screen.getByRole('link', { name: 'Education' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
  it('supports arrow, Home, and End keys while moving focus and updating tab content', async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);
    expect(document.querySelector('[data-scene="skills"]')).toHaveAttribute(
      'data-technology-group',
      'Web development',
    );
    expect(document.querySelector('.skill-symbol img')).toHaveAttribute(
      'src',
      './Images/Technologies/react.svg',
    );
    await user.click(screen.getByRole('tab', { name: 'Web development' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Mobile development' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Kotlin');
    expect(document.querySelector('[data-scene="skills"]')).toHaveAttribute(
      'data-technology-group',
      'Mobile development',
    );
    expect(document.querySelector('.skill-symbol img')).toHaveAttribute(
      'src',
      './Images/Technologies/react.svg',
    );
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Backend & databases' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Firebase');
    expect(document.querySelector('[data-scene="skills"]')).toHaveAttribute(
      'data-technology-group',
      'Backend & databases',
    );
    for (const name of ['Tools & deployment', 'Web development']) {
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name })).toHaveFocus();
      expect(screen.getByRole('tabpanel', { name })).toBeVisible();
    }
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Tools & deployment' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{Home}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('React');
  });
  it('dismisses the menu with Escape and the header home or contact links', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
    for (const name of ['Let’s talk', 'Pasindu home']) {
      await user.click(screen.getByRole('button', { name: 'Open menu' }));
      await user.click(screen.getByRole('link', { name }));
      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });
});
