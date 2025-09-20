"use client";

import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import React, { useState, useEffect } from "react";
import { BiLogoGithub } from "react-icons/bi";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import useHasMounted from "@/components/hooks/useHasMounted";
import GitHubCalendar from "react-github-calendar";

function GithubHeader() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true); // Mulai dengan loading=true
  const mounted = useHasMounted();

  useEffect(() => {
    // Jalankan efek ini hanya di klien setelah mount
    setLoading(false);
  }, []); // [] agar hanya dijalankan sekali

  if (!mounted) {
    return (
      <div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded flex justify-center items-center overflow-hidden mx-auto xl:w-[822px] md:w-[480px] lg:w-[750px] ">
        {/* Opsional: Render placeholder atau skeleton di server */}
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Github" icon={<BiLogoGithub size={24} />} />
        <SubHeading>
          <p>My Github Contributions</p>
          <Link href="https://github.com/zidanabbas" target="_blank">
            @zidanabbas
          </Link>
        </SubHeading>
      </div>
      <div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded flex justify-center items-center overflow-hidden mx-auto xl:w-[822px] md:w-[480px] lg:w-[750px] ">
        <GitHubCalendar
          username="zidanabbas"
          colorScheme={theme === "dark" ? "dark" : "light"}
          blockMargin={4}
          blockSize={14}
          fontSize={12}
          loading={loading}
          renderBlock={(block, activity) => (
            <Tooltip
              content={`${activity.count} activities on ${activity.date}`}
              key={block}
              closeDelay={50}
              offset={10}
              className="text-xs rounded-sm px-2"
            >
              {block}
            </Tooltip>
          )}
          blockRadius={3}
        />
      </div>
    </div>
  );
}

export default GithubHeader;
