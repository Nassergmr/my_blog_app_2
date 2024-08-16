import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div id="hero" className=" mx-auto text-center mt-[200px] sm:px-0 px-3">
      <div id="title" className="flex gap-x-3 items-center justify-center">
        <h1 className="font-bold md:text-4xl text-3xl lg:text-5xl">
          Investigating profound ideas and insights that truly matter
        </h1>
      </div>
      <p className="w-full text-lg mx-auto mt-5 text-gray-600 dark:text-white lg:w-[60%] md:w-[80%]">
        Join us as we delve into the nuances of life, contemplating ideas and
        reflections that resonate with our shared human journey.
      </p>
      <Button
        className="mt-7 font-semibold px-6 py-5 hover:bg-white bg-black text-white hover:text-black text-md rounded-full"
        variant="outline"
      >
        Start Exploring
      </Button>
    </div>
  );
}
