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
    <footer className="text-white px-12 py-12 font-creatoDisplay">
      <div className="flex items-end gap-96">
        <h4 className="font-black text-[4.5rem] leading-none">SAY HI!</h4>

        <div className="flex items-end gap-32">
          <div className="flex flex-col gap-16">
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
      <div className="flex gap-4 mt-11 ">
        <div className="underline bg-[#FFFFFF33] h-[1px] w-[85%] self-end"></div>
        <p className="font-medium">I’m at work, reach out </p>
      </div>
    </footer>
  );
};

export default Footer;
