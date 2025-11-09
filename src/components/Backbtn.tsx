"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Backbtn = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="my-4 mb-8 font-medium">
      Go back{" "}
    </button>
  );
};

export default Backbtn;
