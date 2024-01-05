import ContainerAOS from "@/app/components/elements/ContainerAOS.js";
import HeaderHome from "../components/header/Header";
import { Divider } from "@nextui-org/react";
import Career from "@/app/home/components/Career";
import ContactCard from "@/app/home/components/ContactCard";
import SkillLists from "@/app/home/components/SkillList";
import { Metadata } from "next";

export const metadata = {
  Metatitle: "Home | Abbas",
  description: "Software Engineer portfolio ideas",
  keywords: "portfolio frontend developer",
  alternates: {
    canonical: `${process.env.DOMAIN}/home`,
  },
};
export default function HomePage() {
  return (
    <ContainerAOS>
      <div className="">
        <HeaderHome />
        <Divider orientation="horizontal" className="my-6" />
        <Career />
        <Divider orientation="horizontal" className="my-6" />
        <SkillLists />
        <Divider orientation="horizontal" className="my-6" />
        <ContactCard />
      </div>
    </ContainerAOS>
  );
}
