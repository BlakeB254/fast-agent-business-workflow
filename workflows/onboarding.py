import fast_agent as fast
from agents.business_agents import onboarding_agent, data_manager
from agents.document_agents import document_generator

@fast.chain(
    "onboarding_workflow",
    sequence=["onboarding_agent", "data_manager", "document_generator"],
    instruction="""Complete the business onboarding process.
    Collect and validate business information, set up initial data structure,
    and generate starter documentation.
    """,
    cumulative=True,
    continue_with_final=True,
)

# Example usage:
# async with fast.run() as agent:
#     await agent.onboarding_workflow("Start business onboarding for ACME Corp")
