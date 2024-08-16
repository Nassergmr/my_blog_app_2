import { client } from "@/sanity/lib/client";

export async function getCategoryDetails(categoryTitle) {
  const query = `*[_type == "category" && title == "${categoryTitle}"] {
      _id,
      title,
      description
    }[0]`;

  try {
    const categoryDetails = await client.fetch(query);
    return categoryDetails;
  } catch (error) {
    console.error("Error fetching category details:", error);
    return null; // Return null if an error occurs
  }
}
export default async function Page({ params }) {
  const category = await getCategoryDetails(params.categoryTitle);
  return (
    <div className="mt-[500px]">
      <h1 className=""> categoryTitle:{category?.title}</h1>
    </div>
  );
}
