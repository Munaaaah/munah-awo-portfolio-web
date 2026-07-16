"use client";

import Image from "next/image";
import getContent from "./contentful/getContent";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ArrowRight from "../../public/arrow-right.svg";
import CraftPlaceholder from "../../public/craft-placeholder.png";
import Munah from "../../public/munah-full.jpg";
import { parseContentfulContentImage } from "./contentful/contentImage";

const FALLBACK_INTRO =
  "A product designer who craft strong visuals  craft and intuitive experience across various industries, ranging from fintech, startups and 0-1 products";

const BIO_PARAGRAPHS = [
  "I was the kid who made looping GIFs in Photoshop just to make my friends smile.",
  "In college, I studied graphic design at Ewha Womans University in Seoul, where I led the web design of Ewhaian.com, the university's official student platform. That experience taught me my first lesson about how design shapes behavior.",
  "To deepen my expertise, I moved to New York and earned my MFA in Interaction Design at SVA. Since then, I've worked on AI tools, fintech systems, and community platforms—transforming complex workflows into clear, trustworthy experiences.",
  "At Navan and various early-stage startups, I've collaborated closely with engineers, PMs, and researchers to ship meaningful products quickly without compromising quality or user experience.",
  "As a designer, I believe that how something feels is just as important as how it functions. I specialize in bringing clarity to technical products while maintaining speed and intentionality.",
];

const CRAFTS = Array.from({ length: 6 }, () => ({
  title: "Karia planet :  Brid",
}));

const PillButton = ({
  href,
  text,
  external,
}: {
  href: string;
  text: string;
  external?: boolean;
}) => (
  <Link
    href={href}
    target={external ? "_blank" : undefined}
    className="bg-[#27272A] hover:border-[0.001px] border-[rgba(255,255,255,0.1)] rounded-[22px] h-[43px] min-w-[149px] px-[18px] flex items-center justify-center gap-[6px] text-[14.65px] leading-[19.5px] tracking-[-0.29px] font-medium text-white"
  >
    {text}
    <Image
      src={ArrowRight}
      alt=""
      width={20}
      height={20}
      className="-rotate-[35deg] w-[20px] h-[20px]"
    />
  </Link>
);

const ProjectCard = ({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  local,
}: {
  href?: string;
  imageSrc: any;
  imageAlt: string;
  title: string;
  description?: string;
  local?: boolean;
}) => {
  const card = (
    <div className="rounded-[24px] overflow-hidden w-full lg:w-[322px] lg:min-h-[314px]">
      <div className="relative h-[184px] mx-[7px] mt-[8px] rounded-[16px] overflow-hidden">
        {local ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 304px, 100vw"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 304px, 100vw"
          />
        )}
        <div className="absolute inset-0 bg-[#00000033] rounded-[16px]" />
      </div>
      <div className="pl-[15px] pr-[15px] pt-[16px] pb-[10px]">
        <h3 className="text-[16px] leading-6 tracking-[-0.32px] font-medium text-white">
          {title}
        </h3>
        {description ? (
          <p className="mt-[8px] text-[16px] leading-5 tracking-[-0.32px] font-medium text-[#AAAAAA]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {card}
    </Link>
  ) : (
    card
  );
};

export default function Home() {
  const { data, error, isLoading }: any = getContent("/", "pageHomepage");

  if (isLoading) {
    return <Loading />;
  }

  const homeData = data?.contents?.fields;
  const introduction = homeData?.introduction || FALLBACK_INTRO;
  const callOutBtn1Text = homeData?.callOutBtn1Text;
  const callOutBtn2Text = homeData?.callOutBtn2Text;
  const callOutBtn2Url = homeData?.callOutBtn2Url;
  const callOutBtn1Url = homeData?.callOutBtn1Url;
  const projectSlider = homeData?.projectSlider;

  return (
    <>
      <Header />
      <main className="text-white font-creatoDisplay bg-[#09090B] px-6 lg:px-0 lg:pl-[242px] pb-20 lg:pb-[140px] lg:max-w-[1440px] lg:mx-auto">
        {/* Hero */}
        <section className="pt-16 lg:pt-[77px]">
          <p className="text-[18px] leading-8 tracking-[-0.48px] font-medium text-[#AAAAAA]">
            Hello, I’m <span className="text-white">Maimunah</span>
          </p>
          <p className="mt-[4px] text-[18px] leading-8 tracking-[-0.48px] font-medium text-white lg:w-[663px]">
            {introduction}
          </p>

          <div className="mt-[26px] flex flex-wrap items-center gap-[12px] lg:gap-0">
            <PillButton
              href={callOutBtn1Url || "mailto:talk2borlah@gmail.com"}
              text={callOutBtn1Text || "Let’s talk"}
              external={Boolean(callOutBtn1Url)}
            />
            <span className="hidden lg:block w-[9px]" />
            <PillButton
              href={callOutBtn2Url || ""}
              text={callOutBtn2Text || "My Resume"}
              external={Boolean(callOutBtn2Url)}
            />
            <span className="hidden lg:block w-[16px]" />
            <PillButton href="#projects" text="My Designs" />
          </div>
        </section>

        {/* Selected Works */}
        <section id="projects" className="mt-16 lg:mt-[60px]">
          <h2 className="text-[24px] leading-8 tracking-[-0.48px] font-medium text-white">
            Selected Works
          </h2>

          <div className="mt-[26px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:w-[1014px]">
            {projectSlider?.map(({ fields }: any, index: number) => {
              const bg = parseContentfulContentImage(fields?.backgroundImage);
              return (
                <ProjectCard
                  key={index}
                  href={`/project/${fields?.slug}`}
                  imageSrc={`https:${bg?.src}`}
                  imageAlt={bg?.alt || fields?.projectName || "project"}
                  title={fields?.projectName}
                  description={fields?.projectType}
                />
              );
            })}
          </div>
        </section>

        {/* Crafts */}
        <section id="crafts" className="mt-16 lg:mt-[60px]">
          <h2 className="text-[24px] leading-8 tracking-[-0.48px] font-medium text-white">
            Crafts
          </h2>

          <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:w-[1014px]">
            {CRAFTS.map((craft, index) => (
              <ProjectCard
                key={index}
                imageSrc={CraftPlaceholder}
                imageAlt={craft.title}
                title={craft.title}
                local
              />
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mt-24 lg:mt-[136px] flex flex-col lg:flex-row gap-10 lg:gap-[75px]"
        >
          <div className="lg:w-[527px]">
            <h2 className="text-[24px] leading-8 tracking-[-0.48px] font-medium text-[#AAAAAA]">
              You can call me <br />
              <span className="text-white">Munah</span>
            </h2>

            <div className="mt-[24px] text-[16px] leading-6 tracking-[-0.32px] font-medium text-[#AAAAAA]">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:mt-[39px] w-full lg:w-[322px] h-[373px] rounded-[24px] bg-[#3B3B3B] overflow-hidden shrink-0">
            <Image
              src={Munah}
              alt="Maimunah Awotundun"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
