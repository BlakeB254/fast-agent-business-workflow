import fast_agent as fast

@fast.agent(
    "onboarding_agent",
    """Guide business onboarding process and collect essential information.
    You collect and organize business details including industry, company name,
    business plans, website information, and digital assets.
    Request human input when needed to complete the onboarding process.
    """,
    servers=["filesystem", "vector_db"],
    human_input=True,
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "data_manager",
    """Manage business data with state tracking.
    You track which data fields are finalized versus works-in-progress.
    Store and retrieve business information from the vector database.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "business_analyzer",
    """Analyze business data and provide insights.
    You can identify business opportunities, challenges, and trends.
    Generate reports and recommendations based on business data.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "repo_manager",
    """Manage GitHub repositories and handle code updates.
    You can create, update, and organize repository content.
    Handle code versioning and deployment for business applications.
    """,
    servers=["filesystem", "github"],
    model="claude-3.7-sonnet-20250219",
)

# Orchestrator for complex business tasks
@fast.orchestrator(
    name="business_orchestrator",
    instruction="""Coordinate complex business tasks across multiple agents.
    Break down business requests into manageable sub-tasks.
    Delegate to specialized agents and synthesize results.
    """,
    agents=["onboarding_agent", "data_manager", "business_analyzer", "repo_manager",
            "ui_generator", "document_generator", "pdf_creator", "calendar_manager"],
    model="claude-3.7-sonnet-20250219",
    plan_type="iterative",
    max_iterations=5,
)
