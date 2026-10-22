import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/layout/Header';
import { SkillsSection } from '../sections/SkillsSection';

describe('keyboard and menu navigation', () => {
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
    await user.click(screen.getByRole('tab', { name: 'Web development' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Mobile & backend' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Kotlin');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Web development' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Mobile & backend' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{Home}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('React');
  });
});
