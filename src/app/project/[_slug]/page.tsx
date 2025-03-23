import React from "react";
import Image from "next/image";
import Message from "../../../../public/message.svg";
import FigmaIcon from "../../../../public/Symbol.svg";
import Bg from "../../../../public/genese_bg.jpg";
import EshanliProject from "../../../../public/Eshanli.png";
import OtherProjects from "@/components/OtherProjects";
import getSlugDetails, {
  getProjectDetails,
} from "@/app/contentful/getSlugDetails";
import RichText from "@/app/contentful/RichText";
import Link from "next/link";
import { parseContentfulContentImage } from "@/app/contentful/contentImage";
import DisplayComponent from "@/components/DisplayComponent";

// let type = "video";

// interface ProjectPageParams {
//   _slug: string;
// }

// interface ProjectPageProps {
//   params: ProjectPageParams;
// }

export async function generateStaticParams(): Promise<any[]> {
  const projects = await getProjectDetails();
  return projects;
}

const ProjectDetails = async ({ params }: any) => {
  const { _slug } = await params;

  const data: any = await getSlugDetails("projectCard", _slug);

  // console.log(data);

  const projectName = data?.content?.fields?.projectName;
  const tags = data?.content?.fields?.tags;
  const projectType = data?.content?.fields?.projectType;
  const liveWebsiteUrl = data?.content?.fields?.liveWebsiteUrl;
  const figmaPrototypeLink = data?.content?.fields?.figmaPrototypeLink;
  const videoLink = data?.content?.fields?.videoLink;
  const projectImage = data?.content?.fields?.projectImage;
  const projectWebImage = data?.content?.fields?.projectWebImage;
  const backgroundImage =
    data?.content?.fields?.backgroundImage &&
    parseContentfulContentImage(data?.content?.fields?.backgroundImage);

  const client = data?.content?.fields?.client;
  const role = data?.content?.fields?.role;
  const introduction = data?.content?.fields?.introduction;
  const aboutProject = data?.content?.fields?.aboutProject;
  const otherProjects = data?.content?.fields?.otherProjects;
  const sections = data?.content?.fields?.sections;

  return (
    <main className="text-white font-creatoDisplay  bg-[#191919]">
      <section className="p-6 lg:px-12 flex flex-col lg:flex-row lg:gap-4 gap-5">
        <div className="w-full">
          <div className="pt-10 border-t border-r border-l-0 border-b-0 w-full border-[#FFFFFF33] h-[21px] rounded-lg"></div>
          <h1 className="uppercase h-full font-black leading-none  text-[4.37rem] break-all lg:text-[8rem]">
            {projectName}
          </h1>
        </div>

        <div className="border-[2px] border-[#3B3B3B] h-[168px]  rounded-lg p-3 text-white flex flex-col justify-center">
          <p>Important Links</p>

          <div className="mt-5 flex items-center gap-3 text-[14px]">
            {liveWebsiteUrl && (
              <Link
                target="_blank"
                href={liveWebsiteUrl}
                className="bg-[#7A46FF] rounded-md px-[12px] py-[12px] h-[43px] w-[302px] flex items-center justify-center gap-3 text-center"
              >
                <Image src={Message} width={18} height={18} alt="message" />
                Visit Live Website
              </Link>
            )}

            {figmaPrototypeLink && (
              <Link
                target="_blank"
                href={figmaPrototypeLink}
                className="bg-[#3B3B3B] rounded-md px-[12px] py-[12px] h-[43px] w-[302px] flex items-center justify-center gap-3 text-center"
              >
                <Image src={FigmaIcon} width={16} height={24} alt="message" />
                View Figma Prototype
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="flex lg:items-center flex-col lg:flex-row lg:gap-32 gap-12 lg:mt-32 p-6 lg:px-12 w-full">
        <div className="flex gap-4 flex-nowrap  ">
          {tags.map((item: string, index: React.Key | null | undefined) => (
            <span
              className="border-white border px-2 py-2 lg:text-[14px] text-nowrap  lg:w-full text-[12px] rounded-lg"
              key={index}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="w-full">
          <p className="font-medium lg:text-[1.5rem] ">{aboutProject}</p>
        </div>
      </div>

      <section
        style={{
          backgroundImage: `url(${`https:${backgroundImage.src}`})`,
          backgroundPosition: "0px 0px  -150px 0px",
        }}
        className="h-[784px] lg:mt-20 mt-10 p-6 bg-no-repeat w-full bg-cover flex items-center justify-center relative bg-[#191919]"
      >
        <div className="bg-[#00000033] absolute top-0 left-0 w-full h-full"></div>
        <div className="absolute">
          {!videoLink && !projectWebImage ? (
            <div className="lg:w-[228px] lg:h-[464px] w-[139px] h-[283px]">
              <Image
                src={
                  `https:${
                    parseContentfulContentImage(projectImage)?.src || ""
                  }` || EshanliProject.src
                }
                alt={parseContentfulContentImage(projectImage)?.alt || ""}
                width={228}
                height={464}
              />
            </div>
          ) : projectWebImage ? (
            <div className={`lg:w-[468px] lg:h-[260px] w-[268px] h-[160px]`}>
              <Image
                src={
                  `https:${
                    parseContentfulContentImage(projectWebImage)?.src || ""
                  }` || EshanliProject.src
                }
                alt={parseContentfulContentImage(projectWebImage)?.alt || ""}
                width={468}
                height={260}
              />
            </div>
          ) : (
            <video
              src={videoLink}
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
        <div className="flex justify-between flex-col lg:flex-row lg:gap-4 gap-16 mb-20">
          {client && (
            <div>
              <h4 className="text-[#AAAAAA] font-medium mb-1">Client </h4>
              <p className="">{client}</p>
            </div>
          )}

          {role && (
            <div>
              <h4 className="text-[#AAAAAA] font-medium mb-1">My Role</h4>
              <p className="">{role}</p>
            </div>
          )}
          <div className="lg:w-[50%]">
            <RichText document={introduction} />
          </div>
        </div>

        <div className="mt-6">
          <DisplayComponent sections={sections} />
        </div>
      </section>

      {otherProjects && (
        <div className="lg:pl-12 pl-6">
          <OtherProjects otherProjects={otherProjects} />
        </div>
      )}
    </main>
  );
};

export default ProjectDetails;
