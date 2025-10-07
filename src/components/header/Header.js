import Coffee from "@/components/elements/Coffee.js";
import CurriculumVitae from "@/components/elements/CurriculumVitae.js";

export default function HeaderHome() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="md:text-3xl text-2xl font-medium flex gap-1">
          Hi, I'm abbas <p className="animate-shake">👋</p>
        </h1>
        <div className="flex items-center gap-3 px-2">
          <Coffee />
          <CurriculumVitae />
        </div>
      </div>
      <ul className="flex md:space-x-8 space-x-0 px-5 py-2 md:flex-row flex-col ">
        <li className="list-disc text-md">Frontend Developer</li>
        <li className="list-disc text-md">Based in Jakarta 🇮🇩</li>
      </ul>
      <p className="my-2 md:leading-9 leading-7 text-sm">
      An enthusiastic and dedicated Frontend Developer with a passion for building applications that are not only visually appealing and user-friendly, but also efficient and scalable. I have a strong foundation in translating design concepts into seamless web functionality. As a collaborative team player, I am committed to creating innovative and high-quality web solutions.
      </p>
    </div>
  );
}
