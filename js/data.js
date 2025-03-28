// js/data.js - Mock data for frontend demonstration

// Mock projects data
const mockProjects = [
    {
        id: 'project-1',
        name: 'Acme Inc.',
        industry: 'Technology',
        logoUrl: '/ui/assets/logo-placeholder.png',
        createdDate: '2025-01-15',
        lastModified: '2025-03-20',
        status: 'active',
        description: 'Enterprise SaaS platform for workflow management',
        documentCount: 12,
        campaignCount: 3,
        eventCount: 8,
        repoCount: 2,
        colorScheme: {
            primary: '#3498db',
            secondary: '#2c3e50',
            accent: '#e74c3c'
        }
    },
    {
        id: 'project-2',
        name: 'Green Foods',
        industry: 'Food & Beverage',
        logoUrl: '/ui/assets/logo-placeholder.png',
        createdDate: '2025-02-10',
        lastModified: '2025-03-15',
        status: 'active',
        description: 'Organic food product line and distribution',
        documentCount: 8,
        campaignCount: 2,
        eventCount: 5,
        repoCount: 1,
        colorScheme: {
            primary: '#27ae60',
            secondary: '#2c3e50',
            accent: '#f39c12'
        }
    },
    {
        id: 'project-3',
        name: 'UrbanLiving',
        industry: 'Real Estate',
        logoUrl: '/ui/assets/logo-placeholder.png',
        createdDate: '2024-11-05',
        lastModified: '2025-02-28',
        status: 'active',
        description: 'Modern urban apartment complexes and community spaces',
        documentCount: 15,
        campaignCount: 1,
        eventCount: 10,
        repoCount: 3,
        colorScheme: {
            primary: '#9b59b6',
            secondary: '#34495e',
            accent: '#1abc9c'
        }
    }
];

// Project-specific mock data
const projectData = {
    'project-1': {
        // Business data
        business: {
            companyName: 'Acme Inc.',
            industry: 'technology',
            businessPlan: 'Create innovative SaaS solutions for enterprise workflow management',
            website: 'https://acme.example.com',
            contactEmail: 'info@acme.example.com',
            contactPhone: '555-123-4567',
            logoUploaded: true,
            colorScheme: {
                primary: '#3498db',
                secondary: '#2c3e50',
                accent: '#e74c3c'
            }
        },
        
        // Documents
        documents: [
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
                filename: 'marketing_strategy_q2.pdf',
                document_type: 'marketing',
                download_path: '#',
                metadata: {
                    created_at: '2025-03-01T09:15:00',
                    status: 'review'
                }
            },
            {
                filename: 'employee_handbook.pdf',
                document_type: 'policy',
                download_path: '#',
                metadata: {
                    created_at: '2025-02-10T14:30:00',
                    status: 'final'
                }
            }
        ],
        
        // Marketing data
        socialMediaRules: {
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
        },
        
        campaigns: [
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
        ],
        
        // Calendar data
        events: [
            {
                id: '1',
                title: 'Product Launch',
                date: '2025-06-01',
                type: 'event',
                description: 'Summer product line launch event'
            },
            {
                id: '2',
                title: 'Tax Filing',
                date: '2025-04-15',
                type: 'deadline',
                description: 'Quarterly tax filing deadline'
            },
            {
                id: '3',
                title: 'Team Retreat',
                date: '2025-05-20',
                type: 'event',
                description: 'Annual team-building retreat'
            }
        ],
        
        // Technical data
        repositories: [
            {
                name: 'acme-saas-platform',
                description: 'Main SaaS platform repository',
                language: 'JavaScript',
                updated_at: '2025-03-15T10:30:00'
            },
            {
                name: 'acme-mobile-app',
                description: 'Mobile application companion',
                language: 'Swift',
                updated_at: '2025-03-20T15:45:00'
            }
        ]
    },
    
    'project-2': {
        // Green Foods data
        business: {
            companyName: 'Green Foods',
            industry: 'food_beverage',
            businessPlan: 'Offering organic, sustainable food products through retail and direct-to-consumer channels',
            website: 'https://greenfoods.example.com',
            contactEmail: 'hello@greenfoods.example.com',
            contactPhone: '555-987-6543',
            logoUploaded: true,
            colorScheme: {
                primary: '#27ae60',
                secondary: '#2c3e50',
                accent: '#f39c12'
            }
        },
        
        // Add documents, marketing, calendar, tech data here...
        documents: [
            {
                filename: 'green_foods_business_plan.pdf',
                document_type: 'business_plan',
                download_path: '#',
                metadata: {
                    created_at: '2025-02-10T11:45:00',
                    status: 'final'
                }
            },
            {
                filename: 'supplier_contracts.pdf',
                document_type: 'legal',
                download_path: '#',
                metadata: {
                    created_at: '2025-02-25T09:30:00',
                    status: 'final'
                }
            }
        ],
        
        events: [
            {
                id: '1',
                title: 'Farmers Market Season Start',
                date: '2025-05-01',
                type: 'event',
                description: 'Beginning of farmers market season'
            },
            {
                id: '2',
                title: 'Product Line Expansion',
                date: '2025-07-10',
                type: 'deadline',
                description: 'Launch of new product line'
            }
        ]
    },
    
    'project-3': {
        // UrbanLiving data
        business: {
            companyName: 'UrbanLiving',
            industry: 'real_estate',
            businessPlan: 'Developing and managing modern urban apartment complexes with integrated community spaces',
            website: 'https://urbanliving.example.com',
            contactEmail: 'info@urbanliving.example.com',
            contactPhone: '555-345-6789',
            logoUploaded: true,
            colorScheme: {
                primary: '#9b59b6',
                secondary: '#34495e',
                accent: '#1abc9c'
            }
        },
        
        // Add documents, marketing, calendar, tech data here...
        documents: [
            {
                filename: 'development_plan_2025.pdf',
                document_type: 'business_plan',
                download_path: '#',
                metadata: {
                    created_at: '2024-12-05T14:20:00',
                    status: 'final'
                }
            },
            {
                filename: 'investor_presentation.pdf',
                document_type: 'financial',
                download_path: '#',
                metadata: {
                    created_at: '2025-01-30T16:45:00',
                    status: 'final'
                }
            }
        ]
    }
};

// Helper function to get a specific project's data
function getProjectData(projectId) {
    return projectData[projectId] || null;
}

// Helper function to get all projects
function getAllProjects() {
    return mockProjects;
}
