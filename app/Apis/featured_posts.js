import { client } from "@/sanity/lib/client";

// List of specific post IDs :
const specificPostIds = [
  "578d52e0-ea0b-45f6-ba96-b71ad8378271",
  "6942f643-e6b3-44c7-938b-0de2915323ee",
  "7936e022-928c-4e17-84e6-dd370487a472",
  "836ec1eb-bbd7-42cd-a390-09a4f5db9933",
  "94385a86-d788-4649-88e1-ee22da9c2701",
  "99501577-8022-4efb-82a2-cfd7732ecdb3",
];

const query = `*[_type == "post" && _id in $specificPostIds] {
  _id,
  title,
  mainImage {
    asset->{
      url
    }
  },
  publishedAt,
  author->{
    name,
    _id
  },
  category->{
    title
  },
  description,
  _updatedAt
}`;

export async function getFeaturesPosts() {
  try {
    const posts = await client.fetch(query, { specificPostIds });
    return posts;
  } catch (error) {
    console.error("Error fetching specific posts:", error);
    return [];
  }
}
