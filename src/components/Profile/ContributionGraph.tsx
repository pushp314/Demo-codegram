import React from 'react';
import { GitHubContribution } from '../../types/github';

interface ContributionGraphProps {
  contributions: GitHubContribution[];
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ contributions }) => {
  const getLevelColor = (level: number): string => {
    const colors = {
      0: '#ebedf0',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getTooltipText = (contribution: GitHubContribution): string => {
    const date = new Date(contribution.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (contribution.count === 0) {
      return `No contributions on ${date}`;
    } else if (contribution.count === 1) {
      return `1 contribution on ${date}`;
    } else {
      return `${contribution.count} contributions on ${date}`;
    }
  };

  // Group contributions by weeks
  const weeks: GitHubContribution[][] = [];
  let currentWeek: GitHubContribution[] = [];
  
  contributions.forEach((contribution, index) => {
    const date = new Date(contribution.date);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push(contribution);
    
    if (index === contributions.length - 1) {
      weeks.push(currentWeek);
    }
  });

  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contribution Activity
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalContributions.toLocaleString()} contributions in {currentYear}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col space-y-1 min-w-full">
          {/* Month labels */}
          <div className="flex space-x-1 mb-2 text-xs text-gray-600 dark:text-gray-400">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <div key={month} className="w-10 text-center" style={{ marginLeft: index === 0 ? '14px' : '0' }}>
                {month}
              </div>
            ))}
          </div>

          {/* Day labels and contribution grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col space-y-1 mr-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="h-2.5"></div>
              <div className="h-2.5 flex items-center">Mon</div>
              <div className="h-2.5"></div>
              <div className="h-2.5 flex items-center">Wed</div>
              <div className="h-2.5"></div>
              <div className="h-2.5 flex items-center">Fri</div>
              <div className="h-2.5"></div>
            </div>

            {/* Contribution grid */}
            <div className="flex space-x-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-1">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const contribution = week[dayIndex];
                    if (!contribution) {
                      return (
                        <div
                          key={dayIndex}
                          className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-700"
                        />
                      );
                    }

                    return (
                      <div
                        key={contribution.date}
                        className="w-2.5 h-2.5 rounded-sm cursor-pointer hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all"
                        style={{ backgroundColor: getLevelColor(contribution.level) }}
                        title={getTooltipText(contribution)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
        <span>Learn how we count contributions</span>
        <div className="flex items-center space-x-1">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: getLevelColor(level) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;