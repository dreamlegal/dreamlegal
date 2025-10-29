import React, { useState, useEffect } from 'react';

interface DLScoreBadgeProps {
  productId?: string;
  slug?: string;
  size?: 'small' | 'medium' | 'large';
}

const DLScoreBadge = ({ productId, slug, size = 'medium' }: DLScoreBadgeProps) => {
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const params = new URLSearchParams();
        if (productId) params.append('productId', productId);
        if (slug) params.append('slug', slug);

        const response = await fetch(`/api/dl-score?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setScoreData(data);
        }
      } catch (error) {
        console.error('Error fetching DL score:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId || slug) {
      fetchScore();
    }
  }, [productId, slug]);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 ${
        size === 'small' ? 'w-16 h-8' : size === 'large' ? 'w-24 h-12' : 'w-20 h-10'
      }`}></div>
    );
  }

  if (!scoreData?.hasScore) {
    return (
      <div style={{ backgroundColor: '#f5f7fa' }} className={`flex items-center justify-center ${
        size === 'small' ? 'px-2 py-1' : size === 'large' ? 'px-4 py-2' : 'px-3 py-1.5'
      }`}>
        <span style={{ color: '#334155' }} className={`font-medium ${
          size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'
        }`}>
          N/A
        </span>
      </div>
    );
  }

  const getBandColor = (band: string) => {
    // All bands use the brand dark color
    return '#1e2556';
  };

  const bandColor = getBandColor(scoreData.dlBand);

  return (
    <div 
      className={`flex items-center justify-center shadow-sm ${
        size === 'small' ? 'px-2 py-1' : size === 'large' ? 'px-4 py-2' : 'px-3 py-1.5'
      }`}
      style={{ backgroundColor: bandColor }}
      title={`DL Score: ${scoreData.dlScore}/100 - ${scoreData.dlBand?.replace(/_/g, ' ')}`}
    >
      <div className="flex items-center gap-1">
        <span className={`font-bold ${
          size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'
        }`} style={{ color: 'white' }}>
          {scoreData.dlScore}
        </span>
        <span className={`font-semibold ${
          size === 'small' ? 'text-xs' : size === 'large' ? 'text-sm' : 'text-xs'
        }`} style={{ color: 'white' }}>
          DL Score
        </span>
      </div>
    </div>
  );
};

export default DLScoreBadge;