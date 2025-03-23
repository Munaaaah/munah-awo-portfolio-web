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
          <div className="w-full my-6 lg:my-14" key={index}>
            <Image
              src={`https:${parseContentfulContentImage(fields?.image)?.src}`}
              width={parseContentfulContentImage(fields?.image)?.width}
              height={parseContentfulContentImage(fields?.image)?.height}
              alt={parseContentfulContentImage(fields?.image)?.alt || ""}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="lg:w-[50%] my-6 lg:my-24" key={index}>
            <RichText document={fields?.richText} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayComponent;
