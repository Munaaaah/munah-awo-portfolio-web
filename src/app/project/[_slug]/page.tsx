import React from "react";
import Image from "next/image";
import Message from "../../../../public/message.svg";
import Bg from "../../../../public/genese_bg.jpg";
import EshanliProject from "../../../../public/Eshanli.png";

let type = "video";

const ProjectDetails = () => {
  return (
    <main className="text-white font-creatoDisplay">
      <section className="px-12 flex gap-4 ">
        <div className="pt-10 border-t border-r border-l-0 border-b-0 w-[70%]  border-[#FFFFFF33] h-[21px] rounded-lg">
          <h1 className="uppercase font-black leading-none text-[13rem]">
            Genese
          </h1>
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
      </section>

      <div className="flex items-center gap-32 mt-32 px-12 w-full">
        <div className="flex gap-4 flex-nowrap  ">
          {["Website", "Mobile"].map((item, index) => (
            <span
              className="border-white border px-2 py-2 lg:text-[14px] w-full text-[8px] rounded-lg"
              key={index}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="w-full">
          <p className="font-medium lg:text-[1.5rem] ">
            I’m a product designer with 3 years of experience designing &
            building products for <br /> startups & enterprises.
          </p>
        </div>
      </div>

      <section
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "0px -150px",
        }}
        className="h-[784px] mt-20 bg-no-repeat w-full bg-cover flex items-center justify-center relative"
      >
        <div className="bg-[#00000033] absolute top-0 left-0 w-full h-full"></div>
        <div className="absolute">
          {type === "image" ? (
            <div className="lg:w-[228px] lg:h-[464px] w-[139px] h-[283px]">
              <Image src={EshanliProject} alt={""} width={228} height={464} />
            </div>
          ) : (
            <video
              src="https://res.cloudinary.com/worldsalt/video/upload/v1740550018/genese_yrfclh.mov"
              autoPlay
              muted
              playsInline
              loop
              className="w-[576px] h-[348px] "
            />
          )}
        </div>
      </section>

      <section></section>
    </main>
  );
};

export default ProjectDetails;
