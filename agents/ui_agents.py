import fast_agent as fast

@fast.agent(
    "ui_generator",
    """Generate UI components based on business styling and requirements.
    You are skilled at creating React components that match an existing design system.
    You can generate code for new pages and components that maintain consistency with the codebase.
    """,
    servers=["filesystem", "github"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "ui_analyzer",
    """Analyze existing UI components and design patterns.
    You can extract styling information, component patterns, and design elements from code.
    Provide detailed breakdowns of UI structure to inform new component creation.
    """,
    servers=["filesystem", "github"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "style_manager",
    """Manage business styling and branding across UI components.
    You maintain color schemes, typography, and other design elements.
    Ensure all new components adhere to the established brand guidelines.
    """,
    servers=["filesystem"],
    model="claude-3.7-sonnet-20250219",
)
