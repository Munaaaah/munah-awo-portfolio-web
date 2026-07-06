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
    "componentFooter",
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
    <footer className="bg-[#09090B] text-white font-creatoDisplay">
      <div className="p-6 py-14 lg:p-0 lg:h-[392px] lg:max-w-[1440px] lg:mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:pl-[50px]">
          <h4 className="font-medium text-[24px] lg:text-[32px] leading-8 tracking-[-0.64px] lg:w-[420px] lg:pt-[123px]">
            {heading || "Let’s create something meaningful together"}
          </h4>

          <div className="lg:ml-[132px] lg:pt-[136px]">
            <p className="text-[16px] leading-6 tracking-[-0.32px] font-medium">
              Stay in touch
            </p>

            <div className="mt-[27px] flex flex-col lg:flex-row gap-10 lg:gap-0">
              <div className="flex flex-col gap-[25px] lg:w-[267px] text-[16px] leading-6 tracking-[-0.32px] font-medium">
                <p className="text-[#AAAAAA]">Contact </p>

                <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[#AAAAAA] text-[16px] leading-6 tracking-[-0.32px] font-medium">
                  Find me on
                </p>

                <div className="flex items-center gap-7">
                  {social.map((item, index) => (
                    <Link target="_blank" href={item.link || ""} key={index}>
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
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-[17px] mt-11 lg:mt-[48px] lg:pl-[50px] lg:pr-[82px]">
          <div className="bg-[#FFFFFF33] h-[1px] w-full lg:flex-1"></div>
          <p className="font-medium text-[16px] leading-6 tracking-[-0.32px] text-[#AAAAAA] lg:w-[267px] shrink-0">
            {designedBy || "Designed and built by Munah and Iyo"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
