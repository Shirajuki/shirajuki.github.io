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

const LargeCard = ({ project }: Props) => {
  return (
    <article className="flex flex-col bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg p-8 gap-8 hover:scale-[1.025] transition-transform duration-500">
      <div className="text-gray w-full h-44 overflow-hidden rounded-lg bg-primary-600">
        {/* <img src={project.image.src} alt={project.image.alt} className="w-full object-cover" /> */}
      </div>
      <section className="flex flex-col text-gray w-full gap-4">
        <h3 className="text-white text-lg font-bold">{project.title}</h3>
        <p>{project?.description}</p>
        <p>{project?.stack?.join(' / ')}</p>
      </section>
    </article>
  );
};

const SmallCard = ({ project }: Props) => {
  return (
    <article className="flex flex-col bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg p-4 gap-4 hover:scale-[1.025] transition-transform duration-500">
      <div className="text-gray w-full h-36 overflow-hidden rounded-lg bg-primary-600">
        {/* <img src={project.image.src} alt={project.image.alt} className="w-full object-cover" /> */}
      </div>
      <section className="flex flex-col text-gray w-full gap-4">
        <h3 className="text-white text-lg font-bold">{project.title}</h3>
      </section>
      <section className="flex gap-2">
        {project.links.map((link) => {
          switch (link.type) {
            case 'demo':
              return (
                <a href={link.href} className="flex items-center justify-center bg-primary-500 w-8 h-8 rounded-sm">
                  D
                </a>
              );
            case 'github':
              return (
                <a href={link.href} className="flex items-center justify-center bg-primary-500 w-8 h-8 rounded-sm">
                  G
                </a>
              );
            case 'figma':
              return (
                <a href={link.href} className="flex items-center justify-center bg-primary-500 w-8 h-8 rounded-sm">
                  F
                </a>
              );
            default:
              return <></>;
          }
        })}
      </section>
    </article>
  );
};

const ProjectCard = ({ project, type = 'large' }: Props) => {
  return type === 'large' ? <LargeCard project={project} /> : <SmallCard project={project} />;
};
export default ProjectCard;
