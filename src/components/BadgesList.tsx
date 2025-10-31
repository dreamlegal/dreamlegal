import React from 'react';

const DLBadge = ({ text, year }) => {
  return (
    <svg width="50" height="60" viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="whiteBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f7fa" />
        </linearGradient>
        
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      <path d="M 20 10 L 120 10 L 120 110 L 70 150 L 20 110 Z" 
            fill="url(#whiteBg)" 
            stroke="#e5e7eb" 
            strokeWidth="1"
            filter="url(#shadow)"/>
      
      <path d="M 70 5 L 85 15 L 85 27 L 70 35 L 55 27 L 55 15 Z" 
            fill="#1e2556"/>
      
      <text x="70" y="26" 
            fontFamily="Arial, sans-serif" 
            fontSize="11" 
            fontWeight="bold" 
            fill="white" 
            textAnchor="middle"
            letterSpacing="0.5">
        DL
      </text>
      
      <text x="70" y="60" 
            fontFamily="Arial, sans-serif" 
            fontSize="14" 
            fontWeight="700" 
            fill="#1e2556" 
            textAnchor="middle">
        {text.split('\n')[0]}
      </text>
      <text x="70" y="77" 
            fontFamily="Arial, sans-serif" 
            fontSize="14" 
            fontWeight="700" 
            fill="#1e2556" 
            textAnchor="middle">
        {text.split('\n')[1]}
      </text>
      
      <rect x="30" y="87" width="80" height="22" rx="3" fill="#7cc6ee"/>
      <text x="70" y="102" 
            fontFamily="Arial, sans-serif" 
            fontSize="10" 
            fontWeight="600" 
            fill="white" 
            textAnchor="middle"
            letterSpacing="0.5">
        DREAMLEGAL
      </text>
      
      <text x="70" y="128" 
            fontFamily="Arial, sans-serif" 
            fontSize="16" 
            fontWeight="700" 
            fill="#1e2556" 
            textAnchor="middle">
        {year}
      </text>
    </svg>
  );
};

const BadgesList = () => {
  const badgesData = [
    { text: "High\nPerformer", year: "2024" },
    { text: "Best\nSoftware", year: "2025" },
    { text: "Top\nRated", year: "2024" },
    // { text: "Leader\nAward", year: "2025" },
    // { text: "Best\nValue", year: "2024" },
    // { text: "Users Love\nUs", year: "2025" }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {badgesData.map((badge, index) => (
        <div key={index}>
          <DLBadge text={badge.text} year={badge.year} />
        </div>
      ))}
    </div>
  );
};

export default BadgesList;