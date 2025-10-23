// API Endpoints Configuration
export const API_ENDPOINTS = {
  // User endpoints
  USER: '/api/user',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_VERIFY: '/api/auth/verify',
  
  // Instructor endpoints
  INSTRUCTORS: '/api/instructors',
  INSTRUCTOR_DETAIL: (id: string) => `/api/instructors/${id}`,
  INSTRUCTOR_SEARCH: '/api/instructors/search',
  INSTRUCTOR_PROFILE: '/api/instructors/profile',
  
  // Lesson endpoints
  LESSONS: '/api/lessons',
  LESSON_DETAIL: (id: string) => `/api/lessons/${id}`,
  LESSON_BOOK: '/api/lessons/book',
  LESSON_CANCEL: (id: string) => `/api/lessons/${id}/cancel`,
  
  // Payment endpoints
  PAYMENTS: '/api/payments',
  PAYMENT_DETAIL: (id: string) => `/api/payments/${id}`,
  PAYMENT_CREATE: '/api/payments/create',
  PAYMENT_VERIFY: '/api/payments/verify',
  
  // Dashboard endpoints
  DASHBOARD_STATS: '/api/dashboard/stats',
  DASHBOARD_RECENT_LESSONS: '/api/dashboard/recent-lessons',
  DASHBOARD_UPCOMING_LESSONS: '/api/dashboard/upcoming-lessons',
  
  // Blog endpoints
  BLOG_POSTS: '/api/blog/posts',
  BLOG_POST_DETAIL: (slug: string) => `/api/blog/posts/${slug}`,
  
  // Forum endpoints
  FORUM_POSTS: '/api/forum/posts',
  FORUM_POST_DETAIL: (id: string) => `/api/forum/posts/${id}`,
  FORUM_COMMENT: '/api/forum/comments',
  
  // Help/Support endpoints
  SUPPORT_ARTICLES: '/api/support/articles',
  SUPPORT_ARTICLE_DETAIL: (id: string) => `/api/support/articles/${id}`,
  SUPPORT_CATEGORY: (category: string) => `/api/support/categories/${category}`,
  
  // Vehicle endpoints
  VEHICLE: '/api/vehicle',
  VEHICLE_UPLOAD: '/api/vehicle/upload',
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'Unauthorized. Please log in.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'language',
};
