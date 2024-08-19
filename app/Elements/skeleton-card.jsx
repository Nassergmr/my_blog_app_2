export default function SkeletonCard() {
  return (
    <div
      id="card"
      className="h-[450px] max-w-sm mx-auto col-span-1 relative group overflow-hidden cursor-pointer bg-transparent flex flex-col animate-pulse"
    >
      <div
        id="img_container"
        className="w-full rounded-lg h-80 overflow-hidden bg-gray-200"
      >
        <div className="w-full h-full bg-gray-300 rounded-lg"></div>
      </div>

      <div className="absolute top-5 left-3 bg-gray-200 rounded-full text-gray-300 px-2 py-1 w-24 h-6"></div>

      <div className="p-5">
        <div className="mb-2 h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>

      <div
        id="author_date"
        className="flex justify-between items-center mt-auto px-5"
      >
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}
