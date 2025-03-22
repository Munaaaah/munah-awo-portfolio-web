import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dribbble from "../../public/dribbble.svg";
import Instagram from "../../public/instagram.svg";
import LinkedIn from "../../public/linkedIn.svg";
import Be from "../../public/be.svg";
import Munah from "../../public/munah-full.jpg";
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
  {
    logo: LinkedIn,
    link: "",
    alt: "LinkedIn",
  },
];

const Header = () => {
  return (
    <header className="flex items-center text-white p-6 lg:px-12 py-12 gap-40 font-creatoDisplay">
      <Link href={"/"} className="flex items-center gap-3 ">
        <div className="w-[47px] h-[47px] bg-gradient-to-tr from-[#22F890] p-[1px] to-[#FFD027] rounded-lg">
          <Image
            src={Munah}
            width={47}
            height={47}
            alt="maimunah"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <div className="font-medium ">
          <h4 className="lg:text-[1.4rem] text-nowrap sm:text-[1rem] text-[0.8rem]">
            Awotundun Maimunah{" "}
          </h4>
          <p className="text-[#AAAAAA] text-[12px] lg:text-[1rem]">
            Product Designer{" "}
          </p>
        </div>
      </Link>

      <div className="lg:flex items-end gap-32 font-medium hidden ">
        <div className="flex flex-col text-nowrap w-fit gap-6">
          <p className="text-[#AAAAAA] font-medium">Services </p>

          <Link href="">User Experience Design </Link>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-[#AAAAAA] font-medium">Contact </p>

          <Link href="mailto:talk2borlah@gmail.com">talk2borlah@gmail.com</Link>
        </div>

        <div className="flex flex-col gap-5  text-nowrap">
          <p className="text-[#AAAAAA] font-medium">Find me on </p>

          <div className="flex items-center gap-7">
            {social.map((item, index) => (
              <Link href={item.link} key={index}>
                <Image src={item.logo} alt={item.alt} width={32} height={32} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
