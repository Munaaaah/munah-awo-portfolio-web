import { client } from "./getContent";

export async function getData(content_type: string) {
  const res = await client.getEntries({
    content_type,
    include: 3,
  });

  if (res?.items) {
    return { contents: res?.items[0] };
  }
}
