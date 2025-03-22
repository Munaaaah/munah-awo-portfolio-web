"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../../public/arrow-right.svg";
import ArrowLeft from "../../public/arrow-left.svg";
import Eshanli from "../../public/Eshanli-bg-img.jpg";
import EshanliProject from "../../public/Eshanli.png";
import Genese from "../../public/genese_bg.jpg";
import PathpalProject from "../../public/pathpal.png";
import Pathpal from "../../public/pathpal-bg-img.jpg";
import ChurchDash from "../../public/churchDash-bg-img.jpg";
import Finovapath from "../../public/Finovapath-bg-img.jpg";
import { parseContentfulContentImage } from "@/app/contentful/contentImage";

const projects = [
  {
    bgImg: Eshanli,
    projectName: "Eshanli 7 App ",
    description: "E-commerce App",
    project: EshanliProject,
    type: "image",
    tag: ["Mobile App", "Shopping "],
  },
  {
    bgImg: Genese,
    projectName: "Genese",
    description: "Development Agency",
    project:
      "https://res.cloudinary.com/worldsalt/video/upload/v1740550018/genese_yrfclh.mov",
    type: "video",
    tag: ["Agency"],
  },
  {
    bgImg: Finovapath,
    projectName: "Finovapath",
    description: "Financial Wellness Platform",
    project:
      "https://res.cloudinary.com/worldsalt/video/upload/v1740550916/finovapath_shnqwc.mov",
    type: "video",
    tag: ["Web Application ", "Website"],
  },
  {
    bgImg: ChurchDash,
    projectName: "ChurchDash",
    description: "Build your church app in minutes",
    project:
      "https://res.cloudinary.com/worldsalt/video/upload/v1740550895/churchDash_h5zmht.mov",
    type: "video",
    tag: ["Web Application ", "Mobile"],
  },
  {
    bgImg: Pathpal,
    projectName: "Pathpal",
    description: "Productivity tool for students",
    project: PathpalProject,
    type: "image",
    tag: ["Website", "Mobile"],
  },
];

const ProjectSwiper = ({ projectSlider }) => {
  // console.log(projectSlider);
  const swiperRef = useRef();
  return (
    <section className=" text-white pb-10">
      <div className="flex justify-end  lg:px-12 px-6">
        <div className="flex items-center justify-end gap-12">
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="cursor-pointer"
          >
            <Image
              src={ArrowLeft}
              alt={"arrow left"}
              width={32}
              height={32}
              className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px]"
            />
          </div>

          <div
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            className="cursor-pointer"
          >
            <Image
              src={ArrowRight}
              alt={"arrow right"}
              width={32}
              height={32}
              className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px]"
            />
          </div>
        </div>
      </div>
      <Swiper
        // slidesPerView={width <= 1024 ? 1 : 3}
        slidesPerView={"auto"}
        spaceBetween={24}
        // freeMode={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        speed={10000}
        loop={true}
        autoplay={{ delay: 0 }}
        // allowTouchMove={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="pt-[12px] pb-[12px] mySwiper mt-8"
        style={{
          "--swiper-pagination-color": "none",
          "--swiper-pagination-bullet-inactive-color": "none",
          "--swiper-pagination-bullet-inactive-opacity": "0",
        }}
      >
        {projectSlider?.map(({ fields }, index) => (
          <SwiperSlide
            key={index}
            className=" lg:w-[565px] lg:h-[684px] w-[365px] h-[417px] font-medium cursor-pointer relative"
          >
            <div className="bg-[#00000033] absolute top-0 left-0 w-full h-full"></div>
            <Link
              href={`/project/${fields?.slug}`}
              className="lg:w-[565px] lg:h-[684px] w-[365px] h-[417px] bg-no-repeat bg-cover block bg-top  z-[999]"
              style={{
                backgroundImage: `url(${`https:${
                  parseContentfulContentImage(fields?.backgroundImage).src
                }`})`,
              }}
            >
              <div className="absolute z-[999] w-full h-full left-0 p-[18px] flex flex-col  ">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="lg:text-[16px] text-[10px]">
                      {fields?.projectName}
                    </h5>
                    <p className="lg:text-[12px] text-[ 7px]">
                      {fields?.projectType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {fields?.tags &&
                      fields?.tags?.map((item, index) => (
                        <span
                          className="border-white border px-2 py-2 lg:text-[14px] text-[8px] rounded-lg capitalize"
                          key={index}
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex items-center justify-center h-full  self-center">
                  {!fields?.videoLink ? (
                    <div className="lg:w-[228px] lg:h-[464px] w-[139px] h-[283px]">
                      <Image
                        src={`https:${
                          parseContentfulContentImage(fields?.projectImage).src
                        }`}
                        alt={
                          parseContentfulContentImage(fields?.projectImage).alt
                        }
                        width={228}
                        height={464}
                      />
                    </div>
                  ) : (
                    <video
                      src={fields?.videoLink}
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="w-[468px] h-[260px] "
                    />
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProjectSwiper;
