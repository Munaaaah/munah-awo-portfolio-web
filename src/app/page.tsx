"use client";

import Image from "next/image";
import Message from "../../public/message.svg";
import ProjectSwiper from "@/components/ProjectSwiper";
import getContent from "./contentful/getContent";

export default function Home() {
  const { data, error, isLoading }: any = getContent("/", "pageHomepage");
  console.log(data);
  const homeData = data?.contents?.fields;
  const heading = homeData?.heading;
  const introduction = homeData?.introduction;
  const callOutText = homeData?.callOutText;
  const callOutBtn1Text = homeData?.callOutBtn1Text;
  const callOutBtn2Text = homeData?.callOutBtn2Text;
  const projectSlider = homeData?.projectSlider;

  return (
    <main className="text-white font-creatoDisplay bg-[#191919]">
      <section className="p-6 lg:px-12 flex flex-col lg:flex-row lg:gap-4 gap-32 ">
        <div className="pt-10 border-t border-r border-l-0 border-b-0 w-full  border-[#FFFFFF33] lg:h-[21px] h-[16px] rounded-lg">
          <p className="font-medium text-[1.15rem] lg:text-[1.5rem] lg:w-[70%]">
            {introduction}
          </p>
        </div>

        <div className="border-[2px] border-[#3B3B3B]  h-[168px] w-fit rounded-lg p-3 text-white flex flex-col justify-center">
          <p>{callOutText}</p>

          <div className="mt-5 flex items-center gap-3 text-[14px]">
            {callOutBtn1Text ? (
              <button className="bg-[#7A46FF] rounded-md px-[12px] py-[12px] h-[43px] w-[149px] flex items-center justify-center gap-3 text-center">
                <Image src={Message} width={18} height={18} alt="message" />
                {callOutBtn1Text}
              </button>
            ) : null}

            {callOutBtn2Text ? (
              <button className="bg-[#3B3B3B] rounded-md px-[12px] py-[12px] h-[43px] w-[149px]">
                {callOutBtn2Text}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="p-6 lg:px-12 lg:mt-0">
        <h1 className="uppercase font-black leading-none text-[4.37rem] lg:text-[13rem] lg:w-[70%]">
          {heading}
        </h1>
      </div>

      <div className="lg:pl-12 pl-6">
        <ProjectSwiper projectSlider={projectSlider} />
      </div>
    </main>
  );
}
