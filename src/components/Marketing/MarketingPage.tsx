import React, { useState } from 'react';
import { 
  SocialMediaRule, 
  SocialMediaTemplate,
  Campaign,
  ContentCreator
} from '@/types';

// Mock data for initial display
const mockSocialMediaRules: Record<string, SocialMediaRule> = {
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
};

// Templates for social media
const mockTemplates: Record<string, SocialMediaTemplate[]> = {
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
  ]
};

// Campaign data
const mockCampaigns: Campaign[] = [
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
        download_path: '#'
      },
      {
        type: 'video',
        name: 'Product Demo',
        performance: 'High conversion rate',
        download_path: '#'
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
    }
  }
];

// Content Creator data
const mockContentCreators: ContentCreator[] = [
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
  }
];

const MarketingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('social_media');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
  };
  
  const downloadTemplate = (platform: string, templateId: string) => {
    const template = mockTemplates[platform]?.find(t => t.id === templateId);
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
  };

  const renderSocialMediaTab = () => {
    const platforms = Object.keys(mockSocialMediaRules);
    const rules = mockSocialMediaRules[selectedPlatform];
    const templates = mockTemplates[selectedPlatform] || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Social Media Guidelines & Templates</h2>
          <button className="btn-success">Create New Template</button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {platforms.map(platform => (
            <button 
              key={platform}
              onClick={() => handlePlatformChange(platform)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedPlatform === platform 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Platform Guidelines</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Posting Frequency</h4>
                  <p>{rules.posting_frequency}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Best Times to Post</h4>
                  <p>{rules.best_times}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Hashtag Usage</h4>
                  <p>{rules.hashtag_limit}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Content Types</h4>
                  <p>{rules.content_types}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Image Specs</h4>
                  <p>{rules.image_specs}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-700">Brand Tone</h4>
                  <p>{rules.tone}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Post Templates</h3>
            <div className="space-y-4">
              {templates.length > 0 ? (
                templates.map(template => (
                  <div key={template.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-secondary text-white px-4 py-3 flex justify-between items-center">
                      <h4 className="font-medium">{template.name}</h4>
                      <button 
                        onClick={() => downloadTemplate(selectedPlatform, template.id)}
                        className="btn-primary py-1 px-3 text-sm"
                      >
                        Download
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 mb-3">{template.description}</p>
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-700 mb-1">Structure:</h5>
                        <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{template.structure}</pre>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Example:</h5>
                        <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{template.example}</pre>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500">No templates available for {selectedPlatform}.</p>
                  <button className="btn-primary mt-4">Create Template</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCampaignsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Advertising Campaigns</h2>
          <button className="btn-success">Create New Campaign</button>
        </div>
        
        <div className="space-y-6">
          {mockCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-secondary text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{campaign.name}</h3>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${campaign.status === 'active' ? 'bg-green-200 text-green-800' : ''}
                  ${campaign.status === 'planned' ? 'bg-yellow-200 text-yellow-800' : ''}
                  ${campaign.status === 'completed' ? 'bg-gray-200 text-gray-800' : ''}
                `}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Dates</h4>
                    <p>{campaign.start_date} to {campaign.end_date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Budget</h4>
                    <p>${campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Spent</h4>
                    <p>${campaign.spent.toLocaleString()} ({Math.round(campaign.spent / campaign.budget * 100)}%)</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Platforms</h4>
                    <p>{campaign.platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}</p>
                  </div>
                </div>
                
                {campaign.status !== 'planned' && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">{campaign.metrics.impressions.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Impressions</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">{campaign.metrics.clicks.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Clicks</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">{campaign.metrics.ctr}%</p>
                        <p className="text-sm text-gray-600">CTR</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">{campaign.metrics.conversions.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Conversions</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">${campaign.metrics.cpa}</p>
                        <p className="text-sm text-gray-600">CPA</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-primary">{campaign.metrics.roi}%</p>
                        <p className="text-sm text-gray-600">ROI</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {campaign.audience && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3">Target Audience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-1">Demographics</h5>
                        <p>{campaign.audience.demographics}</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-1">Interests</h5>
                        <p>{campaign.audience.interests}</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-1">Locations</h5>
                        <p>{campaign.audience.locations}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {campaign.creatives && campaign.creatives.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Campaign Creatives</h4>
                    <div className="space-y-2">
                      {campaign.creatives.map((creative, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <span className="bg-secondary text-white px-2 py-1 rounded text-xs uppercase">{creative.type}</span>
                            <span className="font-medium">{creative.name}</span>
                            <span className="text-gray-600">{creative.performance}</span>
                          </div>
                          <button className="btn-primary py-1 px-3 text-sm">Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
                <button className="btn-secondary">View Details</button>
                <button className="btn-primary">Edit Campaign</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderContentCreatorsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Content Creators & Influencers</h2>
          <button className="btn-success">Add New Creator</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockContentCreators.map(creator => (
            <div key={creator.id} className="bg-white rounded-lg shadow overflow-hidden card-hover">
              <div className="bg-secondary text-white p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-xl font-semibold">
                      {creator.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{creator.name}</h3>
                      <p className="text-gray-300">{creator.handle}</p>
                    </div>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${creator.status === 'active' ? 'bg-green-200 text-green-800' : ''}
                    ${creator.status === 'potential' ? 'bg-blue-200 text-blue-800' : ''}
                    ${creator.status === 'past' ? 'bg-gray-200 text-gray-800' : ''}
                  `}>
                    {creator.status.charAt(0).toUpperCase() + creator.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">{creator.audience_size.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Audience</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">{creator.engagement_rate}%</p>
                    <p className="text-xs text-gray-600">Engagement</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                      {creator.platforms.map(p => p.charAt(0).toUpperCase()).join(', ')}
                    </p>
                    <p className="text-xs text-gray-600">Platforms</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Audience Demographics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700">Age</h5>
                      <p className="text-sm">{creator.audience_demographics.age}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700">Gender</h5>
                      <p className="text-sm">{creator.audience_demographics.gender}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700">Interests</h5>
                      <p className="text-sm">{creator.audience_demographics.interests}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700">Location</h5>
                      <p className="text-sm">{creator.audience_demographics.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Past Campaigns</h4>
                  {creator.past_campaigns.length > 0 ? (
                    <div className="space-y-3">
                      {creator.past_campaigns.map((campaign, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-800 mb-2">{campaign.campaign}</h5>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600 font-medium">Performance:</span> {campaign.performance}
                            </div>
                            <div>
                              <span className="text-gray-600 font-medium">Content:</span> {campaign.content_type}
                            </div>
                            <div>
                              <span className="text-gray-600 font-medium">Dates:</span> {campaign.dates}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="bg-gray-100 p-4 rounded-lg text-gray-600 text-center italic">
                      No past campaigns with this creator.
                    </p>
                  )}
                </div>
                
                {creator.notes && (
                  <div>
                    <h4 className="text-lg font-medium mb-2">Notes</h4>
                    <p className="bg-gray-100 p-4 rounded-lg italic">{creator.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
                <button className="btn-secondary">View Details</button>
                <button className="btn-primary">Contact Creator</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderAnalyticsTab = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Marketing Analytics</h2>
        
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Analytics Dashboard Coming Soon</h3>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            Our comprehensive marketing analytics dashboard is under development.
            Check back soon for detailed metrics on your marketing performance.
          </p>
          <button className="btn-primary">Request Early Access</button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'social_media'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('social_media')}
            >
              Social Media Guidelines
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'campaigns'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('campaigns')}
            >
              Advertising Campaigns
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'content_creators'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('content_creators')}
            >
              Content Creators
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'analytics'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('analytics')}
            >
              Marketing Analytics
            </button>
          </nav>
        </div>
      </div>

      <div className="p-1">
        {activeTab === 'social_media' && renderSocialMediaTab()}
        {activeTab === 'campaigns' && renderCampaignsTab()}
        {activeTab === 'content_creators' && renderContentCreatorsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
    </div>
  );
};

export default MarketingPage;
