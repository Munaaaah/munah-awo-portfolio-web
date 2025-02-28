import React from "react";
import Image from "next/image";
import Message from "../../../../public/message.svg";
import Bg from "../../../../public/genese_bg.jpg";
import EshanliProject from "../../../../public/Eshanli.png";
import OtherProjects from "@/components/OtherProjects";

let type = "video";

const ProjectDetails = () => {
  return (
    <main className="text-white font-creatoDisplay bg-[#191919]">
      <section className="p-6 lg:px-12 flex flex-col lg:flex-row lg:gap-4 gap-32">
        <div className="pt-10 border-t border-r border-l-0 border-b-0 lg:w-[70%]  border-[#FFFFFF33] h-[21px] rounded-lg">
          <h1 className="uppercase font-black leading-none text-[4.37rem] lg:text-[13rem]">
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

      <div className="flex lg:items-center flex-col lg:flex-row lg:gap-32 gap-12 lg:mt-32 mt-6 p-6 lg:px-12 w-full">
        <div className="flex gap-4 flex-nowrap  ">
          {["Website", "Mobile"].map((item, index) => (
            <span
              className="border-white border px-2 py-2 lg:text-[14px] w-fit  lg:w-full text-[8px] rounded-lg"
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
          backgroundPosition: "0px 0px  -150px 0px",
        }}
        className="h-[784px] mt-20 bg-no-repeat w-full bg-cover flex items-center justify-center relative bg-[#191919]"
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

      <section className=" p-6 lg:pt-16 lg:px-12">
        <div className="flex justify-between flex-col lg:flex-row lg:gap-4 gap-16">
          <div>
            <h4 className="text-[#AAAAAA] font-medium mb-1">The Services </h4>
            <a href="mailto:talk2borlah@gmail.com" className="">
              talk2borlah@gmail.com
            </a>
          </div>
          <div className="lg:w-[50%]">
            <h4 className="text-[2rem] ">The Challenge </h4>
            <p className="mt-3">
              Danish designer Stine Goya launched her eponymous label in 2006 as
              a point of difference. The Scandinavian design aesthetic had for
              decades been synonymous with minimalist design and muted palette.
              This is the second site we make for Goya, where the first site was
              all about capturing the seasons and the colors of the collections,
              this one is much more about establishing the new brand identity
              and making a high performing commerce site with optimised costumer
              journeys.
            </p>
          </div>
        </div>

        <div className="flex gap-24 flex-col lg:flex-row mt-28">
          <div className="lg:w-[550px] lg:h-[684px]">
            <Image
              src={Bg}
              width={550}
              height={684}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:w-[550px] lg:h-[684px] lg:mt-28">
            <Image
              src={Bg}
              width={550}
              height={684}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:w-[50%] mt-24">
          <h4 className="text-[2rem] ">Research and Insights</h4>
          <p className="mt-3">
            Danish designer Stine Goya launched her eponymous label in 2006 as a
            point of difference. The Scandinavian design aesthetic had for
            decades been synonymous with minimalist design and muted palette.
            This is the second site we make for Goya, where the first site was
            all about capturing the seasons and the colors of the collections,
            this one is much more about establishing the new brand identity and
            making a high performing commerce site with optimised costumer
            journeys.
          </p>
        </div>

        <div className="flex lg:gap-24 gap-12 flex-col lg:flex-row mt-28">
          <div className="lg:w-[550px] min-w-[46%] lg:h-[684px]">
            <Image
              src={Bg}
              width={550}
              height={684}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:w-[550px] min-w-[46%] lg:h-[684px] mt-9">
            <Image
              src={Bg}
              width={550}
              height={684}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full lg:h-[684px] mt-6">
          <Image
            src={Bg}
            width={1233}
            height={684}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] mt-16">
          <h4 className="text-[2rem] ">The Solution </h4>
          <p className="mt-3">
            Danish designer Stine Goya launched her eponymous label in 2006 as a
            point of difference. The Scandinavian design aesthetic had for
            decades been synonymous with minimalist design and muted palette.
            This is the second site we make for Goya, where the first site was
            all about capturing the seasons and the colors of the collections,
            this one is much more about establishing the new brand identity and
            making a high performing commerce site with optimised costumer
            journeys.
          </p>
        </div>

        <div className="w-full lg:h-[684px] mt-24">
          <Image
            src={Bg}
            width={1233}
            height={684}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-[50%] mt-16">
          <h4 className="text-[2rem] ">Learnings </h4>
          <p className="mt-3">
            Danish designer Stine Goya launched her eponymous label in 2006 as a
            point of difference. The Scandinavian design aesthetic had for
            decades been synonymous with minimalist design and muted palette.
            This is the second site we make for Goya, where the first site was
            all about capturing the seasons and the colors of the collections,
            this one is much more about establishing the new brand identity and
            making a high performing commerce site with optimised costumer
            journeys.
          </p>
        </div>

        <div className="w-full lg:h-[684px] mt-24">
          <Image
            src={Bg}
            width={1233}
            height={684}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="lg:pl-12 pl-6">
        <OtherProjects />
      </div>
    </main>
  );
};

export default ProjectDetails;
