// Google Analytics 4 Event Tracking Utilities
// Usage: import { trackEvent } from '@/lib/analytics';

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Generic event tracker for GA4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track search queries
 */
export const trackSearch = (params: {
  search_term: string;
  search_type: 'hotel' | 'flight' | 'car' | 'activity';
  destination?: string;
  check_in?: string;
  check_out?: string;
}) => {
  trackEvent('search', params);
};

/**
 * Track when user views property/hotel details
 */
export const trackViewItem = (params: {
  item_id: string;
  item_name: string;
  item_category: 'hotel' | 'flight' | 'car' | 'activity';
  price?: number;
  location?: string;
}) => {
  trackEvent('view_item', params);
};

/**
 * Track when user clicks "See Availability" or similar CTA
 */
export const trackSelectContent = (params: {
  content_type: string;
  item_id: string;
  item_name?: string;
}) => {
  trackEvent('select_content', params);
};

/**
 * Track newsletter signups
 */
export const trackNewsletterSignup = (email: string) => {
  trackEvent('newsletter_signup', {
    method: 'email',
    email_domain: email.split('@')[1] || 'unknown',
  });
};

/**
 * Track price alert form submissions
 */
export const trackPriceAlert = (params: {
  destination: string;
  email_domain: string;
}) => {
  trackEvent('price_alert_signup', params);
};

/**
 * Track social sharing
 */
export const trackShare = (params: {
  method: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email' | 'copy';
  content_type: 'blog_post' | 'hotel' | 'destination';
  item_id?: string;
}) => {
  trackEvent('share', params);
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (params: {
  url: string;
  link_text?: string;
}) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: params.url,
    link_text: params.link_text,
  });
};

/**
 * Track booking initiation
 */
export const trackBeginCheckout = (params: {
  item_id: string;
  item_name: string;
  item_category: 'hotel' | 'flight' | 'car' | 'activity';
  price: number;
  currency: string;
}) => {
  trackEvent('begin_checkout', {
    currency: params.currency,
    value: params.price,
    items: [
      {
        item_id: params.item_id,
        item_name: params.item_name,
        item_category: params.item_category,
        price: params.price,
      },
    ],
  });
};

/**
 * Track completed purchase
 */
export const trackPurchase = (params: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    item_category: string;
    price: number;
    quantity: number;
  }>;
}) => {
  trackEvent('purchase', params);
};

/**
 * Track page views (automatic via router but can be called manually)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-W3YTBFV1LS', {
      page_path: url,
    });
  }
};

/**
 * Track user engagement time
 */
export const trackEngagement = (params: {
  engagement_time_msec: number;
  page_title: string;
}) => {
  trackEvent('user_engagement', params);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (params: {
  form_name: string;
  form_destination?: string;
}) => {
  trackEvent('form_submit', params);
};

/**
 * Track errors
 */
export const trackError = (params: {
  error_message: string;
  error_type: string;
  page_url?: string;
}) => {
  trackEvent('exception', {
    description: params.error_message,
    fatal: false,
    ...params,
  });
};
