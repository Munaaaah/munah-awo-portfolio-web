import {
  Document as RichTextDocument,
  BLOCKS,
  MARKS,
  INLINES,
} from "@contentful/rich-text-types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// type RichTextProps = {
//   document: RichTextDocument | null;
// };

function RichText({ document }) {
  if (!document) {
    return null;
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node?.data?.target?.fields;
        const file = asset?.file;
        if (!file?.url) return null;
        const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
        const contentType = file.contentType || "";

        if (contentType.startsWith("video/")) {
          return (
            <video
              src={url}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full my-6 rounded-[24px]"
            />
          );
        }

        if (contentType.startsWith("image/")) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt={asset?.description || asset?.title || ""}
              className="w-full my-6 rounded-[24px]"
            />
          );
        }

        return null;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "1.5rem",
          }}
        >
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          style={{
            fontSize: "32px",
            lineHeight: "1.2",
            marginBottom: "0.75rem",
            fontWeight: "700",
          }}
        >
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3
          style={{
            fontSize: "20px",
            lineHeight: "1.3",
            marginBottom: "0.5rem",
            fontWeight: "700",
          }}
        >
          {children}
        </h3>
      ),

      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          style={{
            fontSize: "48px",
            lineHeight: "1.1",
            marginBottom: "0.75rem",
            fontWeight: "700",
          }}
        >
          {children}
        </h1>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="text-[16px] leading-[1.6]">{children}</li>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc ml-6 space-y-2">{children}</ul>
      ),
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
}

export default RichText;
