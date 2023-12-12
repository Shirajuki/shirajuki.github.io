type Props = {
  experience: {
    title: string;
    company: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    stack: string[];
  };
};
const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className="flex bg-primary-700 outline outline-primary-500 rounded-lg p-8">
      <div className="text-gray w-2/12 text-right leading-3 text-sm pr-5 pt-2">
        <p>JAN 2020</p>
        <p>···</p>
        <p>JUN 2023</p>
      </div>
      <section className="flex flex-col text-gray w-full gap-4">
        <h3 className="text-white text-lg font-bold">
          {experience.title} · {experience.company}
        </h3>
        <p>{experience.description}</p>
        <p>{experience.stack.join(' / ')}</p>
      </section>
    </article>
  );
};
export default ExperienceCard;
