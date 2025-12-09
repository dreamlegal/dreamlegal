// lib/access-tracking.ts
import Cookies from 'js-cookie';

interface BlogAccessData {
  count: number;
  lastReset: string; // YYYY-MM format
  viewedArticles: string[]; // Array of article slugs
}

interface ComparisonAccessData {
  count: number;
  lastReset: string; // YYYY-MM-DD format
}

const BLOG_COOKIE_NAME = 'blog_access';
const COMPARISON_COOKIE_NAME = 'comparison_access';
const BLOG_MONTHLY_LIMIT = 3;
const COMPARISON_DAILY_LIMIT = 1;

// ============ BLOG ACCESS TRACKING ============

export function getBlogAccessData(): BlogAccessData {
  const cookieData = Cookies.get(BLOG_COOKIE_NAME);
  
  if (!cookieData) {
    return {
      count: 0,
      lastReset: getCurrentMonth(),
      viewedArticles: []
    };
  }

  try {
    return JSON.parse(cookieData);
  } catch {
    return {
      count: 0,
      lastReset: getCurrentMonth(),
      viewedArticles: []
    };
  }
}

export function canAccessBlog(articleSlug: string, isAuthenticated: boolean): boolean {
  // Logged-in users have unlimited access
  if (isAuthenticated) return true;

  const data = getBlogAccessData();
  const currentMonth = getCurrentMonth();

  // Reset if new month
  if (data.lastReset !== currentMonth) {
    resetBlogAccess();
    return true;
  }

  // Check if already viewed this article (don't count again)
  if (data.viewedArticles.includes(articleSlug)) {
    return true;
  }

  // Check if under limit
  return data.count < BLOG_MONTHLY_LIMIT;
}

export function trackBlogView(articleSlug: string, isAuthenticated: boolean): boolean {
  // Don't track for authenticated users
  if (isAuthenticated) return true;

  const data = getBlogAccessData();
  const currentMonth = getCurrentMonth();

  // Reset if new month
  if (data.lastReset !== currentMonth) {
    data.count = 0;
    data.lastReset = currentMonth;
    data.viewedArticles = [];
  }

  // If already viewed, don't increment
  if (data.viewedArticles.includes(articleSlug)) {
    return true;
  }

  // Check limit
  if (data.count >= BLOG_MONTHLY_LIMIT) {
    return false;
  }

  // Increment and save
  data.count++;
  data.viewedArticles.push(articleSlug);

  // Save cookie (expires in 1 year)
  Cookies.set(BLOG_COOKIE_NAME, JSON.stringify(data), { 
    expires: 365,
    path: '/'
  });

  return true;
}

export function getRemainingBlogViews(isAuthenticated: boolean): number {
  if (isAuthenticated) return Infinity;

  const data = getBlogAccessData();
  const currentMonth = getCurrentMonth();

  // Reset if new month
  if (data.lastReset !== currentMonth) {
    return BLOG_MONTHLY_LIMIT;
  }

  return Math.max(0, BLOG_MONTHLY_LIMIT - data.count);
}

function resetBlogAccess() {
  Cookies.set(BLOG_COOKIE_NAME, JSON.stringify({
    count: 0,
    lastReset: getCurrentMonth(),
    viewedArticles: []
  }), {
    expires: 365,
    path: '/'
  });
}

// ============ COMPARISON ACCESS TRACKING ============

export function getComparisonAccessData(): ComparisonAccessData {
  const cookieData = Cookies.get(COMPARISON_COOKIE_NAME);
  
  if (!cookieData) {
    return {
      count: 0,
      lastReset: getCurrentDate()
    };
  }

  try {
    return JSON.parse(cookieData);
  } catch {
    return {
      count: 0,
      lastReset: getCurrentDate()
    };
  }
}

export function canAccessComparison(isAuthenticated: boolean): boolean {
  // Logged-in users have unlimited access
  if (isAuthenticated) return true;

  const data = getComparisonAccessData();
  const currentDate = getCurrentDate();

  // Reset if new day
  if (data.lastReset !== currentDate) {
    resetComparisonAccess();
    return true;
  }

  // Check if under limit
  return data.count < COMPARISON_DAILY_LIMIT;
}

export function trackComparisonView(isAuthenticated: boolean): boolean {
  // Don't track for authenticated users
  if (isAuthenticated) return true;

  const data = getComparisonAccessData();
  const currentDate = getCurrentDate();

  // Reset if new day
  if (data.lastReset !== currentDate) {
    data.count = 0;
    data.lastReset = currentDate;
  }

  // Check limit
  if (data.count >= COMPARISON_DAILY_LIMIT) {
    return false;
  }

  // Increment and save
  data.count++;

  // Save cookie (expires at end of day)
  const expirationDate = new Date();
  expirationDate.setHours(23, 59, 59, 999);
  
  Cookies.set(COMPARISON_COOKIE_NAME, JSON.stringify(data), { 
    expires: expirationDate,
    path: '/'
  });

  return true;
}

export function getRemainingComparisons(isAuthenticated: boolean): number {
  if (isAuthenticated) return Infinity;

  const data = getComparisonAccessData();
  const currentDate = getCurrentDate();

  // Reset if new day
  if (data.lastReset !== currentDate) {
    return COMPARISON_DAILY_LIMIT;
  }

  return Math.max(0, COMPARISON_DAILY_LIMIT - data.count);
}

function resetComparisonAccess() {
  const expirationDate = new Date();
  expirationDate.setHours(23, 59, 59, 999);
  
  Cookies.set(COMPARISON_COOKIE_NAME, JSON.stringify({
    count: 0,
    lastReset: getCurrentDate()
  }), {
    expires: expirationDate,
    path: '/'
  });
}

// ============ UTILITY FUNCTIONS ============

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getCurrentDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// ============ RESET FUNCTIONS (for testing/admin) ============

export function resetAllAccess() {
  Cookies.remove(BLOG_COOKIE_NAME, { path: '/' });
  Cookies.remove(COMPARISON_COOKIE_NAME, { path: '/' });
}