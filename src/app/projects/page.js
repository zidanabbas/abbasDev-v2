import ContainerAOS from "@/app/components/elements/ContainerAOS";
import ProjectsLists from "./components/ProjectList";

export const metadata = {
  title: "Projects | Abbas",
  description: "Software Engineer portfolio ideas",
  keywords: "portfolio frontend developer",
};

export default function Projects() {
  return (
    <>
      <ContainerAOS>
        <div className="h-full">
          <ProjectsLists />
        </div>
      </ContainerAOS>
    </>
  );
}
