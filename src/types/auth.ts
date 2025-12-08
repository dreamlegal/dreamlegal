// types/auth.ts

export type UserType = 'user' | 'vendor';

export interface AuthUser {
  id: string;
  email: string;
  type: UserType;
  exp: number;
}

export interface AccessRule {
  limit?: number;           // Number of actions allowed (undefined = unlimited for auth users)
  period?: 'day' | 'month'; // Reset period
  requireAuth?: boolean;    // If true, requires login (no anonymous access)
  message?: string;         // Message to show when blocked
}

export interface ActionUsage {
  count: number;
  lastReset: string;
  items?: string[];         // Track specific items (e.g., article IDs) to prevent double-counting
}

export interface AccessCheckResult {
  allowed: boolean;
  remaining?: number;
  reason?: string;
  requiresAuth?: boolean;
}