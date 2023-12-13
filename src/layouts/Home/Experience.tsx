import ExperienceCard from '../../components/ExperienceCard';

const experiences = [
  {
    title: 'Consultant',
    company: 'Omegapoint Norge',
    date: 'SEP 2023 - PRESENT',
    description: `<p>Led and managed crucial projects in a short period of time. Enhanced the company's website with styling, UI updates, migration to new versions, and essential accessibility improvements. Directed both internal and external cybersecurity Capture the Flag events and engagements, overseeing planning, infrastructure setup, challenge development, and Azure cloud operations, engaging hundreds of participants across both these endeavors.</p>`,
    stack: ['Sanity', 'Next.js', 'Tailwind', 'JavaScript', 'Azure', 'TypeScript', '.NET', 'Blazor', 'Python'],
  },
  {
    title: 'Consultant',
    company: 'ITverket',
    date: 'JUN - AUG 2022',
    description: `<p>Developed multiple system status dashboards for BOS (Bertel O. Steen) as a solution to ease system status monitoring through the parsing of millions of daily log events in Splunk. Led the UI design for cohesive and visually consistent dashboards.</p>`,
    stack: ['Splunk', 'Figma', 'Docker', '.NET', 'JavaScript', 'Python'],
  },
  {
    title: 'Front-End Developer',
    company: 'NTNUI Dans',
    date: 'JAN - MAY 2021',
    description: `<p>Designed and developed a web-based management system for the new NTNUi Dans website, dedicated to course and registration management. Executed as part of IT2901 - Informatics Project II. Led the UX/UI design and implementation for a visually unified and user-friendly website.</p>`,
    stack: ['React', 'TypeScript', 'JavaScript', 'Firebase', 'Express', 'Cypress'],
  },
];

const Experience = () => {
  return (
    <section id="experience">
      <h2 className="text-center text-4xl font-bold pt-20 pb-8 tracking-wide">Experience</h2>
      <div className="flex flex-col gap-8">
        {experiences.map((experience, i) => (
          <ExperienceCard key={`experience-${i}`} experience={experience} />
        ))}
      </div>

      <div className="pt-6">
        <a
          href="/resume.pdf"
          className="inline-flex items-center justify-between gap-3 bg-primary-100 h-8 text-sm rounded-md p-[0.35rem] px-3 hover:brightness-125 hover:scale-105 transition-all duration-500"
        >
          <p>View full resume</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Experience;
