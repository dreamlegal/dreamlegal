// hooks/useVoting.js
import { useState, useEffect, useCallback } from 'react';

export function useVoting(articleId) {
  const [votes, setVotes] = useState({ likes: 0, dislikes: 0 });
  const [userVote, setUserVote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate and store browser ID
  const getBrowserId = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    let browserId = localStorage.getItem('browserId');
    if (!browserId) {
      browserId = `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('browserId', browserId);
    }
    return browserId;
  }, []);

  const fetchData = useCallback(async () => {
    const browserId = getBrowserId();
    if (!browserId) return;

    try {
      // Fetch vote counts and user vote in parallel
      const [countsRes, userVoteRes] = await Promise.all([
        fetch(`/api/articles/${articleId}/vote-counts`),
        fetch(`/api/articles/${articleId}/user-vote`, {
          headers: { 'X-Browser-ID': browserId }
        })
      ]);

      const [counts, userVoteData] = await Promise.all([
        countsRes.json(),
        userVoteRes.json()
      ]);

      setVotes(counts);
      setUserVote(userVoteData.userVote);
    } catch (error) {
      console.error('Failed to fetch voting data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [articleId, getBrowserId]);

  const vote = useCallback(async (voteType) => {
    const browserId = getBrowserId();
    if (!browserId) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Browser-ID': browserId
        },
        body: JSON.stringify({ voteType })
      });

      const result = await response.json();

      if (response.ok) {
        // Update local state based on response
        if (result.status === 'removed') {
          setUserVote(null);
        } else {
          setUserVote(result.voteType);
        }

        // Refresh vote counts
        await fetchVoteCounts();
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  }, [articleId, getBrowserId]);

  const fetchVoteCounts = useCallback(async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}/vote-counts`);
      const data = await response.json();
      setVotes(data);
    } catch (error) {
      console.error('Failed to fetch vote counts:', error);
    }
  }, [articleId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    votes,
    userVote,
    isLoading,
    vote
  };
}