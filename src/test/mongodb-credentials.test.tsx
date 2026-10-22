import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearningPath } from '../components/credentials/LearningPath';
import { mongodbCredentials, mongodbPath } from '../data/mongodbCredentials';

describe('MongoDB skill credentials', () => {
  it('records all 13 distinct skills with issuer verification links and issue dates', () => {
    expect(mongodbCredentials).toHaveLength(mongodbPath.requiredSkills);
    expect(new Set(mongodbCredentials.map((credential) => credential.id)).size).toBe(13);
    expect(new Set(mongodbCredentials.map((credential) => credential.verificationUrl)).size).toBe(
      13,
    );
    for (const credential of mongodbCredentials) {
      expect(new URL(credential.verificationUrl).hostname).toBe('www.credly.com');
      expect(['2026-10-19', '2026-10-20']).toContain(credential.issuedOn);
    }
  });

  it('filters the skills without changing the overall learning path completion', async () => {
    const user = userEvent.setup();
    render(<LearningPath />);
    const cards = () => screen.getAllByRole('button', { name: /^View credential:/ });
    expect(cards()).toHaveLength(13);
    const filter = screen.getByRole('group', { name: 'Filter MongoDB skills' });
    await user.click(within(filter).getByRole('button', { name: 'Security' }));
    expect(cards()).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Encryption at Rest' })).toBeInTheDocument();
    expect(screen.getByText('REQUIRED SKILLS COMPLETED')).toBeInTheDocument();
    await user.click(within(filter).getByRole('button', { name: 'All skills' }));
    expect(cards()).toHaveLength(13);
  });

  it('opens the matching certificate, badge, original PDF and issuer verification link', async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <LearningPath />
      </StrictMode>,
    );
    const trigger = screen.getByRole('button', {
      name: 'View credential: Fundamentals of Data Transformation',
    });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Skill credential' });
    expect(
      within(dialog).getByRole('heading', { name: 'MongoDB Aggregation Fundamentals' }),
    ).toBeVisible();
    expect(
      within(dialog).getByRole('img', { name: 'MongoDB Aggregation Fundamentals certificate' }),
    ).toHaveAttribute('src', './Images/Credentials/MongoDB/aggregation-certificate.webp');
    expect(within(dialog).getByRole('link', { name: 'Open original PDF' })).toHaveAttribute(
      'href',
      './credentials/mongodb/aggregation.pdf',
    );
    expect(within(dialog).getByRole('link', { name: 'Verify on Credly' })).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/95b56f25-4475-4735-8528-5c098a266f20',
    );
    expect(within(dialog).getByText('19 Oct 2026')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Badge' }));
    expect(
      within(dialog).getByRole('img', { name: 'MongoDB Aggregation Fundamentals badge' }),
    ).toHaveAttribute('src', './Images/Credentials/MongoDB/aggregation-badge.png');
    await user.click(within(dialog).getByRole('button', { name: 'Close skill credential' }));
    expect(trigger).toHaveFocus();
    // A different credential starts on its certificate, rather than retaining the previous badge view.
    await user.click(screen.getByRole('button', { name: 'View credential: Encryption at Rest' }));
    const next = screen.getByRole('dialog', { name: 'Skill credential' });
    expect(within(next).getByRole('button', { name: 'Certificate' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(within(next).getByRole('link', { name: 'Verify on Credly' })).toHaveAttribute(
      'href',
      'https://www.credly.com/go/QlqhOLuk',
    );
  });
});
