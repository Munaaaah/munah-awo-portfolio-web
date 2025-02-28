import Image from "next/image";
import Message from "../../public/message.svg";
import ProjectSwiper from "@/components/ProjectSwiper";

export default function Home() {
  return (
    <main className="text-white font-creatoDisplay bg-[#191919]">
      <section className="p-6 lg:px-12 flex flex-col lg:flex-row lg:gap-4 gap-32 ">
        <div className="pt-10 border-t border-r border-l-0 border-b-0 w-full  border-[#FFFFFF33] lg:h-[21px] h-[16px] rounded-lg">
          <p className="font-medium text-[1.15rem] lg:text-[1.5rem]">
            I’m a product designer with 3 years of experience designing &
            building products for <br className="hidden lg:block" /> startups &
            enterprises.
          </p>
        </div>

        <div className="border-[2px] border-[#3B3B3B]  h-[168px] w-fit rounded-lg p-3 text-white flex flex-col justify-center">
          <p>
            Let’s collaborate and make great stuffs.{" "}
            <br className="hidden lg:block" /> Reach out to me today !
          </p>

          <div className="mt-5 flex items-center gap-3 text-[14px]">
            <button className="bg-[#7A46FF] rounded-md px-[12px] py-[12px] h-[43px] w-[149px] flex items-center justify-center gap-3 text-center">
              <Image src={Message} width={18} height={18} alt="message" />
              Let’s Talk{" "}
            </button>
            <button className="bg-[#3B3B3B] rounded-md px-[12px] py-[12px] h-[43px] w-[149px]">
              Download Resume{" "}
            </button>
          </div>
        </div>
      </section>

      <div className="p-6 lg:px-12 lg:mt-0">
        <h1 className="uppercase font-black leading-none text-[4.37rem] lg:text-[13rem]">
          I’m <br /> talented{" "}
        </h1>
      </div>

      <div className="lg:pl-12 pl-6">
        <ProjectSwiper />
      </div>
    </main>
  );
}
