import fast_agent as fast
from agents.document_agents import document_generator, pdf_creator, document_quality, document_organizer

@fast.chain(
    "document_workflow",
    sequence=["document_quality", "pdf_creator", "document_organizer"],
    instruction="""Generate and manage business documentation.
    Create high-quality business documents, convert to PDF,
    and organize in the document management system.
    """,
    cumulative=True,
)

@fast.evaluator_optimizer(
    name="premium_document_workflow",
    generator="document_generator",
    evaluator="quality_assurance",
    min_rating="EXCELLENT",
    max_refinements=5,
)

# Router for directing different document requests
@fast.router(
    name="document_router",
    agents=["document_workflow", "premium_document_workflow"],
)

# Example usage:
# async with fast.run() as agent:
#     await agent.document_router("Generate a business plan for ACME Corp")
