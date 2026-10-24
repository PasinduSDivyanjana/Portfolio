import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkSection } from '../sections/WorkSection';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { projects } from '../data/projects';

describe('project browsing', () => {
  it.each([
    {
      name: 'Klyro LMS',
      title: 'From course discovery to completed learning.',
      feature: 'Certificates & verification',
      count: 6,
    },
    {
      name: 'AccessTransit',
      title: 'Making public transport easier to navigate.',
      feature: 'Boarding assistance & operator tools',
      count: 4,
    },
    {
      name: 'DisasterGuard',
      title: 'From local warnings to coordinated response.',
      feature: 'Rescue & relief coordination',
      count: 6,
    },
    {
      name: 'ZENVIA',
      title: 'A considered digital home for skincare.',
      feature: 'Ingredient transparency',
      count: 4,
    },
    {
      name: 'Sakura Elegance',
      title: 'From product discovery to a WhatsApp order.',
      feature: 'WhatsApp order handoff',
      count: 4,
    },
  ])(
    'shows the matching Behind the Build content for $name',
    async ({ name, title, feature, count }) => {
      const user = userEvent.setup();
      render(<WorkSection />);
      await user.click(screen.getByRole('button', { name: 'Explore ' + name }));
      const dialog = screen.getByRole('dialog', { name: 'Project details' });
      const capabilities = within(dialog).getByRole('region', { name: 'Project capabilities' });
      expect(within(capabilities).getByText('BEHIND THE BUILD')).toBeVisible();
      expect(within(capabilities).getByRole('heading', { name: title })).toBeVisible();
      expect(within(capabilities).getByRole('heading', { name: feature })).toBeVisible();
      expect(within(capabilities).getAllByRole('heading', { level: 4 })).toHaveLength(count);
      expect(
        within(capabilities).queryByText('Built around real logistics workflows.'),
      ).not.toBeInTheDocument();
    },
  );
  it('opens the flagship logistics project with its capabilities and website URL', async () => {
    const user = userEvent.setup();
    render(<WorkSection />);
    expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent(
      'JET Cargo Management',
    );
    await user.click(screen.getByRole('button', { name: 'Explore JET Cargo Management' }));
    const dialog = screen.getByRole('dialog', { name: 'Project details' });
    expect(within(dialog).getByRole('link', { name: 'Visit website' })).toHaveAttribute(
      'href',
      'https://nightofsecrets.com/',
    );
    const capabilities = within(dialog).getByRole('region', { name: 'Project capabilities' });
    expect(within(capabilities).getAllByRole('heading', { level: 4 })).toHaveLength(6);
    expect(within(capabilities).getByText(/CODE128 barcodes/)).toBeVisible();
    expect(within(capabilities).getByText(/invoices, receipts, HBL documents/)).toBeVisible();
    expect(within(capabilities).getByText(/Record part payments/)).toBeVisible();
    expect(
      within(dialog).getByRole('img', { name: 'JET Cargo Management preview' }),
    ).toHaveAttribute('src', './Images/Projects/jet-shipping-web.png');
  });
  it('presents DisasterGuard as a React Native group project with its shared repository', async () => {
    const user = userEvent.setup();
    render(<WorkSection />);
    await user.click(screen.getByRole('button', { name: 'Explore DisasterGuard' }));
    const dialog = screen.getByRole('dialog', { name: 'Project details' });
    expect(within(dialog).getByRole('heading', { name: 'DisasterGuard' })).toBeVisible();
    expect(within(dialog).getByText(/3rd-year, 2nd-semester group project/)).toBeVisible();
    expect(within(dialog).getByText('React Native', { exact: true })).toBeVisible();
    expect(within(dialog).getByText('Firebase', { exact: true })).toBeVisible();
    expect(within(dialog).getByRole('link', { name: 'Explore source' })).toHaveAttribute(
      'href',
      'https://github.com/KalpaOfficial/Smart-Disaster-Early-Warning-and-Emergency-Coordination-System-for-Sri-Lanka',
    );
    expect(within(dialog).getByRole('img', { name: 'DisasterGuard preview' })).toHaveAttribute(
      'src',
      './Images/Projects/disasterguard-app.jpeg',
    );
  });
  it('presents AccessTransit as an academic group project with its shared repository', async () => {
    const user = userEvent.setup();
    render(<WorkSection />);
    expect(screen.getByRole('group', { name: 'Rotate AccessTransit preview' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Explore AccessTransit' }));
    const dialog = screen.getByRole('dialog', { name: 'Project details' });
    expect(within(dialog).getByText(/3rd-year, 2nd-semester group project/)).toBeVisible();
    expect(within(dialog).getByText('Flutter', { exact: true })).toBeVisible();
    expect(within(dialog).getByText('Firebase', { exact: true })).toBeVisible();
    expect(within(dialog).getByRole('link', { name: 'Explore source' })).toHaveAttribute(
      'href',
      'https://github.com/iWolfyy/AccessTransit',
    );
    expect(within(dialog).getByRole('img', { name: 'AccessTransit preview' })).toHaveAttribute(
      'src',
      './Images/Projects/access-transit-app.jpeg',
    );
  });
  it('shows the Klyro internship project with its public website', async () => {
    const user = userEvent.setup();
    render(<WorkSection />);
    await user.click(screen.getByRole('button', { name: 'Explore Klyro LMS' }));
    const dialog = screen.getByRole('dialog', { name: 'Project details' });
    expect(within(dialog).getByRole('heading', { name: 'Klyro LMS' })).toBeVisible();
    expect(
      within(dialog).getByText(/Built for Klyro \(Pvt\) Ltd during my internship/),
    ).toBeVisible();
    expect(within(dialog).getByRole('link', { name: 'Visit website' })).toHaveAttribute(
      'href',
      'https://klyrolms.vercel.app/',
    );
    expect(within(dialog).getByRole('img', { name: 'Klyro LMS preview' })).toHaveAttribute(
      'src',
      './Images/Projects/klyro-lms-website.png',
    );
  });
  it('filters the archive and restores every project when All work is selected', async () => {
    const user = userEvent.setup();
    const { container } = render(<WorkSection />);
    const archive = () => [...container.querySelectorAll('.archive-project')];
    expect(archive()).toHaveLength(10);
    await user.click(screen.getByRole('button', { name: 'Mobile' }));
    expect(
      archive().map((item) => within(item as HTMLElement).getByRole('heading').textContent),
    ).toEqual(['AccessTransit', 'DisasterGuard', 'Jet Shipping', 'Wellness Tracker']);
    await user.click(screen.getByRole('button', { name: 'Web' }));
    expect(archive()).toHaveLength(6);
    await user.click(screen.getByRole('button', { name: 'All work' }));
    expect(archive()).toHaveLength(10);
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
    expect(
      within(screen.getByRole('dialog')).queryByRole('region', { name: 'Project capabilities' }),
    ).not.toBeInTheDocument();
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
      screen
        .getByRole('group', { name: 'Rotate Jet Shipping preview' })
        .querySelector('.phone-mockup'),
    ).not.toBeNull();
    expect(screen.getByRole('group', { name: 'Rotate ZENVIA preview' })).toHaveTextContent(
      'zenviavietnam.com',
    );
    expect(container.querySelectorAll('.phone-mockup')).toHaveLength(3);
  });
});
