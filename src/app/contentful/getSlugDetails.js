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
    const paths = res?.items[0]?.fields?.projectSlider
      ?.map((item) => ({
        _slug: item?.fields?.slug?.trim(),
      }))
      .filter((p) => p?._slug);
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
      ?.map((item) => ({ _slug: item?.fields?.slug?.trim() }))
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
  // Normalize slugs so accidental leading/trailing spaces in Contentful
  // do not cause false "not found" results.
  const normalizedParams = typeof params === "string" ? params.trim() : params;

  const { items } = await client.getEntries({
    content_type: detail_content_type,
    "fields.slug": normalizedParams,
    include: 5,
  });

  if (items.length) {
    return {
      content: items[0],
    };
  }

  // Fallback: compare normalized slugs in-memory to recover from legacy
  // entries where the stored slug still has trailing spaces.
  const fallback = await client.getEntries({
    content_type: detail_content_type,
    include: 5,
    limit: 1000,
  });

  const normalizedTarget =
    typeof normalizedParams === "string"
      ? normalizedParams.toLowerCase()
      : normalizedParams;

  const matched = fallback.items.find((entry) => {
    const slug = entry?.fields?.slug;
    if (typeof slug !== "string" || typeof normalizedTarget !== "string") {
      return false;
    }
    return slug.trim().toLowerCase() === normalizedTarget;
  });

  if (matched) {
    return {
      content: matched,
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default getSlugDetails;
