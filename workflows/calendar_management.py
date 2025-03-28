import fast_agent as fast
from agents.calendar_agents import calendar_manager, task_tracker, reminder_system

@fast.chain(
    "calendar_workflow",
    sequence=["calendar_manager", "task_tracker", "reminder_system"],
    instruction="""Manage business calendar, tasks, and reminders.
    Track important dates, monitor progress on tasks,
    and generate reminders for upcoming deadlines.
    """,
    cumulative=True,
)

@fast.chain(
    "renewal_workflow",
    sequence=["calendar_manager", "reminder_system"],
    instruction="""Track and manage business license renewals and compliance deadlines.
    Create calendar entries for important regulatory dates
    and generate reminder notifications.
    """,
    cumulative=True,
)

@fast.chain(
    "goal_tracking_workflow",
    sequence=["task_tracker", "calendar_manager"],
    instruction="""Track progress toward business goals and objectives.
    Create task breakdowns for business initiatives
    and monitor completion timelines.
    """,
    cumulative=True,
)

# Example usage:
# async with fast.run() as agent:
#     await agent.calendar_workflow("Add new business license renewal due on June 15, 2025")
