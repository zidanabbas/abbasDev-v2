"use client";

import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import React, { useState, useEffect } from "react";
import { BiLogoGithub } from "react-icons/bi";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import useHasMounted from "@/app/components/hooks/useHasMounted";

function GithubHeader() {
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(false);
  const mounted = useHasMounted();

  useEffect(() => {
    setLoading(true),
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [mounted]);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Github" icon={<BiLogoGithub size={24} />} />
        <SubHeading>
          <p>My Github Contributions</p>
          <Link href="https://github.com/zidanabbas" target="_blank">
            @ryznoxy
          </Link>
        </SubHeading>
      </div>
      <div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded flex justify-center items-center overflow-hidden mx-auto xl:w-[822px] md:w-[480px] lg:w-[750px] ">
        <GitHubCalendar
          username="ryznoxy"
          colorScheme={theme === "dark" ? "dark" : "light"}
          blockMargin={4}
          blockSize={14}
          fontSize={12}
          loading={loading ? true : false}
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
