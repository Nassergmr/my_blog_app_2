"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/app/Apis/all_posts";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const data = await getAllPosts();
      console.log("Fetched posts:", data); // Inspect the data here
      setAllPosts(data);
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="mt-[200px] lg:px-20 md:px-12 sm:px-8 px-3 mb-[150px]">
      <div
        id="heading_container"
        className=" mb-5 items-center flex justify-between sm:flex-row flex-col mx-auto sm:mx-0 gap-y-5"
      >
        <h1 className="text-2xl font-bold border-b-2 border-black dark:border-white">
          Our Blogs
        </h1>
      </div>
      <ul
        id="cards_container"
        className="grid gap-x-3 gap-y-10 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-between"
      >
        {allPosts.map((post) => {
          const post_id = post._id;
          const blogLink = `/Pages/BlogDetails/${post_id}`;
          const author_id = post.author?._id;
          const authorLink = `/Pages/AuthorDetails/${author_id}`;
          const categoryTitle = post?.category?.title;
          const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;
          return (
            <Link href={blogLink}>
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

                <Link href={categoryLink}>
                  <button className="text-base px-2 py-1 absolute top-5 left-3 bg-black text-white rounded-full">
                    {post.category?.title}
                  </button>
                </Link>

                <div className="p-5">
                  <h5 className="mb-2 text-2xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                </div>
                <div
                  id="author_date"
                  className="flex justify-between items-center mt-auto px-5"
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
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AllPosts;
