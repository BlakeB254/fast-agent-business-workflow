import fast_agent as fast
from agents.marketing_agents import (
    social_media_manager, 
    campaign_tracker, 
    content_creator_manager,
    brand_guidelines_keeper,
    content_generator,
    audience_analyst
)

@fast.chain(
    "social_media_workflow",
    sequence=["brand_guidelines_keeper", "social_media_manager", "content_generator"],
    instruction="""Manage social media guidelines and content.
    Create and maintain social media templates that align with brand guidelines.
    Generate social media content for specific platforms and campaigns.
    """,
    cumulative=True,
)

@fast.chain(
    "campaign_management_workflow",
    sequence=["audience_analyst", "campaign_tracker", "content_generator"],
    instruction="""Track and optimize advertising campaigns.
    Analyze audience metrics to refine campaign targeting.
    Monitor campaign performance and generate optimization recommendations.
    Create campaign content based on performance insights.
    """,
    cumulative=True,
)

@fast.chain(
    "creator_partnership_workflow",
    sequence=["brand_guidelines_keeper", "content_creator_manager", "audience_analyst"],
    instruction="""Manage content creator partnerships.
    Evaluate creators based on brand alignment and audience demographics.
    Track partnership performance and engagement metrics.
    Generate reports on creator effectiveness and brand impact.
    """,
    cumulative=True,
)

@fast.evaluator_optimizer(
    name="content_quality_workflow",
    generator="content_generator",
    evaluator="brand_guidelines_keeper",
    min_rating="EXCELLENT",
    max_refinements=3,
)

@fast.parallel(
    name="multi_platform_content_workflow",
    fan_out=["content_generator", "content_generator", "content_generator"],
    fan_in="social_media_manager",
    instruction="""Generate content for multiple platforms simultaneously.
    Create platform-specific content that maintains brand voice.
    Consolidate content for review and scheduling.
    """,
    include_request=True,
)

@fast.router(
    name="marketing_router",
    agents=["social_media_workflow", "campaign_management_workflow", "creator_partnership_workflow", "content_quality_workflow"],
    model="claude-3.7-sonnet-20250219",
)

# Example usage:
# async with fast.run() as agent:
#     await agent.marketing_router("Generate social media templates for our new product launch")
