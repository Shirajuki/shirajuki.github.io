import ExperienceCard from '../../components/ExperienceCard';

const experiences = [
  {
    title: 'Consultant',
    company: 'Omegapoint Norge',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2023-06-01'),
    description:
      'I mostly enjoy working on the web, whether that be UX/UI designing an application, on the front-end building the application, or on the back-end connecting APIs and Databases to an application...',
    stack: ['Next.js', 'Typescript', 'Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  },
  {
    title: 'Consultant',
    company: 'Omegapoint Norge',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2023-06-01'),
    description:
      'I mostly enjoy working on the web, whether that be UX/UI designing an application, on the front-end building the application, or on the back-end connecting APIs and Databases to an application...',
    stack: ['Next.js', 'Typescript', 'Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  },
  {
    title: 'Consultant',
    company: 'Omegapoint Norge',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2023-06-01'),
    description:
      'I mostly enjoy working on the web, whether that be UX/UI designing an application, on the front-end building the application, or on the back-end connecting APIs and Databases to an application...',
    stack: ['Next.js', 'Typescript', 'Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
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

      <div className="pt-6 text-md font-bold">
        <a href="/resume.pdf">View full resume</a>
      </div>
    </section>
  );
};

export default Experience;
