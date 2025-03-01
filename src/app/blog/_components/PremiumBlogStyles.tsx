'use client';

import { useEffect } from 'react';

const PremiumBlogStyles = () => {
  useEffect(() => {
    // Insert the premium blog styles into the document head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Premium Blog Content Styling */
      .premium-blog-content {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #374151;
        line-height: 1.8;
      }

      /* Headings with gradient touch */
      .premium-blog-content h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
        color: #111827;
        scroll-margin-top: 80px;
        position: relative;
        padding-bottom: 0.75rem;
      }

      .premium-blog-content h1::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 80px;
        background: linear-gradient(to right, #3b82f6, #60a5fa);
        border-radius: 3px;
      }

      .premium-blog-content h2 {
        font-size: 1.875rem;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #1f2937;
        scroll-margin-top: 80px;
        position: relative;
      }

      .premium-blog-content h2::before {
        content: "";
        position: absolute;
        left: -1rem;
        top: 0.5rem;
        bottom: 0.5rem;
        width: 3px;
        background: linear-gradient(to bottom, #3b82f6, #60a5fa);
        border-radius: 3px;
        opacity: 0.6;
      }

      .premium-blog-content h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 0.75rem;
        color: #374151;
        scroll-margin-top: 80px;
      }

      /* Typography */
      .premium-blog-content p {
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
        letter-spacing: -0.01em;
      }

      .premium-blog-content strong {
        font-weight: 600;
        color: #111827;
      }

      /* Lists */
      .premium-blog-content ul, 
      .premium-blog-content ol {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
      }

      .premium-blog-content ul {
        list-style-type: none;
      }

      .premium-blog-content ul li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
      }

      .premium-blog-content ul li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.625rem;
        height: 0.375rem;
        width: 0.375rem;
        background: linear-gradient(to right, #3b82f6, #60a5fa);
        border-radius: 50%;
      }

      .premium-blog-content ol {
        list-style-type: decimal;
        list-style-position: outside;
      }

      .premium-blog-content ol li {
        margin-bottom: 0.75rem;
        padding-left: 0.5rem;
      }

      /* Links */
      .premium-blog-content a {
        color: #2563eb;
        text-decoration: none;
        position: relative;
        font-weight: 500;
        transition: all 0.2s ease;
        background-image: linear-gradient(to right, #3b82f6, #60a5fa);
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100% 1px;
      }

      .premium-blog-content a:hover {
        color: #1d4ed8;
        background-size: 100% 2px;
      }

      /* Blockquotes */
      .premium-blog-content blockquote {
        margin: 2rem 0;
        padding: 1.5rem 2rem;
        border-left: 4px solid #3b82f6;
        background: linear-gradient(to right, #f5f8ff, #f9fafc);
        border-radius: 0 0.5rem 0.5rem 0;
        font-style: italic;
        color: #4b5563;
        position: relative;
      }

      .premium-blog-content blockquote::before {
        content: """;
        position: absolute;
        top: -1rem;
        left: 1rem;
        font-size: 5rem;
        color: rgba(59, 130, 246, 0.1);
        font-family: Georgia, serif;
      }

      .premium-blog-content blockquote p {
        margin-bottom: 0;
        position: relative;
        z-index: 1;
      }

      /* Images */
      .premium-blog-content img {
        border-radius: 0.75rem;
        max-width: 100%;
        height: auto;
        margin: 2rem 0;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
        transition: all 0.3s ease;
        border: 1px solid rgba(226, 232, 240, 0.8);
      }

      .premium-blog-content img:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
      }

      /* Image alignment with smooth transitions */
      .premium-blog-content img.img-align-left,
      .premium-blog-content img.blog-image.img-align-left {
        float: left;
        margin-right: 2rem;
        margin-bottom: 1.5rem;
        clear: left;
        transition: all 0.3s ease;
      }

      .premium-blog-content img.img-align-center,
      .premium-blog-content img.blog-image.img-align-center {
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
        float: none !important;
        clear: both !important;
        transition: all 0.3s ease;
      }

      .premium-blog-content img.img-align-right,
      .premium-blog-content img.blog-image.img-align-right {
        float: right;
        margin-left: 2rem;
        margin-bottom: 1.5rem;
        clear: right;
        transition: all 0.3s ease;
      }

      /* Clear fixes */
      .premium-blog-content p:after {
        content: "";
        display: table;
        clear: both;
      }

      /* Tables */
      .premium-blog-content table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 2rem 0;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        border: 1px solid rgba(226, 232, 240, 1);
      }

      .premium-blog-content table th,
      .premium-blog-content table td {
        border: 1px solid #e5e7eb;
        padding: 0.875rem;
        text-align: left;
      }

      .premium-blog-content table th {
        background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
        font-weight: 600;
        color: #374151;
        position: relative;
      }

      .premium-blog-content table tr:nth-child(even) {
        background-color: #f9fafb;
      }

      .premium-blog-content table tr:hover {
        background-color: #f3f4f6;
      }

      /* Code blocks */
      .premium-blog-content pre {
        background: linear-gradient(to right, #1e293b, #0f172a);
        border-radius: 0.5rem;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 2rem 0;
        border: 1px solid rgba(30, 41, 59, 0.1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      }

      .premium-blog-content code {
        background-color: #f3f4f6;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Fira Code', 'Courier New', Courier, monospace;
        font-size: 0.875em;
        color: #374151;
        border: 1px solid #e5e7eb;
      }

      .premium-blog-content pre code {
        background-color: transparent;
        padding: 0;
        border: none;
        color: #e2e8f0;
        font-size: 0.95em;
        line-height: 1.6;
        display: block;
      }

      /* TipTap editor styles */
      .ProseMirror {
        padding: 1.5rem;
        min-height: 500px;
        border-radius: 0.5rem;
        outline: none !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        background: white;
      }

      .ProseMirror:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        border-color: #bfdbfe;
      }

      /* Small decorative elements */
      hr {
        border: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #e5e7eb, transparent);
        margin: 2.5rem 0;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .premium-blog-content h1 {
          font-size: 2rem;
        }

        .premium-blog-content h2 {
          font-size: 1.5rem;
        }

        .premium-blog-content h3 {
          font-size: 1.25rem;
        }

        .premium-blog-content p {
          font-size: 1rem;
        }

        .premium-blog-content img.img-align-left,
        .premium-blog-content img.img-align-right {
          float: none;
          margin-left: auto;
          margin-right: auto;
          display: block;
        }
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return null;
};

export default PremiumBlogStyles;