import { client } from "@/sanity/lib/client";

export async function getCategories() {
  const query = `*[_type == "category"] {
    title,
    description,
    image {
      asset->{
        _id,
        url
      }
    }
  }`;
  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
