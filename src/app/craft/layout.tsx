import React from "react";
import { Children } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maimunah | Crafts",
  description: "Maimunah's Crafts",
};

const CraftLayout = ({ children }: Children) => {
  return <div>{children}</div>;
};

export default CraftLayout;
