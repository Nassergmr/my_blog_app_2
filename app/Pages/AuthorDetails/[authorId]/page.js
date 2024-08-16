import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export async function getAuthor(authorId) {
  const query = `*[_type == "author" && _id == "${authorId}"] {
    _id,
    name,
    bio[]{
      ...,
      markDefs[],
      children[]
    },
    image {
      asset->{
        url
      }
    }
  }[0]`;

  try {
    const author = await client.fetch(query);
    return author;
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null; // Return null if an error occurs
  }
}
export async function getAuthorPosts(authorId) {
  const query = `*[_type == "post" && author._ref == "${authorId}"] {
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
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return []; // Return empty array if an error occurs
  }
}

export default async function Page({ params }) {
  const { authorId } = params;
  const author = await getAuthor(authorId);
  const authorPosts = await getAuthorPosts(authorId);

  return (
    <div className="mt-[150px]">
      <div
        id="author_container"
        className=" pb-[50px] lg:px-20 md:px-12 sm:px-8 px-3 text-center mx-auto transform translate-x-[-50%] relative left-[50%]"
      >
        <h1 className="font-bold md:text-2xl text-xl lg:text-3xl mb-5">
          {author.name}
        </h1>
        <div
          id="img_container"
          className="lg:w-[800px] h-auto w-auto md:w-[700px] sm:w-[500px] rounded-xl mx-auto"
        >
          <img
            className="w-full h-full rounded-xl mb-5 "
            src={author.image?.asset?.url}
            alt={author.name}
          />
        </div>
        <div className="prose lg:prose-xl dark:text-white mb-28 mx-auto">
          <PortableText value={author.bio} />
        </div>
      </div>

      <div id="similars_container" className="">
        <h2 className="w-fit mx-auto text-2xl mb-8 font-bold border-b-2 border-black dark:border-white">
          Posts by {author.name}
        </h2>
        <ul
          id="cards_container"
          className="lg:px-20 md:px-12 sm:px-8 px-3 grid gap-x-3 gap-y-10 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-between"
        >
          {authorPosts.map((post) => {
            const postId = post._id;
            const blogLink = `/Pages/AuthorSinglePostDetails/${postId}`;
            return (
              <Link href={blogLink}>
                <div
                  key={post._id}
                  id="card"
                  className="h-[450px] max-w-sm mx-auto col-span-1 relative group overflow-hidden cursor-pointer bg-transparent flex flex-col"
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
                    className="flex justify-between items-center px-5"
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
