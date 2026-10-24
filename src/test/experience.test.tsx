import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExperienceSection } from '../sections/ExperienceSection';

describe('professional experience', () => {
  it('shows the current Klyro internship dates and keeps the previous role accessible', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    expect(screen.getByText('13 July 2026 – Present')).toBeVisible();
    expect(screen.getByText('Scheduled completion: 13 January 2027')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Explore Klyro LMS' })).toHaveAttribute(
      'href',
      'https://klyrolms.vercel.app/',
    );
    await user.click(screen.getByRole('button', { name: /Jet Shipping & Logistic/ }));
    expect(screen.getByText('Full time · December 2024 – Present')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Explore JET Cargo Management' })).toHaveAttribute(
      'href',
      'https://nightofsecrets.com/',
    );
    expect(screen.getByText('13 July 2026 – Present')).not.toBeVisible();
    await user.click(screen.getByRole('button', { name: /Klyro \(Pvt\) Ltd/ }));
    expect(screen.getByText('Scheduled completion: 13 January 2027')).toBeVisible();
  });
});
