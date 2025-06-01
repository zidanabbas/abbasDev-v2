import React from "react";
import { BiLogoSpotify } from "react-icons/bi";
import SubHeading from "@/app/components/elements/SubHeading";
import Heading from "@/app/components/elements/Heading";
import SpotifyCard from "../SpotifyCard";

export default function Spotify() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Spotify" icon={<BiLogoSpotify size={24} />} />
        <SubHeading>
          <p>Fetch API from Spotify</p>
        </SubHeading>
      </div>
      <SpotifyCard />
    </div>
  );
}
