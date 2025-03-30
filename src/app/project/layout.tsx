import React from "react";
import { Children } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maimunah | Projects",
  description: "Maimunah's Projects",
};

const ProjectLayout = ({ children }: Children) => {
  return <div>{children}</div>;
};

export default ProjectLayout;
