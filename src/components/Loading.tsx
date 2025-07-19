export const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-violet-200 dark:border-violet-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading Gallery
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Preparing Ana's creative journey...</p>
      </div>
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
