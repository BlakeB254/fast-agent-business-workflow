// Business data types
export interface BusinessData {
  companyName: string;
  industry: string;
  businessPlan: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  logoUploaded: boolean;
  colorScheme: ColorScheme;
  fieldStatus?: Record<string, FieldStatus>;
}

export type FieldStatus = 'in_progress' | 'finalized';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

// Document types
export interface Document {
  filename: string;
  document_type: string;
  download_path: string;
  metadata?: DocumentMetadata;
}

export interface DocumentMetadata {
  created_at: string;
  status: DocumentStatus;
  created_by?: string;
  last_modified_at?: string;
  last_modified_by?: string;
  local_path?: string;
}

export type DocumentStatus = 'draft' | 'review' | 'final';

// Marketing types
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
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  budget: number;
  spent: number;
  platforms: string[];
  metrics: CampaignMetrics;
  audience?: {
    demographics: string;
    interests: string;
    locations: string;
  };
  creatives?: Array<{
    type: string;
    name: string;
    performance: string;
    download_path: string;
  }>;
}

export type CampaignStatus = 'active' | 'planned' | 'completed' | 'paused';

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roi: number;
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
  past_campaigns: Array<{
    campaign: string;
    performance: string;
    content_type: string;
    dates: string;
  }>;
  status: 'active' | 'potential' | 'past';
  notes?: string;
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: EventType;
  description: string;
  related_to?: string;
  status?: string;
}

export type EventType = 'event' | 'deadline' | 'meeting' | 'task';

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed';
  assigned_to?: string;
  related_to?: string;
}

// Technical types
export interface Repository {
  name: string;
  description: string;
  language: string;
  updated_at: string;
  url?: string;
}

export interface Component {
  name: string;
  path: string;
  type: 'page' | 'component';
  description?: string;
}

// API response types
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}
