import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'VSAiT medlemsside',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'VSAiT medlemsside',
    },
    description:
      'A membership management system built with Python Django for the student organisation, VSAiT, that manages events and registrations. This is a project that is still being worked on, the demo may subject to change.',
    stack: ['Python', 'Django', 'PostgreSQL', 'TailwindCSS'],
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'HSK-flip-card',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'HSK-flip-card',
    },
    description:
      'A Progressive Web App made using HTML, CSS and javascript. Works as a flipcard mobile webapp used to memorize and learn chinese characters.\nPossible for either Simplified- or Traditional chinese characters\nCards learnt are saved using LocalStorage.\nSpaced Repetition Study algorithm built in, using a custom algorithm of SM-2',
    stack: ['Python', 'Django', 'PostgreSQL', 'TailwindCSS'],
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
];

const smallProjects = [
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
  {
    title: 'Daily Planner',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: '#' },
      { type: 'github', href: '#' },
      { type: 'figma', href: '#' },
    ],
  },
];

const Projects = () => {
  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold pt-20 pb-8 tracking-wide">Projects</h2>
      <div className="flex flex-col gap-8 mb-12">
        {projects.map((project, i) => (
          <ProjectCard key={`projects-${i}`} project={project} />
        ))}
      </div>

      <article className="grid grid-cols-3 gap-8">
        {smallProjects.map((project, i) => (
          <ProjectCard key={`sm-projects-${i}`} project={project} type="small" />
        ))}
      </article>

      <div className="pt-6 text-md font-bold">
        <a href="/projects">View full project archive</a>
      </div>
    </section>
  );
};
export default Projects;
