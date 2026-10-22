import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkSection } from '../sections/WorkSection';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { projects } from '../data/projects';

describe('project browsing', () => {
  it('filters the archive and restores every project when All work is selected', async () => {
    const user = userEvent.setup();
    const { container } = render(<WorkSection />);
    const archive = () => [...container.querySelectorAll('.archive-project')];
    expect(archive()).toHaveLength(6);
    await user.click(screen.getByRole('button', { name: 'Mobile' }));
    expect(
      archive().map((item) => within(item as HTMLElement).getByRole('heading').textContent),
    ).toEqual(['Jet Shipping', 'Wellness Tracker']);
    await user.click(screen.getByRole('button', { name: 'Web' }));
    expect(archive()).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'All work' }));
    expect(archive()).toHaveLength(6);
  });

  it('opens the selected project with its real link and restores focus when closed', async () => {
    const user = userEvent.setup();
    render(<WorkSection />);
    const trigger = screen.getByRole('button', { name: 'Explore ZENVIA' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Project details' });
    expect(within(dialog).getByRole('heading', { name: 'ZENVIA' })).toBeVisible();
    expect(within(dialog).getByRole('link', { name: 'Visit website' })).toHaveAttribute(
      'href',
      'https://zenviavietnam.com/',
    );
    await user.click(within(dialog).getByRole('button', { name: 'Close project' }));
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Explore Jet Shipping' }));
    expect(
      within(screen.getByRole('dialog')).getByRole('heading', { name: 'Jet Shipping' }),
    ).toBeVisible();
  });

  it('keeps phone and browser presentations correct when featured projects are reordered', () => {
    const reordered = [...projects.filter((project) => project.featured)].reverse();
    const { container } = render(
      <>
        {reordered.map((project) => (
          <FeaturedProject key={project.id} project={project} onSelect={() => {}} />
        ))}
      </>,
    );
    expect(
      screen.getByRole('button', { name: 'Explore Jet Shipping' }).querySelector('.phone-mockup'),
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Explore ZENVIA' })).toHaveTextContent(
      'zenviavietnam.com',
    );
    expect(container.querySelectorAll('.phone-mockup')).toHaveLength(1);
  });
});
