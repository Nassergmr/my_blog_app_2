"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      id="hero"
      className=" mx-auto text-center mt-[200px] sm:px-0 px-3"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div id="title" className="flex gap-x-3 items-center justify-center">
        <h2 className="font-bold leading-10 md:leading-[60px]	 md:text-[36px] text-[30px] lg:text-[48px]">
          Investigating profound ideas and insights that truly matter
        </h2>
      </div>
      <p className="w-full text-lg mx-auto mt-5 text-gray-600 dark:text-white lg:w-[60%] md:w-[80%]">
        Join us as we delve into the nuances of life, contemplating ideas and
        reflections that resonate with our shared human journey.
      </p>
      <Link href="/Pages/AllPosts">
        <Button
          className="mt-7 font-semibold px-6 py-5 hover:bg-white bg-black text-white hover:text-black text-md rounded-full"
          variant="outline"
        >
          Start Exploring
        </Button>
      </Link>
    </motion.div>
  );
}
