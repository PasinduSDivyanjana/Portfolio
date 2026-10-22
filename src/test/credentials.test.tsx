import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';

describe('personal records', () => {
  it('preserves the degree, schools, all exam results, and scholarship record', async () => {
    const user = userEvent.setup();
    const { container } = render(<EducationSection />);
    expect(screen.getByText('3.35')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'St. Sebastian’s College' })).toBeInTheDocument();
    expect(screen.getByText('163')).toBeInTheDocument();
    const qualifications = container.querySelectorAll('details');
    await user.click(screen.getByText('2016'));
    expect(qualifications[1]).toHaveAttribute('open');
    expect(qualifications[1].querySelectorAll('dt')).toHaveLength(9);
    expect(qualifications[1]).toHaveTextContent('Health & Physical Education');
    await user.click(screen.getByText('2017'));
    expect(qualifications[2]).toHaveAttribute('open');
    expect(qualifications[2]).toHaveTextContent('Tamil');
  });

  it('distinguishes completed qualifications from ongoing courses and opens the award photograph', async () => {
    const user = userEvent.setup();
    const { container } = render(<CertificationsSection />);
    expect(container.querySelectorAll('.certificate-record')).toHaveLength(5);
    expect(screen.getAllByText('In progress')).toHaveLength(4);
    expect(screen.getAllByText('Completed', { exact: true })).toHaveLength(1);
    expect(screen.getByText('Sakura Elegance (Pvt) Ltd', { exact: true })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'View achievement photo' }));
    const dialog = screen.getByRole('dialog', { name: 'Achievement photograph' });
    expect(dialog.querySelector('img')).toHaveAttribute('src', './Images/My Profile.jpg');
    await user.click(screen.getByRole('button', { name: 'Close achievement photograph' }));
    expect(dialog).not.toHaveAttribute('open');
  });
});
