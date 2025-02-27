import Link from "next/link";
import React from "react";
import Dribbble from "../../public/dribbble.svg";
import Instagram from "../../public/instagram.svg";
import Be from "../../public/be.svg";
import Image from "next/image";

const social = [
  {
    logo: Dribbble,
    link: "",
    alt: "Dribbble",
  },
  {
    logo: Be,
    link: "",
    alt: "Be",
  },
  {
    logo: Instagram,
    link: "",
    alt: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className="text-white p-6 lg:px-12 lg:py-20 py-14 font-creatoDisplay">
      <div className="flex lg:items-end flex-col lg:flex-row lg:gap-96 gap-16">
        <h4 className="font-black text-[3rem] lg:text-[4.5rem] leading-none">
          SAY HI!
        </h4>

        <div className="flex lg:items-end gap-10 lg:gap-32 flex-col lg:flex-row">
          <div className="flex flex-col lg:gap-16 gap-10">
            <p>
              Thanks for looking around. <br /> Stay in touch{" "}
            </p>

            <div className="flex flex-col gap-6">
              <p className="text-[#AAAAAA] font-medium">Contact </p>

              <Link href="mailto:talk2borlah@gmail.com">
                talk2borlah@gmail.com
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[#AAAAAA] font-medium">Find me on </p>

            <div className="flex items-center gap-7">
              {social.map((item, index) => (
                <Link href={item.link} key={index}>
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
        <div className="underline bg-[#FFFFFF33] h-[1px] lg:w-[85%] w-full lg:self-end"></div>
        <p className="font-medium">I’m at work, reach out </p>
      </div>
    </footer>
  );
};

export default Footer;
