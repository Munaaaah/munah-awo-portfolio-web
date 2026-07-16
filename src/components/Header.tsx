"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dribbble from "../../public/dribbble.svg";
import Instagram from "../../public/instagram.svg";
import LinkedIn from "../../public/linkedIn.svg";
import Be from "../../public/be.svg";
import Munah from "../../public/munah-full.jpg";
import Close from "../../public/Close-icon.svg";
import getContent from "@/app/contentful/getContent";

const Header = () => {
  const { data, error, isLoading }: any = getContent(
    "/header",
    "componentHeader",
  );

  // console.log(data);

  const name = data?.contents?.fields?.name;
  const profession = data?.contents?.fields?.profession;
  const services = data?.contents?.fields?.services;
  const dribbbleLink = data?.contents?.fields?.dribbbleLink;
  const behanceLink = data?.contents?.fields?.behanceLink;
  const contactEmail = data?.contents?.fields?.contactEmail;
  const instagramLink = data?.contents?.fields?.instagramLink;
  const linkedinLink = data?.contents?.fields?.linkedinLink;
  const worksLink = data?.contents?.fields?.worksLink;
  const discover = data?.contents?.fields?.discover;

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

  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Crafts", href: "/#crafts" },
  ];

  return (
    <header className="flex justify-between lg:justify-start z-[9999999] items-center lg:items-start w-full bg-[#09090B] text-white p-6 lg:pl-[52px] lg:pr-6 lg:pt-[69px] lg:pb-8 font-creatoDisplay lg:max-w-[1440px] lg:mx-auto relative">
      <Link
        onClick={() => setShowMenu(false)}
        href={"/"}
        className="flex items-center gap-3 lg:mt-[8px] lg:w-[383px] shrink-0"
      >
        <div className="w-[47px] hidden lg:block h-[48px] border-[0.5px] border-[#7A46FF] rounded-[8px] overflow-hidden">
          <Image
            src={Munah}
            width={47}
            height={48}
            alt="maimunah"
            className="w-full h-full rounded-[8px] object-cover"
          />
        </div>
        <div className="font-medium w-fit">
          <h4 className="lg:text-[18px] lg:leading-8 lg:tracking-[-0.36px] text-nowrap leading-[1.1rem] w-fit sm:text-[1.1rem] text-[1rem]">
            {name}
          </h4>
          <p className="text-[#AAAAAA] text-[14px] lg:text-[16px] lg:leading-6 lg:tracking-[-0.32px] w-fit">
            {profession}
          </p>
        </div>
      </Link>

      <div className="lg:flex items-start hidden lg:ml-[143px]">
        <div className="flex flex-col gap-[8px] mt-[4px] text-nowrap lg:w-[248px] font-medium">
          <p className="text-[#AAAAAA] text-[16px] leading-6 tracking-[-0.32px]">
            Discover
          </p>

          <nav className="flex items-center gap-[31px]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-[16px] leading-6 tracking-[-0.32px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-[16px] text-nowrap ml-[213px] font-medium">
          <p className="text-[#AAAAAA] text-[16px] leading-6 tracking-[-0.32px]">
            Find me on
          </p>

          <div className="flex items-center gap-[21px]">
            {social.map((item, index) => (
              <Link target="_blank" href={item.link || ""} key={index}>
                <Image src={item.logo} alt={item.alt} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        onClick={toggleMenu}
        className="relative w-fit cursor-pointer block lg:hidden"
      >
        {showMenu ? (
          <Image src={Close} alt="menu" width={32} height={32} />
        ) : (
          <p className="underline font-medium w-fit text-[1.1rem]">Menu</p>
        )}
      </div>

      <div
        style={{
          height: `${showMenu ? "460px" : "0"}`,
          transition: "height 0.3s ease-in-out",
          visibility: `${showMenu ? "visible" : "hidden"}`,
        }}
        className="flex flex-col gap-10 font-medium lg:hidden absolute top-24 left-0 bg-[#09090bfc] w-full z-[9999999] p-6 py-10"
      >
        {/* <div className="flex flex-col text-nowrap w-fit gap-4">
          <p className="text-[#AAAAAA] font-medium">Services </p>

          <Link href="">User Experience Design </Link>
        </div> */}

        <div className="flex flex-col text-nowrap w-fit gap-6">
          <p className="text-[#AAAAAA] font-medium">Discover</p>

          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setShowMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[#AAAAAA] font-medium">Contact </p>

          <Link href="mailto:talk2borlah@gmail.com">talk2borlah@gmail.com</Link>
        </div>

        <div className="flex flex-col gap-4  text-nowrap">
          <p className="text-[#AAAAAA] font-medium">Find me on </p>

          <div className="flex items-center gap-7">
            {social.map((item, index) => (
              <Link target="_blank" href={item.link || ""} key={index}>
                <Image src={item.logo} alt={item.alt} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
