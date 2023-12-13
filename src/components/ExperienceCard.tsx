type Props = {
  experience: {
    title: string;
    company: string;
    date: string;
    description: string;
    stack: string[];
  };
};
const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className="flex bg-clear backdrop-blur-md outline outline-primary-500 rounded-lg p-6 hover:scale-[1.025] transition-transform duration-500">
      <div className="text-gray w-3/12 text-left leading-3 text-sm pt-2">
        <p>{experience.date}</p>
      </div>
      <section className="grid grid-cols-2 text-gray w-full gap-4">
        <h3 className="text-white text-lg font-bold">
          {experience.title} · {experience.company}
        </h3>
        <article className="flex gap-2 justify-end text-white">
          <a
            href="#"
            className="flex items-center justify-center bg-primary-100 w-8 h-8 rounded-md p-[0.35rem] hover:brightness-125 hover:scale-105 transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </article>
        <div className="col-span-2" dangerouslySetInnerHTML={{ __html: experience.description }}></div>
        <p className="col-span-2">{experience.stack.join(' · ')}</p>
      </section>
    </article>
  );
};
export default ExperienceCard;
