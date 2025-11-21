'use client';

import { useState } from 'react';
import { trackNewsletterSignup } from '@/lib/analytics';

interface NewsletterProps {
  variant?: 'inline' | 'popup';
  title?: string;
  description?: string;
}

export default function NewsletterSignup({ 
  variant = 'inline',
  title = 'Get Exclusive Travel Deals',
  description = 'Subscribe to our newsletter and save up to 30% on your next booking'
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Track newsletter signup
    trackNewsletterSignup(email);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className={`${variant === 'popup' ? 'bg-white rounded-xl shadow-2xl p-8' : ''}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Successfully subscribed! Check your email for confirmation.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 text-center">
        By subscribing, you agree to our{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        Unsubscribe anytime.
      </p>

      {/* Benefits */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl mb-1">✉️</div>
          <p className="text-xs text-gray-600">Weekly deals</p>
        </div>
        <div>
          <div className="text-2xl mb-1">💰</div>
          <p className="text-xs text-gray-600">Exclusive discounts</p>
        </div>
        <div>
          <div className="text-2xl mb-1">🎁</div>
          <p className="text-xs text-gray-600">Travel tips</p>
        </div>
      </div>
    </div>
  );
}
