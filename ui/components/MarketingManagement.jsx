class MarketingManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'social_media',
            socialMediaTemplates: [],
            campaigns: [],
            contentCreators: [],
            loading: false,
            error: null,
            // Social Media sections
            socialMediaPlatforms: ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'],
            selectedPlatform: 'instagram',
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
                },
                linkedin: {
                    posting_frequency: '2-5 times per week',
                    best_times: '9am, 12pm, 5pm',
                    hashtag_limit: '3-5 relevant hashtags',
                    content_types: 'Text, Images, Documents, Articles',
                    image_specs: '1200x627px',
                    tone: 'Professional, insightful, educational'
                },
                tiktok: {
                    posting_frequency: '1-3 times per day',
                    best_times: '9am, 12pm, 7pm',
                    hashtag_limit: '3-5 trending hashtags',
                    content_types: 'Short Videos, Trends, Challenges',
                    image_specs: '1080x1920px (9:16 ratio)',
                    tone: 'Authentic, entertaining, trendy'
                }
            },
            // Templates for social media
            templates: {
                instagram: [
                    {
                        id: '1',
                        name: 'Product Feature',
                        description: 'Showcase a product with features and benefits',
                        structure: '• Hero image of product\n• 3-5 key benefits\n• Call-to-action\n• Product link in bio',
                        example: 'Introducing our new [Product]! ✨\n\n🔥 [Key Feature 1]\n🔥 [Key Feature 2]\n🔥 [Key Feature 3]\n\nTap the link in our bio to learn more and shop now! #[BrandName] #[ProductCategory]',
                        image_specs: '1080x1080px, product-centered composition'
                    },
                    {
                        id: '2',
                        name: 'Customer Testimonial',
                        description: 'Share positive customer experiences',
                        structure: '• Customer quote or review\n• Product image\n• Response from brand\n• Call-to-action',
                        example: '"[Customer Quote]" - @customer\n\nWe love hearing from our amazing customers! Thanks for sharing your experience with [Product].\n\nWant to be featured? Tag us in your posts! #[BrandName] #CustomerLove',
                        image_specs: '1080x1080px, customer using product or quote overlay'
                    },
                    {
                        id: '3',
                        name: 'Educational Content',
                        description: 'Provide value with tips related to your industry',
                        structure: '• Attention-grabbing headline\n• 3-5 valuable tips\n• Brand mention\n• Relevant hashtags',
                        example: '3 Ways to [Industry Tip]:\n\n1️⃣ [Tip 1]\n2️⃣ [Tip 2]\n3️⃣ [Tip 3]\n\nWhat other tips would you add? Comment below! #[Industry] #[BrandName]',
                        image_specs: '1080x1080px, branded infographic or tip visual'
                    }
                ],
                facebook: [
                    {
                        id: '1',
                        name: 'Blog Share',
                        description: 'Share company blog posts',
                        structure: '• Engaging question\n• Brief summary\n• Link to full article\n• Branded image',
                        example: 'Did you know that [interesting fact]?\n\nOur latest blog post explores [topic] and provides [value proposition].\n\nRead the full article here: [LINK]',
                        image_specs: '1200x630px, blog header image or custom graphic'
                    }
                ],
                twitter: [
                    {
                        id: '1',
                        name: 'Industry News',
                        description: 'Comment on relevant industry news',
                        structure: '• Brief news summary\n• Company perspective\n• Link to article\n• 1-2 hashtags',
                        example: 'New research shows [industry finding]. Here's what this means for [audience]:\n\n[Company perspective]\n\nRead more: [LINK] #[Industry] #[BrandName]',
                        image_specs: '1200x675px, news screenshot or branded graphic'
                    }
                ],
                linkedin: [
                    {
                        id: '1',
                        name: 'Industry Insight',
                        description: 'Share professional insights and thought leadership',
                        structure: '• Professional headline\n• 3-5 key insights\n• Industry application\n• Call for discussion',
                        example: '3 Key Trends Shaping [Industry] in 2025:\n\n1. [Trend 1] - [Brief explanation]\n2. [Trend 2] - [Brief explanation]\n3. [Trend 3] - [Brief explanation]\n\nHow is your organization adapting to these changes? Share your thoughts below.\n\n#[Industry] #BusinessStrategy #[BrandName]',
                        image_specs: '1200x627px, professional branded graphic or chart'
                    }
                ],
                tiktok: [
                    {
                        id: '1',
                        name: 'Behind the Scenes',
                        description: 'Show company culture and product creation',
                        structure: '• Attention-grabbing intro (3 sec)\n• Behind-the-scenes content (15-20 sec)\n• Branded conclusion (2-5 sec)\n• Trending sound',
                        example: 'Video script:\n[Quick intro: "Ever wonder how we make our [Product]?"]\n[Behind-the-scenes footage with text overlays explaining the process]\n[Conclusion: "Now you know! Shop the link in our bio!"]\n\nCaption: Taking you behind the scenes of how we create our bestselling [Product]! #BehindTheScenes #[Industry] #[BrandName]',
                        image_specs: '1080x1920px (9:16), well-lit vertical video'
                    }
                ]
            },
            // Campaign data 
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
                    },
                    audience: {
                        demographics: 'Age 25-45, urban professionals',
                        interests: 'Fitness, wellness, outdoor activities',
                        locations: 'NYC, LA, Chicago, Boston'
                    },
                    creatives: [
                        {
                            type: 'image',
                            name: 'Product Showcase',
                            performance: 'High CTR',
                            download_path: '/api/download/marketing/creatives/summer_launch_image1.jpg'
                        },
                        {
                            type: 'video',
                            name: 'Product Demo',
                            performance: 'High conversion rate',
                            download_path: '/api/download/marketing/creatives/summer_launch_video1.mp4'
                        }
                    ]
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
                    },
                    audience: {
                        demographics: 'Age 25-65, all regions',
                        interests: 'Gift-giving, holiday shopping, home decor',
                        locations: 'Nationwide'
                    },
                    creatives: [
                        {
                            type: 'image',
                            name: 'Holiday Sale Banner',
                            performance: 'Not started',
                            download_path: '/api/download/marketing/creatives/holiday_banner.jpg'
                        }
                    ]
                },
                {
                    id: '3',
                    name: 'Spring Promotion',
                    status: 'completed',
                    start_date: '2025-03-01',
                    end_date: '2025-04-15',
                    budget: 4000,
                    spent: 3950,
                    platforms: ['facebook', 'instagram', 'youtube'],
                    metrics: {
                        impressions: 320000,
                        clicks: 18500,
                        ctr: 5.78,
                        conversions: 925,
                        cpa: 4.27,
                        roi: 230
                    },
                    audience: {
                        demographics: 'Age 18-35, suburban areas',
                        interests: 'Fashion, beauty, lifestyle',
                        locations: 'Southeast US, West Coast'
                    },
                    creatives: [
                        {
                            type: 'image',
                            name: 'Spring Collection',
                            performance: 'Medium CTR',
                            download_path: '/api/download/marketing/creatives/spring_collection.jpg'
                        },
                        {
                            type: 'video',
                            name: 'Spring Lookbook',
                            performance: 'High engagement',
                            download_path: '/api/download/marketing/creatives/spring_lookbook.mp4'
                        }
                    ]
                }
            ],
            // Content Creator data
            contentCreators: [
                {
                    id: '1',
                    name: 'Alex Rivera',
                    handle: '@alexrivera_lifestyle',
                    platforms: ['instagram', 'tiktok'],
                    audience_size: 150000,
                    engagement_rate: 3.8,
                    audience_demographics: {
                        age: '18-35',
                        gender: '65% female, 35% male',
                        interests: 'Fashion, Travel, Fitness',
                        location: 'US, Canada, UK'
                    },
                    past_campaigns: [
                        {
                            campaign: 'Spring Promotion',
                            performance: 'High (4.5% CTR)',
                            content_type: 'Product Reviews, Styling Tips',
                            dates: '2025-03-01 to 2025-03-15'
                        }
                    ],
                    status: 'active',
                    notes: 'Great communication, delivers content on time, audience highly engaged with lifestyle content'
                },
                {
                    id: '2',
                    name: 'Sarah Chen',
                    handle: '@techsarah',
                    platforms: ['youtube', 'twitter'],
                    audience_size: 750000,
                    engagement_rate: 2.7,
                    audience_demographics: {
                        age: '25-45',
                        gender: '55% male, 45% female',
                        interests: 'Technology, Productivity, Business',
                        location: 'US, Europe, Australia'
                    },
                    past_campaigns: [],
                    status: 'potential',
                    notes: 'Excellent technology content, audience demographic fits our B2B products'
                },
                {
                    id: '3',
                    name: 'Marcus Johnson',
                    handle: '@fitnesswithmarcus',
                    platforms: ['instagram', 'youtube'],
                    audience_size: 320000,
                    engagement_rate: 4.2,
                    audience_demographics: {
                        age: '22-40',
                        gender: '58% male, 42% female',
                        interests: 'Fitness, Nutrition, Wellness',
                        location: 'US, Canada'
                    },
                    past_campaigns: [
                        {
                            campaign: 'Summer Product Launch',
                            performance: 'Very High (5.8% CTR)',
                            content_type: 'Product Integration, Workout Videos',
                            dates: '2025-06-10 to 2025-06-30'
                        }
                    ],
                    status: 'active',
                    notes: 'Strong fitness authority, highly engaged audience, excellent content quality'
                }
            ]
        };
    }

    componentDidMount() {
        // In a real implementation, we would fetch data from the API
        console.log('MarketingManagement component mounted');
    }

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
    }

    handlePlatformChange = (platform) => {
        this.setState({ selectedPlatform: platform });
    }

    downloadTemplate = (platform, templateId) => {
        const template = this.state.templates[platform].find(t => t.id === templateId);
        if (template) {
            // Create a text file with the template content
            const content = `# ${template.name}\n\n## Description\n${template.description}\n\n## Structure\n${template.structure}\n\n## Example\n${template.example}\n\n## Image Specs\n${template.image_specs}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            // Create a download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `${platform}_${template.name.toLowerCase().replace(/\s+/g, '_')}_template.txt`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }
    }

    downloadCreative = (downloadPath) => {
        // In a real implementation, this would navigate to the API endpoint
        window.open(downloadPath, '_blank');
    }

    renderSocialMediaTab() {
        const { selectedPlatform, socialMediaPlatforms, socialMediaRules, templates } = this.state;
        
        return (
            <div className="social-media-section">
                <div className="section-header">
                    <h3>Social Media Guidelines and Templates</h3>
                    <button className="create-button">Create New Template</button>
                </div>
                
                <div className="platform-selector">
                    {socialMediaPlatforms.map(platform => (
                        <button 
                            key={platform}
                            className={selectedPlatform === platform ? 'active' : ''}
                            onClick={() => this.handlePlatformChange(platform)}
                        >
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </button>
                    ))}
                </div>
                
                <div className="rules-and-templates">
                    <div className="platform-rules">
                        <h4>Platform Guidelines: {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</h4>
                        <div className="rule-card">
                            <div className="rule-item">
                                <strong>Posting Frequency:</strong>
                                <span>{socialMediaRules[selectedPlatform].posting_frequency}</span>
                            </div>
                            <div className="rule-item">
                                <strong>Best Times to Post:</strong>
                                <span>{socialMediaRules[selectedPlatform].best_times}</span>
                            </div>
                            <div className="rule-item">
                                <strong>Hashtag Usage:</strong>
                                <span>{socialMediaRules[selectedPlatform].hashtag_limit}</span>
                            </div>
                            <div className="rule-item">
                                <strong>Content Types:</strong>
                                <span>{socialMediaRules[selectedPlatform].content_types}</span>
                            </div>
                            <div className="rule-item">
                                <strong>Image Specifications:</strong>
                                <span>{socialMediaRules[selectedPlatform].image_specs}</span>
                            </div>
                            <div className="rule-item">
                                <strong>Brand Tone:</strong>
                                <span>{socialMediaRules[selectedPlatform].tone}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="platform-templates">
                        <h4>Post Templates</h4>
                        <div className="templates-list">
                            {templates[selectedPlatform].map(template => (
                                <div key={template.id} className="template-card">
                                    <div className="template-header">
                                        <h5>{template.name}</h5>
                                        <button 
                                            className="download-button"
                                            onClick={() => this.downloadTemplate(selectedPlatform, template.id)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                    <div className="template-body">
                                        <p><strong>Description:</strong> {template.description}</p>
                                        <p><strong>Structure:</strong></p>
                                        <pre>{template.structure}</pre>
                                        <p><strong>Example:</strong></p>
                                        <pre>{template.example}</pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCampaignsTab() {
        const { campaigns } = this.state;
        
        return (
            <div className="campaigns-section">
                <div className="section-header">
                    <h3>Advertising Campaigns</h3>
                    <button className="create-button">Create New Campaign</button>
                </div>
                
                <div className="campaigns-list">
                    {campaigns.map(campaign => (
                        <div key={campaign.id} className="campaign-card">
                            <div className="campaign-header">
                                <h4>{campaign.name}</h4>
                                <span className={`status ${campaign.status}`}>{campaign.status}</span>
                            </div>
                            
                            <div className="campaign-details">
                                <div className="detail-group">
                                    <div className="detail-item">
                                        <strong>Dates:</strong>
                                        <span>{campaign.start_date} to {campaign.end_date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Budget:</strong>
                                        <span>${campaign.budget.toLocaleString()}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Spent:</strong>
                                        <span>${campaign.spent.toLocaleString()} ({Math.round(campaign.spent / campaign.budget * 100)}%)</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Platforms:</strong>
                                        <span>{campaign.platforms.join(', ')}</span>
                                    </div>
                                </div>
                                
                                {campaign.status !== 'planned' && (
                                    <div className="metrics-group">
                                        <h5>Performance Metrics</h5>
                                        <div className="metrics-grid">
                                            <div className="metric-item">
                                                <span className="metric-value">{campaign.metrics.impressions.toLocaleString()}</span>
                                                <span className="metric-label">Impressions</span>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-value">{campaign.metrics.clicks.toLocaleString()}</span>
                                                <span className="metric-label">Clicks</span>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-value">{campaign.metrics.ctr}%</span>
                                                <span className="metric-label">CTR</span>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-value">{campaign.metrics.conversions.toLocaleString()}</span>
                                                <span className="metric-label">Conversions</span>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-value">${campaign.metrics.cpa}</span>
                                                <span className="metric-label">CPA</span>
                                            </div>
                                            <div className="metric-item">
                                                <span className="metric-value">{campaign.metrics.roi}%</span>
                                                <span className="metric-label">ROI</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="audience-group">
                                    <h5>Target Audience</h5>
                                    <div className="detail-item">
                                        <strong>Demographics:</strong>
                                        <span>{campaign.audience.demographics}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Interests:</strong>
                                        <span>{campaign.audience.interests}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Locations:</strong>
                                        <span>{campaign.audience.locations}</span>
                                    </div>
                                </div>
                                
                                <div className="creatives-group">
                                    <h5>Campaign Creatives</h5>
                                    <div className="creatives-list">
                                        {campaign.creatives.map((creative, index) => (
                                            <div key={index} className="creative-item">
                                                <div className="creative-info">
                                                    <span className="creative-type">{creative.type}</span>
                                                    <span className="creative-name">{creative.name}</span>
                                                    <span className="creative-performance">{creative.performance}</span>
                                                </div>
                                                <button 
                                                    className="download-button"
                                                    onClick={() => this.downloadCreative(creative.download_path)}
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="campaign-actions">
                                <button className="view-button">View Details</button>
                                <button className="edit-button">Edit Campaign</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderContentCreatorsTab() {
        const { contentCreators } = this.state;
        
        return (
            <div className="creators-section">
                <div className="section-header">
                    <h3>Content Creators & Influencers</h3>
                    <button className="create-button">Add New Creator</button>
                </div>
                
                <div className="creators-list">
                    {contentCreators.map(creator => (
                        <div key={creator.id} className="creator-card">
                            <div className="creator-header">
                                <div className="creator-profile">
                                    <div className="creator-avatar">
                                        {creator.name.charAt(0)}
                                    </div>
                                    <div className="creator-identity">
                                        <h4>{creator.name}</h4>
                                        <span className="creator-handle">{creator.handle}</span>
                                    </div>
                                </div>
                                <span className={`status ${creator.status}`}>{creator.status}</span>
                            </div>
                            
                            <div className="creator-details">
                                <div className="metrics-row">
                                    <div className="creator-metric">
                                        <span className="metric-value">{creator.audience_size.toLocaleString()}</span>
                                        <span className="metric-label">Audience Size</span>
                                    </div>
                                    <div className="creator-metric">
                                        <span className="metric-value">{creator.engagement_rate}%</span>
                                        <span className="metric-label">Engagement Rate</span>
                                    </div>
                                    <div className="creator-metric">
                                        <span className="metric-value">{creator.platforms.join(', ')}</span>
                                        <span className="metric-label">Platforms</span>
                                    </div>
                                </div>
                                
                                <div className="demographics-group">
                                    <h5>Audience Demographics</h5>
                                    <div className="demographics-grid">
                                        <div className="demographic-item">
                                            <strong>Age:</strong>
                                            <span>{creator.audience_demographics.age}</span>
                                        </div>
                                        <div className="demographic-item">
                                            <strong>Gender:</strong>
                                            <span>{creator.audience_demographics.gender}</span>
                                        </div>
                                        <div className="demographic-item">
                                            <strong>Interests:</strong>
                                            <span>{creator.audience_demographics.interests}</span>
                                        </div>
                                        <div className="demographic-item">
                                            <strong>Location:</strong>
                                            <span>{creator.audience_demographics.location}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="campaigns-group">
                                    <h5>Past Campaigns</h5>
                                    {creator.past_campaigns.length > 0 ? (
                                        <div className="past-campaigns-list">
                                            {creator.past_campaigns.map((campaign, index) => (
                                                <div key={index} className="past-campaign-item">
                                                    <div className="campaign-name">{campaign.campaign}</div>
                                                    <div className="campaign-details">
                                                        <span><strong>Performance:</strong> {campaign.performance}</span>
                                                        <span><strong>Content:</strong> {campaign.content_type}</span>
                                                        <span><strong>Dates:</strong> {campaign.dates}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-campaigns">No past campaigns with this creator.</p>
                                    )}
                                </div>
                                
                                {creator.notes && (
                                    <div className="notes-group">
                                        <h5>Notes</h5>
                                        <p>{creator.notes}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="creator-actions">
                                <button className="view-button">View Details</button>
                                <button className="contact-button">Contact Creator</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const { activeTab } = this.state;
        
        return (
            <div className="marketing-management">
                <div className="marketing-header">
                    <h2>Marketing & Advertising</h2>
                </div>
                
                <div className="marketing-tabs">
                    <button 
                        className={activeTab === 'social_media' ? 'active' : ''}
                        onClick={() => this.handleTabChange('social_media')}
                    >
                        Social Media Guidelines
                    </button>
                    <button 
                        className={activeTab === 'campaigns' ? 'active' : ''}
                        onClick={() => this.handleTabChange('campaigns')}
                    >
                        Advertising Campaigns
                    </button>
                    <button 
                        className={activeTab === 'content_creators' ? 'active' : ''}
                        onClick={() => this.handleTabChange('content_creators')}
                    >
                        Content Creators
                    </button>
                    <button 
                        className={activeTab === 'analytics' ? 'active' : ''}
                        onClick={() => this.handleTabChange('analytics')}
                    >
                        Marketing Analytics
                    </button>
                </div>
                
                <div className="marketing-content">
                    {activeTab === 'social_media' && this.renderSocialMediaTab()}
                    {activeTab === 'campaigns' && this.renderCampaignsTab()}
                    {activeTab === 'content_creators' && this.renderContentCreatorsTab()}
                    {activeTab === 'analytics' && (
                        <div className="analytics-placeholder">
                            <h3>Marketing Analytics</h3>
                            <p>Analytics dashboard is under development. Check back soon for comprehensive marketing metrics.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// Render the component
ReactDOM.render(
    <MarketingManagement />,
    document.getElementById('marketing-management')
);
