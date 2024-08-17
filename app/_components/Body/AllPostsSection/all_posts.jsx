"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/app/Apis/all_posts";
import Pagination from "@/app/Elements/pagination";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchAllPosts = async () => {
      const data = await getAllPosts();
      console.log("Fetched posts:", data); // Inspect the data here
      setAllPosts(data);
    };

    fetchAllPosts();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Get current posts for the current page
  const currentPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="sm:mt-[150px] mt-[100px] lg:px-20 md:px-12 sm:px-8 px-3 mb-[150px]">
      <div id="heading_container" className="mx-auto text-center mb-5">
        <div id="title" className="flex gap-x-3 items-center justify-center">
          <h1 className="font-bold md:text-4xl text-3xl lg:text-5xl text-pretty leading-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Our Blogs
          </h1>
        </div>
        <p className="w-full text-lg mx-auto mt-4 mb-[50px] text-gray-600 dark:text-white lg:w-[60%] md:w-[80%]">
          Discover insightful articles and updates on various topics, designed
          to inform and inspire. Stay updated with our latest posts.
        </p>
      </div>
      <ul
        id="cards_container"
        className="grid gap-x-3 gap-y-10 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-between"
      >
        {currentPosts.map((post) => {
          const post_id = post._id;
          const blogLink = `/Pages/BlogDetails/${post_id}`;
          const author_id = post.author?._id;
          const authorLink = `/Pages/AuthorDetails/${author_id}`;
          const categoryTitle = post?.category?.title;
          const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;
          return (
            <Link href={blogLink} key={post._id}>
              <div
                id="card"
                className="h-[450px] max-w-sm mx-auto col-span-1 relative group overflow-hidden cursor-pointer bg-transparent flex flex-col"
              >
                <div
                  id="img_continer"
                  className="w-full rounded-lg h-80 overflow-hidden"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AllPosts;
