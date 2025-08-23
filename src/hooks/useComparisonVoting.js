// hooks/useComparisonVoting.js
import { useState, useEffect, useCallback } from 'react';

export function useComparisonVoting(comparisonSlug) {
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
    if (!browserId || !comparisonSlug) return;

    try {
      // Fetch vote counts and user vote in parallel
      const [countsRes, userVoteRes] = await Promise.all([
        fetch(`/api/comparisons/${comparisonSlug}/vote-counts`),
        fetch(`/api/comparisons/${comparisonSlug}/user-vote`, {
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
      console.error('Failed to fetch comparison voting data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [comparisonSlug, getBrowserId]);

  const vote = useCallback(async (voteType) => {
    const browserId = getBrowserId();
    if (!browserId || !comparisonSlug) return;

    try {
      const response = await fetch(`/api/comparisons/${comparisonSlug}/vote`, {
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
      console.error('Comparison vote failed:', error);
    }
  }, [comparisonSlug, getBrowserId]);

  const fetchVoteCounts = useCallback(async () => {
    if (!comparisonSlug) return;
    
    try {
      const response = await fetch(`/api/comparisons/${comparisonSlug}/vote-counts`);
      const data = await response.json();
      setVotes(data);
    } catch (error) {
      console.error('Failed to fetch comparison vote counts:', error);
    }
  }, [comparisonSlug]);

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