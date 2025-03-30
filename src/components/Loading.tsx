import Image from "next/image";
import React from "react";
import Munah from "../../public/munah-full.jpg";

const Loading = () => {
  return (
    <div className="text-white font-creatoDisplay font-black  bg-[#191919] flex items-center justify-center h-screen w-full ">
      <div className="flex items-center flex-col text-center gap-5 justify-center">
        <div className="w-[48px]  h-[48px] bg-gradient-to-tr from-[#7A46FF] p-[1px] to-[#FFD027] rounded-lg">
          <Image
            src={Munah}
            width={48}
            height={48}
            alt="maimunah"
            className="w-full h-full rounded-lg object-cover "
          />
        </div>
        <div className="text-center lg:text-[2rem]  w-full uppercase ">
          <h4 className="  leading-[2rem] ">i design</h4>
          <p className="text-[#7A46FF] mt-2 ">Digital Products</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
