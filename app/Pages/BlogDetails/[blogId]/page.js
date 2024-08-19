import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export async function getSinglePost(blogId) {
  const query = `*[_type == "post" && _id == "${blogId}"] {
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
    body
  } [0]`;

  try {
    const SinglePost = await client.fetch(query);
    return SinglePost;
  } catch (error) {
    console.error("Error fetching SinglePost:", error);
    return null;
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
  const SinglePost = await getSinglePost(params.blogId);
  const author_id = SinglePost.author?._id;
  const authorLink = `/Pages/AuthorDetails/${author_id}`;
  const PostByCategory = await getPostsByCategory(SinglePost.category?.title);
  const categoryLink_2 = `/Pages/CategoryDetails/${SinglePost.category?.title}`;

  return (
    <div className="mt-[150px] mb-[150px]">
      <div
        id="single_post_container"
        className="lg:px-20 md:px-12 overflow-auto px-3 sm:px-8 text-center mx-auto transform translate-x-[-50%] relative left-[50%]"
      >
        <div
          id="content"
          className="flex flex-wrap gap-y-5 mb-7 gap-x-8 items-center sm:justify-center justify-around"
        >
          <p className="text-gray-600 dark:text">
            {new Date(SinglePost.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <Link href={authorLink}>
            <p className="border-b-[1px] border-gray-600 text-gray-600 hover:border-black dark:hover:border-white dark:hover:text-white hover:text-black w-fit">
              {SinglePost.author?.name}
            </p>
          </Link>
          <Link href={categoryLink_2}>
            <h1 className="text-base font-bold px-2 py-1 bg-black text-white rounded-full dark:bg-white dark:text-black">
              {SinglePost.category?.title}
            </h1>
          </Link>
        </div>
        <h1 className="font-bold md:text-2xl text-xl lg:text-3xl mb-5">
          {SinglePost.title}
        </h1>
        <div
          id="img_container"
          className="mx-auto w-full lg:h-[700px] sm:h-[500px]
         h-[350px] rounded-lg"
        >
          <img
            className="w-full h-full object-cover rounded-xl"
            src={SinglePost.mainImage?.asset?.url}
          />
        </div>
        <div
          id="body_container"
          className="prose lg:prose-xl text-center mx-auto mt-10 mb-28 dark:text-white dark:prose-headings:text-white"
        >
          <PortableText value={SinglePost.body} />
        </div>
      </div>

      <div
        id="similar_blogs_container"
        className="mt-[50px] lg:px-20 md:px-12 sm:px-8 mb-8 px-3"
      >
        <h2 className="w-fit mx-auto text-2xl mb-8 font-bold border-b-2 border-black dark:border-white">
          Similar Blogs
        </h2>
        <ul
          id="cards_container"
          className="flex flex-wrap gap-y-10 justify-around"
        >
          {PostByCategory.map((post) => {
            const post_id = post._id;
            const blogLink = `/Pages/BlogDetails/${post_id}`;
            const categoryTitle = post?.category?.title;
            const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;

            return (
              <Link href={blogLink} key={post._id}>
                <div
                  id="card"
                  className="h-[450px] max-w-lg w-auto mx-auto relative group overflow-hidden cursor-pointer bg-transparent flex flex-col"
                >
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

                  <button className="text-base px-2 py-1 absolute top-5 left-3 bg-black text-white rounded-full">
                    {post.category?.title}
                  </button>

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
                      {post.title}
                    </h5>
                  </div>
                  <div
                    id="author_date"
                    className="flex justify-between mt-auto items-center px-5"
                  >
                    <p className="text-gray-600">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
