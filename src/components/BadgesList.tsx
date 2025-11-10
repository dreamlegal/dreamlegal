// import React from "react";

// const DLBadge = ({ text, category, borderColor, logoUrl }) => {
//   const currentYear = new Date().getFullYear();

//   const svgContent = `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 850">
//       <defs>
//         <filter id="glow-${borderColor.replace("#", "")}">
//           <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
//           <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//       </defs>

//       <!-- Shield background -->
//       <g>
//         <path fill="#1e2556" d="M 689.257812 218.339844 L 618.964844 197.664062 L 624.980469 155.1875 
//           L 405.015625 109.042969 L 405.015625 109.03125 L 404.988281 109.039062 
//           L 404.957031 109.03125 L 404.957031 109.042969 L 184.996094 155.1875 
//           L 191.011719 197.664062 L 120.71875 218.339844 L 200.03125 605.515625 
//           L 404.988281 737.839844 L 609.945312 605.515625 Z"/>
//         <path fill="none" stroke="${borderColor}" stroke-width="12" filter="url(#glow-${borderColor.replace("#", "")})" 
//           d="M 404.988281 699.167969 L 229.121094 585.625 L 228.679688 583.46875 
//              L 159.507812 245.796875 L 158.539062 241.078125 L 227.117188 220.910156 
//              L 221.429688 180.738281 L 404.988281 142.230469 L 406.0625 142.457031 
//              L 588.546875 180.738281 L 582.859375 220.910156 L 651.4375 241.082031 
//              L 650.46875 245.800781 L 580.855469 585.628906 L 579.007812 586.820312 Z"/>
//       </g>

//       <!-- Square logo border box -->
//       <rect 
//         x="340" 
//         y="110" 
//         width="130" 
//         height="100" 
        
//         fill="#1e2556" 
//         stroke="${borderColor}" 
//         stroke-width="2" 

//       />

//       <!-- Logo image with padding inside the square -->
//       <image 
//         href="${logoUrl}" 
//         x="350" 
//         y="120" 
//         width="110" 
//         height="70" 
//         preserveAspectRatio="xMidYMid meet"
//       />

//       <!-- Title Text -->
//       <text x="405" y="370" font-family="Arial" font-size="66" font-weight="700" fill="${borderColor}" text-anchor="middle">
//         ${text.split("\n")[0]}
//       </text>
//       <text x="405" y="430" font-family="Arial" font-size="62" font-weight="700" fill="${borderColor}" text-anchor="middle">
//         ${text.split("\n")[1] || ""}
//       </text>

//       <!-- Category Box -->
//       <rect x="250" y="470" width="310" height="70" rx="14" fill="#f5f7fa"/>
//       <text x="405" y="515" font-family="Arial" font-size="34" font-weight="900" fill="#000" text-anchor="middle">
//         ${category}
//       </text>

//       <!-- Year Ellipse -->
//       <ellipse cx="405" cy="600" rx="58" ry="30" fill="${borderColor}"/>
//       <text x="405" y="612" font-family="Arial" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">
//         ${currentYear}
//       </text>
//     </svg>
//   `;

//   return (
//     <div style={{ width: "300px", height: "360px" }}>
//       <div dangerouslySetInnerHTML={{ __html: svgContent }} />
//     </div>
//   );
// };

// const BadgesList = () => {
//   const badgesData = [
//     {
//       text: "High\nPerformer",
//       category: "LEGAL AI",
//       borderColor: "#7cc6ee",
//     },
//   ];

//   const logoUrl = "/icons/favicon.png";

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", padding: "30px" }}>
//       {badgesData.map((badge, index) => (
//         <DLBadge
//           key={index}
//           text={badge.text}
//           category={badge.category}
//           borderColor={badge.borderColor}
//           logoUrl={logoUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default BadgesList;
import React from "react";

const DLBadge = ({ text, category, borderColor, logoUrl }) => {
  const currentYear = new Date().getFullYear();

  // 🔹 Added transform scale to reduce size uniformly
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 850">
      <g transform="scale(0.6)" transform-origin="center">
        <defs>
          <filter id="glow-${borderColor.replace("#", "")}">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Shield background -->
        <g>
          <path fill="#1e2556" d="M 689.257812 218.339844 L 618.964844 197.664062 L 624.980469 155.1875 
            L 405.015625 109.042969 L 405.015625 109.03125 L 404.988281 109.039062 
            L 404.957031 109.03125 L 404.957031 109.042969 L 184.996094 155.1875 
            L 191.011719 197.664062 L 120.71875 218.339844 L 200.03125 605.515625 
            L 404.988281 737.839844 L 609.945312 605.515625 Z"/>
          <path fill="none" stroke="${borderColor}" stroke-width="12" filter="url(#glow-${borderColor.replace("#", "")})" 
            d="M 404.988281 699.167969 L 229.121094 585.625 L 228.679688 583.46875 
               L 159.507812 245.796875 L 158.539062 241.078125 L 227.117188 220.910156 
               L 221.429688 180.738281 L 404.988281 142.230469 L 406.0625 142.457031 
               L 588.546875 180.738281 L 582.859375 220.910156 L 651.4375 241.082031 
               L 650.46875 245.800781 L 580.855469 585.628906 L 579.007812 586.820312 Z"/>
        </g>

        <!-- Square logo border box -->
        <rect 
          x="340" 
          y="110" 
          width="130" 
          height="100" 
          fill="#1e2556" 
          stroke="${borderColor}" 
          stroke-width="2" 
        />

        <!-- Logo image -->
        <image 
          href="${logoUrl}" 
          x="350" 
          y="120" 
          width="110" 
          height="70" 
          preserveAspectRatio="xMidYMid meet"
        />

        <!-- Title Text -->
        <text x="405" y="370" font-family="Arial" font-size="66" font-weight="700" fill="${borderColor}" text-anchor="middle">
          ${text.split("\n")[0]}
        </text>
        <text x="405" y="430" font-family="Arial" font-size="62" font-weight="700" fill="${borderColor}" text-anchor="middle">
          ${text.split("\n")[1] || ""}
        </text>

        <!-- Category Box -->
        <rect x="250" y="470" width="310" height="70" rx="14" fill="#f5f7fa"/>
        <text x="405" y="515" font-family="Arial" font-size="34" font-weight="900" fill="#000" text-anchor="middle">
          ${category}
        </text>

        <!-- Year Ellipse -->
        <ellipse cx="405" cy="600" rx="58" ry="30" fill="${borderColor}"/>
        <text x="405" y="612" font-family="Arial" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">
          ${currentYear}
        </text>
      </g>
    </svg>
  `;

  // 🔹 Reduced outer container size too
  return (
    <div style={{ width: "180px", height: "210px" }}>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

const BadgesList = () => {
  const badgesData = [
    {
      text: "High\nPerformer",
      category: "LEGAL AI",
      borderColor: "#7cc6ee",
    },
  ];

  const logoUrl = "/icons/favicon.png";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {badgesData.map((badge, index) => (
        <DLBadge
          key={index}
          text={badge.text}
          category={badge.category}
          borderColor={badge.borderColor}
          logoUrl={logoUrl}
        />
      ))}
    </div>
  );
};

export default BadgesList;
