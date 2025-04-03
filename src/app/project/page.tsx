"use client";

import Image from "next/image";
import Message from "../../public/message.svg";
import ProjectSwiper from "@/components/ProjectSwiper";
import getContent from "../contentful/getContent";
import Link from "next/link";
import { parseContentfulContentImage } from "../contentful/contentImage";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Project() {
  const { data, error, isLoading }: any = getContent("/projects", "projects");

  if (isLoading) {
    return <Loading />;
  }

  //   if (!data) {
  //     return <div className="text-white">No data found</div>;
  //   }

  //   console.log(data);

  interface ProjectFields {
    slug: string;
    backgroundImage: any; // Replace 'any' with the appropriate type
    projectName: string;
    projectType: string;
    tags?: string[];
    projectImage?: any; // Replace 'any' with the appropriate type
    projectWebImage?: any; // Replace 'any' with the appropriate type
    videoLink?: string;
  }

  const listOfProjects: { fields: ProjectFields }[] | undefined =
    data?.contents?.fields?.listOfProjects;

  const heading = data?.contents?.fields?.heading;

  return (
    <>
      <Header />
      <main className="text-white font-creatoDisplay  bg-[#191919]">
        <section className="p-6 lg:px-12 flex flex-col lg:flex-row lg:gap-4 gap-5">
          <div className="w-full">
            <div className="pt-10 border-t border-r border-l-0 border-b-0 w-full border-[#FFFFFF33] h-[21px] rounded-lg"></div>
            <h1 className="uppercase h-full font-black leading-none  w-[45%] text-[4.37rem] lg:text-[8rem]">
              {heading}
            </h1>
          </div>
        </section>

        <section
          className="text-white p-6 lg:px-12 lg:py-20 mt-6 py-14 font-creatoDisplay 
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 
gap-6 md:gap-8 lg:gap-10"
        >
          {listOfProjects?.map(({ fields }, index) => (
            <div
              key={index}
              className="  lg:h-[684px] w-[100%] h-[417px] font-medium cursor-pointer relative"
            >
              <div className="bg-[#00000033] absolute top-0 left-0 w-full h-full"></div>
              <Link
                href={`/project/${fields?.slug}`}
                className=" lg:h-[684px] w-[100%] h-[417px] bg-no-repeat bg-cover block bg-top  z-[999]"
                style={{
                  backgroundImage: `url(${`https:${
                    parseContentfulContentImage(fields?.backgroundImage)?.src ||
                    ""
                  }`})`,
                }}
              >
                <div className="absolute z-[999] w-full h-full left-0 top-0 p-[18px] flex flex-col">
                  <div className="flex items-center justify-between w-full">
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
                    {!fields?.videoLink && !fields?.projectWebImage ? (
                      <div
                        className={`lg:w-[228px] lg:h-[464px] w-[139px] h-[283px]`}
                      >
                        <Image
                          src={`https:${
                            parseContentfulContentImage(fields?.projectImage)
                              ?.src || ""
                          }`}
                          alt={
                            parseContentfulContentImage(fields?.projectImage)
                              ?.alt || ""
                          }
                          width={
                            parseContentfulContentImage(fields?.projectImage)
                              ?.width
                          }
                          height={
                            parseContentfulContentImage(fields?.projectImage)
                              ?.height
                          }
                        />
                      </div>
                    ) : fields?.projectWebImage ? (
                      <div className={` lg:h-[260px] h-[160px]`}>
                        <Image
                          src={`https:${
                            parseContentfulContentImage(fields?.projectWebImage)
                              ?.src || ""
                          }`}
                          alt={
                            parseContentfulContentImage(fields?.projectWebImage)
                              ?.alt || ""
                          }
                          width={468}
                          height={260}
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
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
