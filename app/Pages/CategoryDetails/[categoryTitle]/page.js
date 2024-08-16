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
    <div
      id="categories"
      className=" mx-auto text-center sm:mt-[150px] mt-[100px] sm:px-0 px-3"
    >
      <div id="title" className="flex gap-x-3 items-center justify-center">
        <h1 className="font-bold md:text-4xl text-3xl lg:text-5xl text-pretty leading-8	 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          {category.title}
        </h1>
      </div>
      <p className="w-full text-lg mx-auto mt-4 text-gray-600 dark:text-white lg:w-[60%] md:w-[80%]">
        {category.description}
      </p>
    </div>
  );
}
