import type { Certificate } from '../types/portfolio';
// In-progress courses must not be presented as earned certificates.
export const certificates: Certificate[] = [
  {
    title: 'The Customs House Agent (CHA) Certificate Course 2025',
    issuer: 'Sri Lanka Customs',
    status: 'Completed',
  },
  { title: 'Front-End Web Development', issuer: 'University of Moratuwa', status: 'In progress' },
  { title: 'Python Programming', issuer: 'University of Moratuwa', status: 'In progress' },
  { title: 'Python for Beginners', issuer: 'University of Moratuwa', status: 'In progress' },
  { title: 'Web Design for Beginners', issuer: 'University of Moratuwa', status: 'In progress' },
];
export const achievement = {
  title: 'Excellence in International Beauty Partnerships',
  recipient: 'Sakura Elegance (Pvt) Ltd',
  event: 'ICONIC AWARDS SRI LANKA 2025',
  description:
    'The Excellence in International Beauty Partnerships Award of the Year, awarded to Sakura Elegance (Pvt) Ltd at Iconic Awards Sri Lanka 2025.',
  date: 'April 2025',
};
