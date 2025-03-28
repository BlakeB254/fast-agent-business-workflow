import fast_agent as fast
from agents.ui_agents import ui_generator, ui_analyzer, style_manager
from agents.business_agents import repo_manager

@fast.chain(
    "ui_workflow",
    sequence=["ui_analyzer", "style_manager", "ui_generator", "repo_manager"],
    instruction="""Generate and manage UI components based on business styling.
    Analyze existing UI, apply business styling, generate new components,
    and update repository with changes.
    """,
    cumulative=True,
)

@fast.chain(
    "ui_component_workflow",
    sequence=["style_manager", "ui_generator", "repo_manager"],
    instruction="""Create new UI components for the business application.
    Apply business styling to new components and update repository.
    """,
    cumulative=True,
)

@fast.parallel(
    name="ui_multi_component_workflow",
    fan_out=["ui_component_workflow", "ui_component_workflow", "ui_component_workflow"],
    instruction="""Generate multiple UI components in parallel.
    Create multiple components with consistent styling simultaneously.
    """,
    include_request=True,
)

# Example usage:
# async with fast.run() as agent:
#     await agent.ui_workflow("Create a new dashboard page with company color scheme")
