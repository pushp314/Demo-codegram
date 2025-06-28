import React from 'react';
import BugStories from '../components/Stories/BugStories';
import HomeFeed from '../components/Feed/HomeFeed';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Bug Stories */}
      <BugStories />

      {/* Main Feed */}
      <HomeFeed />
    </div>
  );
};

export default Home;