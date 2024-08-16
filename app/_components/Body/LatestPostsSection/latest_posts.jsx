"use client";

import { useEffect, useState } from "react";
import { getLatestPosts } from "@/app/Apis/latest_posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LatestPosts = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const data = await getLatestPosts();
      console.log("Fetched posts:", data); // Inspect the data here
      setLatestPosts(data);
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="mt-[200px] lg:px-20 md:px-12 sm:px-8 px-3 mb-[100px]">
      <div
        id="heading_container"
        className=" mb-5 items-center flex justify-between sm:flex-row flex-col mx-auto sm:mx-0 gap-y-5"
      >
        <h1 className="text-2xl font-bold border-b-2 border-black dark:border-white">
          Our Latest Blogs
        </h1>
        <Link href="/Pages/AllPosts">
          <Button
            className="font-semibold px-6 py-5 hover:bg-white bg-black text-white hover:text-black text-md rounded-full"
            variant="outline"
          >
            Explore All Blogs
          </Button>
        </Link>
      </div>
      <ul
        id="cards_container"
        className="grid gap-x-3 gap-y-10 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-between"
      >
        {latestPosts.map((post) => {
          const post_id = post._id;
          const postLink = `Pages/BlogDetails/${post_id}`;
          const author_id = post.author?._id;
          const authorLink = `/Pages/AuthorDetails/${author_id}`;
          const categoryTitle = post?.category?.title;
          const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;
          return (
            <Link href={postLink}>
              <div
                key={post._id}
                id="card"
                class="h-[450px] max-w-sm mx-auto col-span-1 relative group overflow-hidden cursor-pointer bg-transparent flex flex-col"
              >
                <div
                  id="img_continer"
                  className="w-full rounded-lg h-80 overflow-hidden"
                >
                  <img
                    className="w-full h-full  object-cover group-hover:scale-110 transition-transform duration-500"
                    src={post.mainImage?.asset?.url}
                    alt={post.title}
                  />
                </div>

                <button className="text-base px-2 py-1 absolute top-5 left-3 bg-black text-white rounded-full">
                  <Link href={categoryLink}> {post.category?.title}</Link>
                </button>

                <div class="p-5">
                  <h5 class="mb-2 text-2xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                </div>
                <div
                  id="author_date"
                  className="flex justify-between items-center mt-auto px-5"
                >
                  <p className="border-b-[1px] border-gray-600 text-gray-600 hover:border-black dark:hover:border-white dark:hover:text-white hover:text-black w-fit">
                    <Link href={authorLink}> {post.author?.name} </Link>
                  </p>

                  <div className="text-gray-600">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default LatestPosts;
