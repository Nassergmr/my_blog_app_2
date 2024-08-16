import { client } from "@/sanity/lib/client";

export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc){
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
    const AllPosts = await client.fetch(query);
    return AllPosts;
  } catch (error) {
    console.error("Error fetching AllPosts:", error);
    return [];
  }
}
