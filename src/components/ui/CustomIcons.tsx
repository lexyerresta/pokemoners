'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PokeballIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} drop-shadow-sm`}
  >
    <path 
      d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" 
      fill="white" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12C2.5 12.5 2.55 12.8 2.6 13H21.4C21.45 12.8 21.5 12.5 21.5 12C21.5 6.75 17.25 2.5 12 2.5Z" 
      fill="#FF4B4B" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path d="M2.5 12.5H21.5" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="12" cy="12.5" r="3.5" fill="white" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12.5" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const HeartIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const StarIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const SaweriaIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Outline Heart */}
    <path 
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
      fill="white"
    />
    {/* Stylized 'S' stroke inside */}
    <path 
      d="M15 8c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2s.9 2 2 2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2c-1.1 0-2-.9-2-2" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

export const TrakteerIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M17 8H19C20.1 8 21 8.9 21 10V11C21 12.1 20.1 13 19 13H17" stroke="white" />
    <path d="M3 8H17V15C17 17.21 15.21 19 13 19H7C4.79 19 3 17.21 3 15V8Z" fill="currentColor" />
    <path d="M6 5C6 4 7 3 8 3" stroke="white" />
    <path d="M10 5C10 4 11 3 12 3" stroke="white" />
    <path d="M14 5C14 4 15 3 16 3" stroke="white" />
  </svg>
);

export const PencilIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M18.41 2C18.15 2 17.89 2.1 17.71 2.29L15.3 4.7L19.3 8.7L21.71 6.29C22.1 5.9 22.1 5.27 21.71 4.88L19.12 2.29C18.94 2.1 18.68 2 18.41 2ZM14.06 5.94L3 17.02V21H6.98L18.06 9.94L14.06 5.94Z" 
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);

export const DoodleStar = ({ className = '', size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C12 2 13 8 16 9C19 10 22 10 22 10C22 10 16 11 15 14C14 17 14 22 14 22C14 22 13 16 10 15C7 14 2 14 2 14C2 14 8 13 9 10C10 7 10 2 10 2" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CardWikiIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z" stroke="currentColor" strokeWidth="2.1" fill="white" />
    <path d="M8 7H12M8 11H16M8 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15" cy="7.5" r="1.5" fill="currentColor" className="text-pastel-pink opacity-80" />
  </svg>
);

export const PacksIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" stroke="currentColor" strokeWidth="2" fill="white" />
    <path d="M3 8L12 13M12 13L21 8M12 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 5.5L16 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-40" />
  </svg>
);

export const PriceTagIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2.2" fill="white" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    <path d="M11 13C11 13 12 14 13 14M11 17C11 17 12 18 13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-wintergreen" />
  </svg>
);

export const PinIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4" fill="currentColor" stroke="black" strokeWidth="1.5" className="text-pastel-pink" />
    <path d="M12 11V21" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 21H14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PaperclipIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 7.91V16c0 2.76 2.24 5 5 5s5-2.24 5-5V6.91c0-1.61-1.3-2.91-2.91-2.91s-2.91 1.3-2.91 2.91V15c0 .5.41.91.91.91s.91-.41.91-.91V7.91" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
