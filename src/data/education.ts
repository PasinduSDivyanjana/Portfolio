import type { School } from '../types/portfolio';

// Restored personal records; retain dates and grades from Education.html.
export const degree = {
  title: 'BSc (Hons) in Information Technology',
  specialization: 'Specializing in Software Engineering',
  institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
  logo: './Images/Education/SLIIT Logo.webp',
  duration: '2023 – Present',
  status: 'Undergraduate',
  gpa: '3.35',
};

export const schools: School[] = [
  {
    name: 'Bandaranayake College',
    city: 'Gampaha',
    stage: 'SECONDARY EDUCATION',
    logo: './Images/Education/BC Logo.webp',
    qualifications: [
      {
        year: '2020',
        title: 'G.C.E. Advanced Level Examination',
        summary: 'Physical Science Stream',
        resultsLabel: 'Advanced Level results',
        initiallyOpen: true,
        results: [
          ['Combined Mathematics', 'C'],
          ['Chemistry', 'C'],
          ['Physics', 'C'],
        ],
      },
      {
        year: '2016',
        title: 'G.C.E. Ordinary Level Examination',
        summary: '7 A passes · 2 B passes',
        resultsLabel: '2016 Ordinary Level results',
        results: [
          ['Mathematics', 'A'],
          ['Science', 'A'],
          ['Buddhism', 'A'],
          ['Sinhala Language & Literature', 'A'],
          ['History', 'A'],
          ['Civic Education', 'A'],
          ['Health & Physical Education', 'A'],
          ['English', 'B'],
          ['Drama & Theatre', 'B'],
        ],
      },
      {
        year: '2017',
        title: 'G.C.E. Ordinary Level Examination',
        summary: 'Additional language',
        resultsLabel: '2017 Ordinary Level results',
        results: [['Tamil', 'C']],
      },
    ],
  },
  {
    name: 'St. Sebastian’s College',
    city: 'Kandana',
    stage: 'PRIMARY EDUCATION',
    logo: './Images/Education/Sebastian Logo.webp',
    qualifications: [],
    scholarship: {
      year: '2010',
      title: 'Grade 5 Scholarship Examination',
      score: 163,
      cutoff: 148,
    },
  },
];
