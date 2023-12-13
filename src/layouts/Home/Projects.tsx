import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'VSAiT Web',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'VSAiT',
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
    title: 'Anki-redesign',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Anki-redesign',
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
      { type: 'demo', href: 'https://shirajuki.js.org/daily-planner/' },
      { type: 'github', href: 'https://github.com/Shirajuki/daily-planner' },
      { type: 'figma', href: 'https://www.figma.com/file/1jsHNKFAHhiX95oUz7eEJo/Daily-Planner?node-id=0%3A1' },
    ],
  },
  {
    title: 'Jukirecipes',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Jukirecipes',
    },
    links: [
      { type: 'demo', href: 'https://shirajuki.js.org/jukirecipes/' },
      { type: 'github', href: 'https://github.com/Shirajuki/jukirecipes' },
      { type: 'figma', href: 'https://www.figma.com/file/ptIEWo50Ftxj3I791KzNSA/Jukirecipes?node-id=0%3A1' },
    ],
  },
  {
    title: 'NTNUi Taekwondo',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Taekwondo',
    },
    links: [{ type: 'demo', href: 'https://tkd.no/' }],
  },
  {
    title: 'Aqua',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: 'https://shirajuki.js.org/aqua/' },
      { type: 'github', href: 'https://github.com/Shirajuki/aqua' },
    ],
  },
  {
    title: 'Battleship',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'Daily Planner',
    },
    links: [
      { type: 'demo', href: 'https://shirajuki.js.org/battleship/' },
      { type: 'github', href: 'https://github.com/Shirajuki/battleship' },
    ],
  },
  {
    title: 'JS rendering benchmark',
    image: {
      src: 'https://via.placeholder.com/640x360',
      alt: 'js-game-rendering-benchmark',
    },
    links: [
      { type: 'demo', href: 'https://shirajuki.js.org/js-game-rendering-benchmark/' },
      { type: 'github', href: 'https://github.com/Shirajuki/js-game-rendering-benchmark' },
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

      <div className="pt-6">
        <a
          href="/projects"
          className="inline-flex items-center justify-between gap-3 bg-primary-100 h-8 text-sm rounded-md p-[0.35rem] px-3 hover:brightness-125 hover:scale-105 transition-all duration-500"
        >
          <p>View full project archive</p>
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
export default Projects;
