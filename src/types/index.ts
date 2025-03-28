// Business project types
export interface Project {
  id: string;
  name: string;
  industry: string;
  description: string;
  logo?: string;
  createdDate: string;
  lastModified: string;
  status: 'active' | 'archived' | 'draft';
  colorScheme: ColorScheme;
  documentCount: number;
  campaignCount: number;
  eventCount: number;
  repoCount: number;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

// Document related types
export interface Document {
  id?: string;
  projectId?: string;
  filename: string;
  document_type: string;
  download_path: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: {
    created_at?: string;
    status?: 'draft' | 'review' | 'final';
    [key: string]: any;
  };
}

// Field status type for onboarding
export interface FieldStatus {
  companyName: 'in_progress' | 'finalized';
  industry: 'in_progress' | 'finalized';
  businessPlan: 'in_progress' | 'finalized';
  website: 'in_progress' | 'finalized';
  contactEmail: 'in_progress' | 'finalized';
  contactPhone: 'in_progress' | 'finalized';
}

// Marketing related types
export interface SocialMediaRule {
  posting_frequency: string;
  best_times: string;
  hashtag_limit: string;
  content_types: string;
  image_specs: string;
  tone: string;
}

export interface SocialMediaTemplate {
  id: string;
  name: string;
  description: string;
  structure: string;
  example: string;
  image_specs: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'planned' | 'active' | 'completed';
  start_date: string;
  end_date: string;
  budget: number;
  spent: number;
  platforms: string[];
  metrics: CampaignMetrics;
  audience?: CampaignAudience;
  creatives?: CampaignCreative[];
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
  type: 'image' | 'video' | 'text';
  name: string;
  performance: string;
  download_path: string;
}

export interface ContentCreator {
  id: string;
  name: string;
  handle: string;
  platforms: string[];
  audience_size: number;
  engagement_rate: number;
  audience_demographics: {
    age: string;
    gender: string;
    interests: string;
    location: string;
  };
  past_campaigns: {
    campaign: string;
    performance: string;
    content_type: string;
    dates: string;
  }[];
  status: 'active' | 'potential' | 'inactive';
  notes: string;
}

// Calendar related types
export interface CalendarEvent {
  id: string;
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
  url?: string;
}
