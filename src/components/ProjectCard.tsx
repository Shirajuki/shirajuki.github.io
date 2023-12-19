import Card from './Card';
import Edge from './svg/Edge';
import Figma from './svg/Figma';
import Github from './svg/Github';

type Props = {
  project: {
    title: string;
    image: {
      src: string;
      alt: string;
    };
    description?: string;
    links: {
      type: string;
      href: string;
    }[];
    stack?: string[];
  };
  type?: 'small' | 'large';
};

type IconProps = {
  link: {
    type: string;
    href: string;
  };
};
const IconWrapper = ({ link }: IconProps) => {
  switch (link.type) {
    case 'demo':
      return (
        <a
          href={link.href}
          className="flex items-center justify-center bg-primary-100 w-8 h-8 rounded-md p-[0.35rem] hover:brightness-125 hover:scale-105 transition-all duration-500"
        >
          <Edge />
        </a>
      );
    case 'github':
      return (
        <a
          href={link.href}
          className="flex items-center justify-center bg-primary-100 w-8 h-8 rounded-md p-[0.35rem] hover:brightness-125 hover:scale-105 transition-all duration-500"
        >
          <Github />
        </a>
      );
    case 'figma':
      return (
        <a
          href={link.href}
          className="flex items-center justify-center bg-primary-100 w-8 h-8 rounded-md p-[0.35rem] hover:brightness-125 hover:scale-105 transition-all duration-500"
        >
          <Figma />
        </a>
      );
    default:
      return <div hidden></div>;
  }
};

const LargeCard = ({ project }: Props) => {
  return (
    <Card className="flex-col p-8 gap-8">
      <div className="absolute w-2/12 h-2 bg-primary-100 top-0 left-5 rounded-full translate-y-[calc(-0.75rem+1px)] outline outline-3 outline-primary-500"></div>
      <div className="text-gray w-full h-44 overflow-hidden rounded-lg bg-primary-600">
        {/* <img src={project.image.src} alt={project.image.alt} className="w-full object-cover" /> */}
      </div>
      <section className="text-gray w-full grid grid-cols-2 gap-4">
        <h3 className="text-white text-lg font-bold">{project.title}</h3>
        <article className="flex gap-2 justify-end text-white">
          {project.links.map((link, i) => (
            <IconWrapper key={`smallcard-icon-${i}`} link={link} />
          ))}
        </article>
        <div
          className="col-span-2"
          dangerouslySetInnerHTML={{ __html: project?.description ? project.description : '' }}
        ></div>
        <p className="col-span-2">{project?.stack?.join(' / ')}</p>
      </section>
    </Card>
  );
};

const SmallCard = ({ project }: Props) => {
  return (
    <Card className="flex-col p-4 gap-2">
      <div className="text-gray w-full h-36 overflow-hidden rounded-lg bg-primary-600">
        {/* <img src={project.image.src} alt={project.image.alt} className="w-full object-cover" /> */}
      </div>
      <section className="flex flex-col text-gray w-full">
        <h3 className="text-white text-lg font-bold truncate">{project.title}</h3>
      </section>
      <article className="flex gap-2">
        {project.links.map((link, i) => (
          <IconWrapper key={`smallcard-icon-${i}`} link={link} />
        ))}
      </article>
    </Card>
  );
};

const ProjectCard = ({ project, type = 'large' }: Props) => {
  return type === 'large' ? <LargeCard project={project} /> : <SmallCard project={project} />;
};
export default ProjectCard;
