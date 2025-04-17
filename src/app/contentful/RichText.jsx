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
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p
          style={{
            fontSize: "16px",
            lineHeight: "30px",
            marginBottom: "0.75rem",
          }}
        >
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          style={{
            fontSize: "24px",
            lineHeight: "30px",
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
            lineHeight: "30px",
            marginBottom: "0.75rem",
            fontWeight: "700",
          }}
        >
          {children}
        </h3>
      ),

      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          style={{
            fontSize: "32px",
            lineHeight: "30px",
            marginBottom: "0.75rem",
            fontWeight: "700",
          }}
        >
          {children}
        </h1>
      ),

      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="text-[15px] leading-[30px]">{children}</li>
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
