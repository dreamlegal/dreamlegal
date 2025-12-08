// lib/access-control.ts

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { AccessRule, ActionUsage, AccessCheckResult } from '@/types/auth';

const BROWSER_ID_COOKIE = 'browserId';
const ACTIONS_COOKIE = 'userActions';
const COOKIE_EXPIRY_DAYS = 30;

// Get or create browser ID for anonymous tracking
export function getBrowserId(): string {
  let browserId = Cookies.get(BROWSER_ID_COOKIE);
  
  if (!browserId) {
    browserId = uuidv4();
    Cookies.set(BROWSER_ID_COOKIE, browserId, { 
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'lax'
    });
  }
  
  return browserId;
}

// Get all actions from cookie
function getActions(): Record<string, ActionUsage> {
  const actionsStr = Cookies.get(ACTIONS_COOKIE);
  if (!actionsStr) return {};
  
  try {
    return JSON.parse(actionsStr);
  } catch {
    return {};
  }
}

// Save actions to cookie
function saveActions(actions: Record<string, ActionUsage>): void {
  Cookies.set(ACTIONS_COOKIE, JSON.stringify(actions), { 
    expires: COOKIE_EXPIRY_DAYS,
    sameSite: 'lax'
  });
}

// Check if period has expired and needs reset
function shouldResetUsage(usage: ActionUsage, period?: 'day' | 'month'): boolean {
  if (!period || !usage.lastReset) return false;
  
  const lastReset = new Date(usage.lastReset);
  const now = new Date();
  
  if (period === 'day') {
    return lastReset.toDateString() !== now.toDateString();
  } else if (period === 'month') {
    return (
      lastReset.getMonth() !== now.getMonth() ||
      lastReset.getFullYear() !== now.getFullYear()
    );
  }
  
  return false;
}

// Check if user can perform action
export function checkAccess(
  action: string,
  rule: AccessRule,
  isAuthenticated: boolean
): AccessCheckResult {
  // ✅ LOGGED IN USERS = ALWAYS ALLOWED
  if (isAuthenticated) {
    return { allowed: true };
  }
  
  // ❌ NOT LOGGED IN = CHECK RULES
  
  // If action requires auth (no limit, just needs login)
  if (rule.requireAuth && !rule.limit) {
    return { 
      allowed: false, 
      requiresAuth: true,
      reason: rule.message || 'Please login to continue'
    };
  }
  
  // If action has a limit (e.g., 3 articles)
  if (rule.limit) {
    const actions = getActions();
    let usage = actions[action];
    
    // Reset if period expired
    if (usage && shouldResetUsage(usage, rule.period)) {
      usage = {
        count: 0,
        lastReset: new Date().toISOString(),
        items: []
      };
    }
    
    const currentCount = usage?.count || 0;
    
    if (currentCount >= rule.limit) {
      return { 
        allowed: false,
        remaining: 0,
        requiresAuth: false,
        reason: rule.message || `Limit of ${rule.limit} reached. Please login for unlimited access.`
      };
    }
    
    return { 
      allowed: true,
      remaining: rule.limit - currentCount
    };
  }
  
  // Default: allow
  return { allowed: true };
}

// Track an action (increment count)
export function trackAction(
  action: string,
  rule: AccessRule,
  itemId?: string
): void {
  const actions = getActions();
  let usage = actions[action];
  
  // Initialize or reset if needed
  if (!usage || shouldResetUsage(usage, rule.period)) {
    usage = {
      count: 0,
      lastReset: new Date().toISOString(),
      items: []
    };
  }
  
  // If itemId provided, check if already tracked (prevent double-counting)
  if (itemId && usage.items?.includes(itemId)) {
    return; // Already counted
  }
  
  // Increment count
  usage.count += 1;
  
  // Track item ID if provided
  if (itemId) {
    if (!usage.items) usage.items = [];
    usage.items.push(itemId);
  }
  
  // Save
  actions[action] = usage;
  saveActions(actions);
}

// Clear all actions (useful for testing or after login)
export function clearActions(): void {
  Cookies.remove(ACTIONS_COOKIE);
}

// Get current usage for an action
export function getActionUsage(action: string): number {
  const actions = getActions();
  return actions[action]?.count || 0;
}