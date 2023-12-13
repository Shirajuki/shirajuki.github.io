const social = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/shirajuki',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/shirajuki',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shirajuki/',
  },
  {
    name: 'Email',
    url: 'mailto:jonny@ngoluong.no',
  },
];

const skills = [
  {
    name: 'JavaScript',
    icon: 'tba',
  },
  {
    name: 'TypeScript',
    icon: 'tba',
  },
  {
    name: 'React',
    icon: 'tba',
  },
  {
    name: 'Next.js',
    icon: 'tba',
  },
  {
    name: 'Tailwind CSS',
    icon: 'tba',
  },
  {
    name: 'Node.js',
    icon: 'tba',
  },
  {
    name: 'Express',
    icon: 'tba',
  },
  {
    name: 'MongoDB',
    icon: 'tba',
  },
  {
    name: 'PostgreSQL',
    icon: 'tba',
  },
  {
    name: 'Python',
    icon: 'tba',
  },
  {
    name: 'C',
    icon: 'tba',
  },
  {
    name: 'C++',
    icon: 'tba',
  },
  {
    name: 'C#',
    icon: 'tba',
  },
  {
    name: 'Java',
    icon: 'tba',
  },
  {
    name: 'Rust',
    icon: 'tba',
  },
  {
    name: 'Go',
    icon: 'tba',
  },
];

const BentoGrid = () => {
  return (
    <article id="content">
      <div className="grid grid-cols-3 gap-8 text-sm">
        {/* About me */}
        <article className="p-6 bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg col-span-2 flex flex-col gap-4 hover:scale-[1.025] transition-transform duration-500">
          <p className="bg-clear backdrop-blur-md rounded-lg p-4 h-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, dolore harum. Odit architecto, dolorum
            iste, nobis eum dolor facilis deserunt at fugit nemo ut itaque tenetur illum dignissimos doloremque
            exercitationem.
          </p>
          <p className="bg-clear backdrop-blur-md rounded-lg p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nesciunt et dolore vitae ex vel?
          </p>
        </article>

        {/* Social medias */}
        <article className="p-6 bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg grid grid-cols-2 gap-4 hover:scale-[1.025] transition-transform duration-500">
          {social.map((link) => (
            <div className="bg-clear flex py-2 px-5 justify-center items-center rounded-lg">
              <a href={link.url}>{link.name}</a>
            </div>
          ))}
        </article>

        {/* Skills */}
        <article className="p-6 bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg grid grid-cols-4 gap-2 hover:scale-[1.025] transition-transform duration-500">
          {skills.map((skill) => (
            <div className="bg-clear flex py-[0.9rem] px-5 justify-center items-center rounded-lg">
              <p>{skill.name.substring(0, 1)}</p>
            </div>
          ))}
        </article>

        {/* Cybersecurity + digital garden */}
        <article className="flex flex-col justify-between p-6 bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg col-span-2 hover:scale-[1.025] transition-transform duration-500">
          <p className="bg-clear backdrop-blur-md rounded-lg p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, dolore harum. Odit architecto, dolorum
            iste, nobis eum dolor facilis deserunt at fugit nemo ut itaque tenetur illum dignissimos doloremque
            exercitationem.
          </p>
          <div className="flex justify-end">
            <button className="bg-primary-500 w-8 h-8 rounded-md">
              <a href="https://shirajuki.js.org/">X</a>
            </button>
          </div>
        </article>
      </div>
    </article>
  );
};
export default BentoGrid;
