
import React from 'react';

export interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  index: number;
}

export interface PillarProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Article {
  id: string;
  title: { en: string; fr: string };
  date: { en: string; fr: string };
  category: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  content: { en: string[]; fr: string[] };
  imageUrl: string;
  readTime: { en: string; fr: string };
}

export interface AIProject {
  id: string;
  name: string;
  description: { en: string; fr: string };
  status: 'LIVE' | 'R&D' | 'BETA';
  tech: string[];
  business: string[];
  industry: string;
}

export type Language = 'en' | 'fr';
