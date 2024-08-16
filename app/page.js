import Categories from "./_components/Body/CategoriesSection/catogories";
import FeaturesPosts from "./_components/Body/FeaturedPostsSection/featured_posts";
import LatestPosts from "./_components/Body/LatestPostsSection/latest_posts";
import Hero from "./_components/Header/Hero/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestPosts />
      <Categories />
      <FeaturesPosts />
    </div>
  );
}
