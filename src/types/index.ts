// Business project types
export interface BusinessProject {
  id: string;
  name: string;
  industry: string;
  description: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'draft';
  colorScheme: ColorScheme;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

// Document related types
export interface Document {
  id: string;
  projectId: string;
  filename: string;
  documentType: string;
  downloadPath: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'final';
  metadata?: Record<string, any>;
}

// Marketing related types
export interface SocialMediaRules {
  platform: string;
  postingFrequency: string;
  bestTimes: string;
  hashtagLimit: string;
  contentTypes: string;
  imageSpecs: string;
  tone: string;
}

export interface SocialMediaTemplate {
  id: string;
  projectId: string;
  platform: string;
  name: string;
  description: string;
  structure: string;
  example: string;
  imageSpecs: string;
}

export interface Campaign {
  id: string;
  projectId: string;
  name: string;
  status: 'planned' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  platforms: string[];
  metrics: CampaignMetrics;
  audience: CampaignAudience;
  creatives: CampaignCreative[];
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roi: number;
}

export interface CampaignAudience {
  demographics: string;
  interests: string;
  locations: string;
}

export interface CampaignCreative {
  id: string;
  type: 'image' | 'video' | 'text';
  name: string;
  performance: string;
  downloadPath: string;
}

export interface ContentCreator {
  id: string;
  projectId: string;
  name: string;
  handle: string;
  platforms: string[];
  audienceSize: number;
  engagementRate: number;
  audienceDemographics: {
    age: string;
    gender: string;
    interests: string;
    location: string;
  };
  pastCampaigns: {
    campaign: string;
    performance: string;
    contentType: string;
    dates: string;
  }[];
  status: 'active' | 'potential' | 'inactive';
  notes: string;
}

// Calendar related types
export interface CalendarEvent {
  id: string;
  projectId: string;
  title: string;
  date: string;
  type: 'event' | 'deadline' | 'task';
  description: string;
  status?: 'pending' | 'completed';
}

// Technical related types
export interface Repository {
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  url: string;
  projectId: string;
}
