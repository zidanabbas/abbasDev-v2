import Coffee from "@/components/elements/Coffee.js";
import CurriculumVitae from "@/components/elements/CurriculumVitae.js";

export default function HeaderHome() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="md:text-3xl text-2xl font-medium flex gap-1">
          Hi, I'm Abbas <p className="animate-shake">👋</p>
        </h1>
        <div className="flex items-center gap-3 px-2">
          <Coffee />
          <CurriculumVitae />
        </div>
      </div>
      <ul className="flex md:space-x-8 space-x-0 px-5 py-2 md:flex-row flex-col ">
        <li className="list-disc text-md">Beginner Front End Dev</li>
        <li className="list-disc text-md">Based in Jakarta 🇮🇩</li>
      </ul>
      <p className="my-2 md:leading-9 leading-7 text-sm">
        An enthusiastic and experienced junior Front-end developer with a strong
        focus on front-end development. Proficient in design and possessing a
        deep understanding of all aspects of web technology. A collaborative
        team player dedicated to creating efficient, scalable, and visually
        appealing web applications.
      </p>
    </div>
  );
}
