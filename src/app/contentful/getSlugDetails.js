import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

export const getProjectDetails = async () => {
  const res = await client.getEntries({
    content_type: "pageHomepage",
    include: 3,
  });

  // console.log(res?.items[0]?.fields, "res");

  if (res?.items) {
    const paths = res?.items[0]?.fields?.projectSlider?.map((item) => {
      return {
        _slug: item?.fields?.slug,
      };
    });
    return paths;
  }
};

export const getCraftDetails = async () => {
  try {
    const res = await client.getEntries({
      content_type: "pageHomepage",
      include: 3,
    });

    const paths = res?.items?.[0]?.fields?.crafts
      ?.map((item) => ({ _slug: item?.fields?.slug }))
      .filter((p) => p._slug);

    return paths || [];
  } catch (e) {
    return [];
  }
};

// Resolves a craft entry by slug. Tries a dedicated `craftCard` content type
// first, then falls back to `projectCard` (so crafts can reuse the same type).
export async function getCraftSlugDetails(params) {
  const types = ["craftCard", "projectCard"];

  for (const type of types) {
    try {
      const { items } = await client.getEntries({
        content_type: type,
        "fields.slug": params,
        include: 5,
      });

      if (items.length) {
        return { content: items[0] };
      }
    } catch (e) {
      // content type may not exist yet — try the next one
    }
  }

  return null;
}

export const getHeader = async () => {
  const res = await client.getEntries({
    content_type: "componentHeader",
    include: 3,
  });

  if (res?.items) {
    const paths = res?.items[0]?.fields?.crclSubLink?.map((item) => {
      return {
        _link: item?.fields?.slug,
      };
    });
    return paths;
  }
};

async function getSlugDetails(detail_content_type, params) {
  // console.log(params, detail_content_type);

  const { items } = await client.getEntries({
    content_type: detail_content_type,
    "fields.slug": params,
    include: 5,
  });

  // console.log(items);

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    content: items[0],
  };
}

export default getSlugDetails;
