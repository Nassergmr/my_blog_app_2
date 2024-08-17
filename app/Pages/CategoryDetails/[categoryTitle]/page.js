import { client } from "@/sanity/lib/client";
import Link from "next/link";

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

export async function getPostsByCategory(categoryTitle) {
  const query = `*[_type == "post" && category->title == "${categoryTitle}"] {
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
    description
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const category = await getCategoryDetails(params.categoryTitle);
  const posts = await getPostsByCategory(params.categoryTitle);

  return (
    <div
      id="posts_by_categories"
      className="sm:mt-[150px] mt-[100px] mb-[100px]"
    >
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

      <div
        id="similar_blogs_container"
        className="mt-[50px] lg:px-20 md:px-12 px-3 sm:px-8 mb-8"
      >
        <ul
          id="cards_container"
          className="flex flex-wrap gap-y-10 justify-around"
        >
          {posts.map((post) => {
            const post_id = post._id;
            const blogLink = `/Pages/BlogDetails/${post_id}`;
            // const categoryTitle = post?.category?.title;
            const author_id = post.author?._id;
            const authorLink = `/Pages/AuthorDetails/${author_id}`;
            // const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;

            return (
              <div
                id="card"
                className="h-[450px] max-w-lg w-auto  mx-auto relative group overflow-hidden cursor-pointer bg-transparent flex flex-col"
              >
                <Link href={blogLink} key={post._id}>
                  <div
                    id="img_container"
                    className="w-full rounded-lg h-80 overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={post.mainImage?.asset?.url}
                      alt={post.title}
                    />
                  </div>

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      {post.title}
                    </h5>
                  </div>
                </Link>
                <div
                  id="author_date"
                  className="flex justify-between mt-auto items-center px-5"
                >
                  <Link href={authorLink}>
                    <p className="border-b-[1px] border-gray-600 text-gray-600 hover:border-black dark:hover:border-white dark:hover:text-white hover:text-black w-fit">
                      {post.author?.name}
                    </p>
                  </Link>
                  <p className="text-gray-600">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
