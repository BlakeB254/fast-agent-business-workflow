// js/data.js - Mock data for frontend demonstration

// Mock business data
const mockBusinessData = {
    companyName: 'Acme Inc.',
    industry: 'technology',
    businessPlan: 'Create innovative products for everyday use',
    website: 'https://acme.example.com',
    contactEmail: 'info@acme.example.com',
    contactPhone: '555-123-4567',
    logoUploaded: true,
    colorScheme: {
        primary: '#3498db',
        secondary: '#2c3e50',
        accent: '#e74c3c'
    }
};

// Mock document data
const mockDocuments = [
    {
        filename: 'business_plan_2025.pdf',
        document_type: 'business_plan',
        download_path: '#',
        metadata: {
            created_at: '2025-01-15T10:30:00',
            status: 'final'
        }
    },
    {
        filename: 'license_renewal.pdf',
        document_type: 'license',
        download_path: '#',
        metadata: {
            created_at: '2025-02-20T14:45:00',
            status: 'draft'
        }
    },
    {
        filename: 'marketing_strategy_q2.pdf',
        document_type: 'marketing',
        download_path: '#',
        metadata: {
            created_at: '2025-03-01T09:15:00',
            status: 'review'
        }
    }
];

// Mock marketing data - social media rules
const mockSocialMediaRules = {
    instagram: {
        posting_frequency: '3-5 times per week',
        best_times: '12pm, 3pm, 6pm',
        hashtag_limit: '5-10 relevant hashtags',
        content_types: 'Images, Carousels, Reels, Stories',
        image_specs: '1080x1080px (feed), 1080x1920px (stories)',
        tone: 'Visual, conversational, authentic'
    },
    facebook: {
        posting_frequency: '3-5 times per week',
        best_times: '1pm, 3pm, 9am',
        hashtag_limit: '1-2 relevant hashtags',
        content_types: 'Images, Videos, Links, Text',
        image_specs: '1200x630px (links), 1080x1080px (square)',
        tone: 'Informative, friendly, engaging'
    },
    twitter: {
        posting_frequency: '1-5 times per day',
        best_times: '8am, 12pm, 3pm',
        hashtag_limit: '1-2 relevant hashtags',
        content_types: 'Text, Images, Videos, Polls',
        image_specs: '1200x675px',
        tone: 'Conversational, concise, timely'
    }
};

// Mock campaign data
const mockCampaigns = [
    {
        id: '1',
        name: 'Summer Product Launch',
        status: 'active',
        start_date: '2025-06-01',
        end_date: '2025-07-15',
        budget: 5000,
        spent: 2350,
        platforms: ['facebook', 'instagram', 'google'],
        metrics: {
            impressions: 250000,
            clicks: 12500,
            ctr: 5.0,
            conversions: 750,
            cpa: 3.13,
            roi: 285
        }
    },
    {
        id: '2',
        name: 'Holiday Sale Campaign',
        status: 'planned',
        start_date: '2025-11-25',
        end_date: '2025-12-31',
        budget: 8000,
        spent: 0,
        platforms: ['facebook', 'instagram', 'google', 'pinterest'],
        metrics: {
            impressions: 0,
            clicks: 0,
            ctr: 0,
            conversions: 0,
            cpa: 0,
            roi: 0
        }
    }
];

// Mock calendar data
const mockEvents = [
    {
        id: '1',
        title: 'Business License Renewal',
        date: '2025-04-15',
        type: 'deadline',
        description: 'Annual business license renewal due'
    },
    {
        id: '2',
        title: 'Product Launch',
        date: '2025-06-01',
        type: 'event',
        description: 'Summer product line launch event'
    },
    {
        id: '3',
        title: 'Tax Filing',
        date: '2025-04-15',
        type: 'deadline',
        description: 'Quarterly tax filing deadline'
    }
];

// Mock repository data
const mockRepositories = [
    {
        name: 'company-website',
        description: 'Main corporate website repository',
        language: 'JavaScript',
        updated_at: '2025-03-15T10:30:00'
    },
    {
        name: 'mobile-app',
        description: 'Customer mobile application',
        language: 'Swift',
        updated_at: '2025-03-20T15:45:00'
    }
];