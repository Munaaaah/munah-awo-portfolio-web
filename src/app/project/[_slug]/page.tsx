import React from "react";
import Image from "next/image";
import Message from "../../../../public/message.svg";

const ProjectDetails = () => {
  return (
    <main className="text-white font-creatoDisplay">
      <div className="px-12 flex gap-4 ">
        <div className="pt-10 border-t border-r border-l-0 border-b-0 w-[70%]  border-[#FFFFFF33] h-[21px] rounded-lg">
          <p className="font-medium text-[1.5rem]">
            I’m a product designer with 3 years of experience designing &
            building products for <br /> startups & enterprises.
          </p>
        </div>

        <div className="border-[2px] border-[#3B3B3B] h-[168px] w-[232px] rounded-lg p-3 text-white flex flex-col justify-center">
          <p>Genese Solutions</p>

          <div className="mt-5 flex items-center gap-3 text-[14px]">
            <button className="bg-[#7A46FF] rounded-md px-[12px] py-[12px] h-[43px] w-[149px] flex items-center justify-center gap-3 text-center">
              <Image src={Message} width={18} height={18} alt="message" />
              Visit Site
            </button>
          </div>
        </div>
      </div>

      <div className="px-12">
        <h1 className="uppercase font-black leading-none text-[13rem]">
          Genese
        </h1>
      </div>
    </main>
  );
};

export default ProjectDetails;
