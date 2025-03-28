import fast_agent as fast

@fast.agent(
    "document_generator",
    """Generate business documents based on templates and business information.
    You can create professional business plans, licenses, legal documents, and reports.
    Follow proper document structure and formatting for business documentation.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "pdf_creator",
    """Convert documents to properly formatted PDF files.
    You can apply styling, formatting, and layout to create professional PDFs.
    Ensure consistency across all business documentation.
    """,
    servers=["filesystem", "pdf_generator"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "document_organizer",
    """Organize and manage business documents.
    You can categorize, tag, and structure document storage.
    Provide efficient retrieval systems for accessing business documentation.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.evaluator_optimizer(
    name="document_quality",
    generator="document_generator",
    evaluator="quality_assurance",
    min_rating="EXCELLENT",
    max_refinements=3,
)

# Quality assurance agent for documents
@fast.agent(
    "quality_assurance",
    """Evaluate document quality and provide improvement feedback.
    You assess business documents for professionalism, completeness, and accuracy.
    Rate documents as EXCELLENT, GOOD, FAIR, or POOR with specific improvement suggestions.
    """,
    model="claude-3.7-sonnet-20250219",
)
