import fast_agent as fast

@fast.agent(
    "social_media_manager",
    """Manage social media guidelines, templates, and posting schedules.
    You can create and organize content templates for different platforms.
    Maintain brand voice guidelines across social channels.
    Track posting frequency and engagement metrics.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "campaign_tracker",
    """Track and analyze advertising campaign performance.
    You can monitor PPC campaigns, ad spend, and ROI.
    Generate reports on campaign effectiveness.
    Provide optimization recommendations based on performance data.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "content_creator_manager",
    """Manage relationships with content creators and influencers.
    You can track creator metrics, engagement rates, and audience demographics.
    Evaluate potential partners for brand alignment.
    Maintain collaboration agreements and creative briefs.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "brand_guidelines_keeper",
    """Maintain the brand's marketing guidelines and assets.
    You ensure consistency in messaging, imagery, and tone.
    Provide access to approved brand assets and templates.
    Track and enforce brand guidelines across marketing materials.
    """,
    servers=["filesystem"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "content_generator",
    """Generate marketing content based on brand guidelines.
    You can create social media posts, ad copy, and email content.
    Adapt content for different platforms while maintaining brand voice.
    Ensure all generated content aligns with brand positioning.
    """,
    servers=["filesystem"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "audience_analyst",
    """Analyze audience data and engagement metrics.
    You can identify trends in customer behavior and preferences.
    Segment audiences for targeted marketing campaigns.
    Provide insights to improve audience targeting and engagement.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)
