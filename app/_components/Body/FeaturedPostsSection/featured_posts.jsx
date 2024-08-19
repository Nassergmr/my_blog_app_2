"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturesPosts } from "@/app/Apis/featured_posts";
import { motion } from "framer-motion";

const FeaturesPosts = () => {
  const [featuresPosts, setFeaturesPosts] = useState([]);

  useEffect(() => {
    const fetchfeaturesPosts = async () => {
      const data = await getFeaturesPosts();
      setFeaturesPosts(data);
    };

    fetchfeaturesPosts();
  }, []);

  return (
    <div className="sm:mt-[200px] mt-[100px] lg:px-20 md:px-12 sm:px-8 px-3 mb-[100px]">
      <div
        id="heading_container"
        className=" mb-5 items-center flex justify-between sm:flex-row flex-col mx-auto sm:mx-0 gap-y-5"
      >
        <h1 className="text-2xl font-bold border-b-2 border-black dark:border-white">
          Our Featured Blogs
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
        {featuresPosts.map((post) => {
          const post_id = post._id;
          const blogLink = `Pages/BlogDetails/${post_id}`;
          const author_id = post.author?._id;
          const authorLink = `/Pages/AuthorDetails/${author_id}`;
          const categoryTitle = post?.category?.title;
          const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;
          return (
            <Link href={blogLink} key={post._id}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
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

                <div class="p-5">
                  <h5 class="mb-2 text-2xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
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
              </motion.div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default FeaturesPosts;
