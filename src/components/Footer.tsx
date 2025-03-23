"use client";

import Link from "next/link";
import React from "react";
import Dribbble from "../../public/dribbble.svg";
import Instagram from "../../public/instagram.svg";
import LinkedIn from "../../public/linkedIn.svg";
import Be from "../../public/be.svg";
import Image from "next/image";
import getContent from "@/app/contentful/getContent";

const Footer = () => {
  const { data, error, isLoading }: any = getContent(
    "/footer",
    "componentFooter"
  );

  // console.log(data);

  const message = data?.contents?.fields?.message;
  const dribbbleLink = data?.contents?.fields?.dribbbleLink;
  const behanceLink = data?.contents?.fields?.behanceLink;
  const contactEmail = data?.contents?.fields?.contactEmail;
  const instagramLink = data?.contents?.fields?.instagramLink;
  const linkedinLink = data?.contents?.fields?.linkedinLink;
  const heading = data?.contents?.fields?.heading;
  const designedBy = data?.contents?.fields?.designedBy;

  const social = [
    {
      logo: Dribbble,
      link: dribbbleLink,
      alt: "Dribbble",
    },
    {
      logo: Be,
      link: behanceLink,
      alt: "Be",
    },
    {
      logo: Instagram,
      link: instagramLink,
      alt: "Instagram",
    },
    {
      logo: LinkedIn,
      link: linkedinLink,
      alt: "LinkedIn",
    },
  ];

  return (
    <footer className="text-white p-6 lg:px-12 lg:py-20 py-14 font-creatoDisplay">
      <div className="flex lg:items-end flex-col lg:flex-row lg:gap-96 gap-16">
        <h4 className="font-black text-[3rem] lg:text-[4.5rem] leading-none">
          {heading}
        </h4>

        <div className="flex lg:items-end gap-10 lg:gap-32 flex-col lg:flex-row">
          <div className="flex flex-col lg:gap-16 gap-10">
            <p className="w-[70%]">{message}</p>

            <div className="flex flex-col gap-6">
              <p className="text-[#AAAAAA] font-medium">Contact </p>

              <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[#AAAAAA] font-medium">Find me on </p>

            <div className="flex items-center gap-7">
              {social.map((item, index) => (
                <Link href={item.link || ""} key={index}>
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={32}
                    height={32}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-4 gap-6 mt-11 flex-col lg:flex-row">
        <div className="underline bg-[#FFFFFF33] h-[1px] lg:w-[75%] w-full lg:self-end"></div>
        <p className="font-medium">{designedBy} </p>
      </div>
    </footer>
  );
};

export default Footer;
