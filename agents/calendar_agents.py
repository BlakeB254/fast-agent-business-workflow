import fast_agent as fast

@fast.agent(
    "calendar_manager",
    """Manage business calendar, renewals and to-do items.
    You can track important dates, deadlines, and recurring events.
    Send reminders for license renewals and other time-sensitive tasks.
    """,
    servers=["filesystem"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "task_tracker",
    """Track business tasks and progress toward company goals.
    You can create, update, and monitor to-do lists.
    Provide progress reports and status updates on business initiatives.
    """,
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)

@fast.agent(
    "reminder_system",
    """Generate and manage business reminders and notifications.
    You track upcoming deadlines and important events.
    Create timely alerts for license renewals and regulatory requirements.
    """,
    servers=["filesystem"],
    model="claude-3.7-sonnet-20250219",
)
