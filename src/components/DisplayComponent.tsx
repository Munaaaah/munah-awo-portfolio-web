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
          <div className="w-full lg:h-[684px] my-6" key={index}>
            <Image
              src={`https:${parseContentfulContentImage(fields.image)?.src}`}
              width={1233}
              height={684}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="lg:w-[50%] mt-24" key={index}>
            <RichText document={fields?.richText} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayComponent;
