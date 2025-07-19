interface HeaderProps {
  totalChallenges: number;
  completedChallenges: number;
}

export const Header = ({ totalChallenges, completedChallenges }: HeaderProps) => {
  const progressPercentage = (completedChallenges / totalChallenges) * 100;

  return (
    <header className="bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            30 Days of AI Art
          </h1>
          <p className="text-xl sm:text-2xl text-violet-600 dark:text-violet-400 font-medium">
            Ana Kopadze&apos;s Creative Journey
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore an inspiring collection of AI-generated artworks created during a 30-day challenge
          using Canva AI. Each piece represents a unique moment of creative exploration and artistic
          discovery.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg inline-block">
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Progress</span>
              <span>
                {completedChallenges} of {totalChallenges} challenges completed
              </span>
            </div>
            <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-violet-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>
      </div>
    </header>
  );
};
