import ContainerAOS from "@/components/elements/ContainerAOS.js";
import { Divider } from "@nextui-org/react";
import Header from "./components/Header";
import Certificates from "@/app/about/components/Certificates.js";
import Education from "@/app/about/components/Education";

export const metadata = {
  title: "About | Abbas",
  description: "A short by Abbas",
};
export default function AboutPage() {
  return (
    <>
      <ContainerAOS>
        <div className="h-full">
          <Header />
          <Divider orientation="horizontal" className="my-4" />
          <Certificates />
          <Education />
        </div>
      </ContainerAOS>
    </>
  );
}
