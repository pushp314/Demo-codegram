import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SnippetCard from './SnippetCard';
import { mockSnippets, Snippet } from '../../data/mockData';
import LoadingDots from '../UI/LoadingDots';

const HomeFeed: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const fetchSnippets = async (pageNum = 0, reset = false) => {
    if (pageNum === 0) setLoading(true);
    else setLoadingMore(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      let sortedSnippets = [...mockSnippets];
      sortedSnippets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      // Simulate pagination
      const startIndex = pageNum * 2;
      const endIndex = startIndex + 2;
      const pageData = sortedSnippets.slice(startIndex, endIndex);

      if (reset) {
        setSnippets(pageData);
      } else {
        setSnippets(prev => [...prev, ...pageData]);
      }

      setHasMore(endIndex < sortedSnippets.length);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchSnippets(0, true);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSnippets(nextPage);
    }
  }, [inView, hasMore, loadingMore, page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {snippets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No snippets found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new content.
          </p>
        </div>
      ) : (
        <>
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
          
          {/* Loading indicator for infinite scroll */}
          {hasMore && (
            <div ref={ref} className="flex items-center justify-center py-8">
              {loadingMore && <LoadingDots />}
            </div>
          )}
          
          {!hasMore && snippets.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-gray-500 dark:text-gray-400">
                <span>You've reached the end! 🎉</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeFeed;