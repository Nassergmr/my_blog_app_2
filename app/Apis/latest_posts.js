import { client } from "@/sanity/lib/client";

export async function getLatestPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0..5]{
    _id,
    title,
    mainImage {
      asset->{
        url
      }
    },
    author->{
      name,
      _id
    },
     publishedAt,
    category->{
      title
    },
    description,
    _updatedAt
  }`;

  try {
    const LatestPosts = await client.fetch(query);
    return LatestPosts;
  } catch (error) {
    console.error("Error fetching LatestPosts:", error);
    return [];
  }
}
