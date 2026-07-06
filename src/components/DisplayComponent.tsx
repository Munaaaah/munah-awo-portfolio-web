import { parseContentfulContentImage } from "@/app/contentful/contentImage";
import RichText from "@/app/contentful/RichText";
import Image from "next/image";
import React from "react";

const DisplayComponent = ({ sections }: { sections: any }) => {
  return (
    <div>
      {" "}
      {sections?.map(({ fields }: any, index: any) => {
        return fields.image ? (
          <div className="w-full lg:w-[610px] my-6 lg:my-[57px]" key={index}>
            <Image
              src={`https:${parseContentfulContentImage(fields?.image)?.src}`}
              width={parseContentfulContentImage(fields?.image)?.width}
              height={parseContentfulContentImage(fields?.image)?.height}
              alt={parseContentfulContentImage(fields?.image)?.alt || ""}
              className="w-full h-full object-cover rounded-[24px]"
            />
          </div>
        ) : (
          <div
            className="w-full lg:w-[628px] my-6 lg:my-[57px] text-[16px] leading-6 tracking-[-0.32px] font-medium"
            key={index}
          >
            <RichText document={fields?.richText} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayComponent;
