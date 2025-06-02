"use client";
import Link from "next/link";
import { BiCoffee } from "react-icons/bi";
import React from "react";
import { Tooltip } from "@nextui-org/react";

export default function Coffee() {
  return (
    <>
      <Tooltip content="Saweria" radius="sm" showArrow="true">
        <Link
          href="https://saweria.co/zidanabbas"
          target="_blank"
          aria-label="saweria"
        >
          <BiCoffee size={24} className="text-3xl" />
        </Link>
      </Tooltip>
    </>
  );
}
