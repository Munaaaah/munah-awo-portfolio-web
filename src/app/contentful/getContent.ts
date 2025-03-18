/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "contentful";
import useSWR from "swr";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY!,
});

const getContent = (key: string, content_type: string) => {
  async function fetcher() {
    const res = await client.getEntries({
      content_type,
      include: 3,
    });

    // console.log(res);
    if (res?.items) {
      return { contents: res?.items[0] };
    }
  }
  const { data, isLoading, error } = useSWR(key, fetcher);

  return { data, isLoading, error };
};

export default getContent;
