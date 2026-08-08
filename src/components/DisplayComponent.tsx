import { parseContentfulContentImage } from "@/app/contentful/contentImage";
import RichText from "@/app/contentful/RichText";
import Image from "next/image";
import React from "react";

/* Resolve a playable video URL from a block: a `video` media field,
   a video file uploaded into the `image` field, or a `videoUrl` text field */
const getVideoSrc = (fields: any): string | null => {
  if (typeof fields?.videoUrl === "string" && fields.videoUrl.trim()) {
    return fields.videoUrl.trim();
  }
  const file = (fields?.video || fields?.image)?.fields?.file;
  if (file?.url && (file.contentType || "").startsWith("video/")) {
    return file.url.startsWith("//") ? `https:${file.url}` : file.url;
  }
  return null;
};

const DisplayComponent = ({ sections }: { sections: any }) => {
  return (
    <div>
      {" "}
      {sections?.map(({ fields }: any, index: any) => {
        const videoSrc = getVideoSrc(fields);

        if (videoSrc) {
          return (
            <div className="w-full lg:w-[610px] my-6 lg:my-[57px]" key={index}>
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover rounded-[24px]"
              />
            </div>
          );
        }

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
