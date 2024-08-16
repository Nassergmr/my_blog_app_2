"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/app/Apis/category";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-[200px] lg:px-20 md:px-12 sm:px-8 px-3 mb-[150px]">
      <div
        id="heading_container"
        className=" mb-5 items-center flex justify-between sm:flex-row flex-col mx-auto sm:mx-0 gap-y-5"
      >
        <h1 className="text-2xl font-bold border-b-2 border-black dark:border-white">
          Our Diverse Topics
        </h1>
      </div>
      <ul className="grid md:grid-cols-3 mt-8 gap-x-5 grid-cols-2 lg:grid-cols-4 gap-y-8 justify-between sm:justify-normal">
        {categories.map((category) => {
          const categoryTitle = category?.title;
          const categoryLink = `/Pages/CategoryDetails/${categoryTitle}`;

          return (
            <div id="card" className="mx-auto">
              <Link href={categoryLink} key={category._id}>
                <div
                  id="img_container"
                  className="sm:w-[200px] sm:h-[190px] w-[150px] group h-[140px] relative group"
                >
                  <img
                    className=" group-hover:brightness-50 transition-all duration-500 ease-in-out rounded-full object-cover object-center w-full h-full "
                    src={category.image?.asset?.url}
                  />
                  <h2
                    className=" opacity-0 absolute transition-opacity duration-500 ease-in-out
                 group-hover:opacity-100 text-white top-[52%] left-[52%] text-[30px] font-bold transform -translate-x-1/2 -translate-y-1/2"
                  >
                    {category.title}
                  </h2>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
