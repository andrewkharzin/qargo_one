// Application constants
export const APP_NAME = 'AeroQ';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Next-Gen Cargo Booking Platform';

// API Configuration
// export const API_CONFIG = {
//   BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
//   TIMEOUT: 10000,
//   RETRY_ATTEMPTS: 3,
// } as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CARGO: '/cargo',
  BOOKINGS: '/bookings',
  ANALYTICS: '/analytics',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'Dashboard',
  },
  {
    label: 'Cargo Management',
    href: ROUTES.CARGO,
    icon: 'Package',
  },
  {
    label: 'Bookings',
    href: ROUTES.BOOKINGS,
    icon: 'Calendar',
  },
  {
    label: 'Analytics',
    href: ROUTES.ANALYTICS,
    icon: 'BarChart',
  },
  {
    label: 'Settings',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
] as const;

// Feature flags
export const FEATURES = {
  REAL_TIME_TRACKING: true,
  ANALYTICS: true,
  NOTIFICATIONS: true,
  MULTI_LANGUAGE: false,
  DARK_MODE: true,
} as const;

// Cargo types configuration
export const CARGO_TYPES = {
  GENERAL: {
    label: 'General Cargo',
    description: 'Standard cargo items',
    maxWeight: 1000, // kg
    maxDimensions: { length: 300, width: 200, height: 200 }, // cm
  },
  PERISHABLE: {
    label: 'Perishable Goods',
    description: 'Food, flowers, pharmaceuticals',
    maxWeight: 500,
    maxDimensions: { length: 200, width: 150, height: 150 },
    requiresCooling: true,
  },
  DANGEROUS: {
    label: 'Dangerous Goods',
    description: 'Hazardous materials',
    maxWeight: 200,
    maxDimensions: { length: 150, width: 100, height: 100 },
    requiresSpecialHandling: true,
  },
  FRAGILE: {
    label: 'Fragile Items',
    description: 'Glass, electronics, artwork',
    maxWeight: 300,
    maxDimensions: { length: 250, width: 180, height: 180 },
    requiresSpecialPackaging: true,
  },
  OVERSIZED: {
    label: 'Oversized Cargo',
    description: 'Large equipment, machinery',
    maxWeight: 5000,
    maxDimensions: { length: 500, width: 400, height: 400 },
    requiresSpecialEquipment: true,
  },
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: {
    label: 'Low Priority',
    color: 'green',
    deliveryTime: '5-7 days',
    priceMultiplier: 1.0,
  },
  MEDIUM: {
    label: 'Medium Priority',
    color: 'yellow',
    deliveryTime: '3-5 days',
    priceMultiplier: 1.2,
  },
  HIGH: {
    label: 'High Priority',
    color: 'orange',
    deliveryTime: '1-3 days',
    priceMultiplier: 1.5,
  },
  URGENT: {
    label: 'Urgent',
    color: 'red',
    deliveryTime: 'Same day',
    priceMultiplier: 2.0,
  },
} as const;

// Status colors
export const STATUS_COLORS = {
  PENDING: 'gray',
  BOOKED: 'blue',
  IN_TRANSIT: 'yellow',
  DELIVERED: 'green',
  CANCELLED: 'red',
  CONFIRMED: 'green',
  COMPLETED: 'green',
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  PASSWORD: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  },
  PHONE: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    message: 'Please enter a valid phone number',
  },
  WEIGHT: {
    min: 0.1,
    max: 10000,
    message: 'Weight must be between 0.1 and 10,000 kg',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'aeroq_auth_token',
  USER_DATA: 'aeroq_user_data',
  THEME: 'aeroq_theme',
  LANGUAGE: 'aeroq_language',
  SIDEBAR_COLLAPSED: 'aeroq_sidebar_collapsed',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in.',
  LOGOUT_SUCCESS: 'Successfully logged out.',
  CARGO_CREATED: 'Cargo created successfully.',
  CARGO_UPDATED: 'Cargo updated successfully.',
  BOOKING_CREATED: 'Booking created successfully.',
  BOOKING_UPDATED: 'Booking updated successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;
