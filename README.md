# Fast-Agent Business Workflow System

A comprehensive business workflow system using fast-agent MCP for document generation, UI management, business processing, marketing/advertising management, and GitHub repository integration.

## Overview

This system provides an integrated solution for managing business workflows, documentation, digital assets, and marketing campaigns. It uses the fast-agent framework to create AI-driven agents that handle various aspects of business management, from onboarding to document generation to social media content creation.

### Key Features

- **Business Onboarding**: Guided process to collect company information, business plans, and digital assets
- **Document Management**: Generate, store, and manage business documents with automatic PDF conversion
- **Marketing & Advertising**: Manage social media content, advertising campaigns, and content creator partnerships
- **Calendar Management**: Track business license renewals, events, and tasks with reminders
- **Technical UI Management**: Analyze, generate, and deploy UI components to GitHub repositories
- **State Management**: Track which data fields are finalized vs. work-in-progress
- **Local Storage**: All generated content is saved to your local `TechShit/businesses` folder
- **Download Functionality**: Download any generated content from the application's UI
- **Vector Database Integration**: Store business data for AI reference and efficient retrieval

## Installation

### Prerequisites

- Python 3.9+
- Node.js 14+ (for UI development)
- fast-agent framework

### Step 1: Clone the repository

```bash
git clone https://github.com/BlakeB254/fast-agent-business-workflow.git
cd fast-agent-business-workflow
```

### Step 2: Install dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Set up API keys

Copy the example secrets file and add your API keys:

```bash
cp fastagent.secrets.yaml.example fastagent.secrets.yaml
```

Edit `fastagent.secrets.yaml` to add your Anthropic API key, GitHub access token, and vector database credentials.

### Step 4: Configure storage location (optional)

By default, all data is stored in `~/TechShit/businesses`. You can change this by setting the `BUSINESS_WORKFLOW_DIR` environment variable:

```bash
export BUSINESS_WORKFLOW_DIR=/path/to/your/storage/directory
```

### Step 5: Start the application

```bash
python main.py
```

The application will be available at http://localhost:8000/ui

## Project Structure

```
fast-agent-business-workflow/
├── agents/                  # Agent definitions
│   ├── business_agents.py   # Business and onboarding agents
│   ├── calendar_agents.py   # Calendar and task management agents
│   ├── document_agents.py   # Document generation and PDF conversion
│   ├── marketing_agents.py  # Social media and marketing agents
│   └── ui_agents.py         # UI component generation and styling
├── servers/                 # MCP server implementations
│   ├── filesystem_server.py # Local file storage server
│   ├── vector_db_server.py  # Vector database for AI reference
│   ├── github_server.py     # GitHub integration
│   └── pdf_generator_server.py # PDF conversion
├── ui/                      # Frontend UI code
│   ├── components/          # React components
│   ├── index.html           # Main application page
│   └── styles.css           # CSS styling
├── workflows/               # Workflow definitions
│   ├── onboarding.py        # Business onboarding workflows
│   ├── document_management.py # Document generation workflows
│   ├── marketing_management.py # Marketing campaign workflows
│   ├── ui_management.py     # UI component workflows
│   └── calendar_management.py # Calendar and task workflows
├── main.py                  # FastAPI application entry point
├── fastagent.config.yaml    # Configuration for fast-agent
├── fastagent.secrets.yaml   # API keys and credentials (create from example)
└── requirements.txt         # Python dependencies
```

## Using the Application

### Business Onboarding

1. Navigate to the Onboarding tab
2. Fill in company information (name, industry, etc.)
3. Use the "Finalize" buttons to mark data as final (preventing further edits)
4. Upload your company logo and set color schemes
5. Complete the onboarding process to generate initial business documentation

### Document Management

1. Navigate to the Documents tab
2. View existing documents by category
3. Create new documents as needed
4. Download any document as PDF with the download button
5. All documents are saved locally in `[BUSINESS_WORKFLOW_DIR]/data/documents/`

### Marketing & Advertising

1. Navigate to the Marketing tab
2. Access social media guidelines and templates for different platforms
3. Track advertising campaign performance and ROI
4. Manage content creator partnerships and metrics
5. Generate social media content based on brand guidelines
6. Download marketing templates and campaign assets

### Calendar Management

1. Navigate to the Calendar tab
2. View upcoming events, license renewals, and tasks
3. Add new events or deadlines
4. Set up reminders for important business milestones
5. Track progress on company goals and initiatives

### Technical Management

1. Navigate to the Technical tab
2. Connect your GitHub repositories
3. View UI components and page structure
4. Generate new UI components based on your business styling
5. Push updates to your repositories automatically

## Workflows and Agents

### Agent Types

- **Onboarding Agent**: Guides the business onboarding process
- **Data Manager**: Tracks which data fields are finalized vs. works-in-progress
- **Document Generator**: Creates business documentation
- **PDF Creator**: Converts documents to properly formatted PDFs
- **Social Media Manager**: Manages social media guidelines and templates
- **Campaign Tracker**: Tracks advertising campaign performance
- **Content Creator Manager**: Manages relationships with influencers
- **Brand Guidelines Keeper**: Maintains brand consistency
- **UI Generator**: Creates UI components based on business styling
- **Calendar Manager**: Tracks important dates and deadlines
- **Task Tracker**: Monitors progress toward business goals
- **Repository Manager**: Handles GitHub integration

### Workflow Types

- **Chain**: Sequential execution of agents (e.g., onboarding workflow)
- **Evaluator-Optimizer**: Quality assurance for generated content
- **Parallel**: Generate multiple components simultaneously
- **Router**: Direct requests to appropriate specialized agents
- **Orchestrator**: Coordinate complex business tasks

## Local File Storage

This system is configured to store all generated content in your local `TechShit/businesses` directory. The folder structure is:

```
TechShit/businesses/
├── data/
│   ├── business/           # Business information
│   ├── documents/          # Generated documents
│   │   ├── business_plan/  # Business plans
│   │   ├── license/        # Business licenses
│   │   └── [other types]/  # Other document types
│   ├── marketing/          # Marketing assets
│   │   ├── campaigns/      # Campaign creatives
│   │   ├── templates/      # Social media templates
│   │   └── analytics/      # Marketing analytics data
│   ├── calendar/           # Calendar events and tasks
│   ├── ui_assets/          # UI components and assets
│   └── downloads/          # Files prepared for download
```

You can access all generated content directly from this location or download it from the application's UI.

## Vector Database Integration

The system uses a vector database to store business information for AI reference. This allows the agents to efficiently retrieve and utilize business data when generating documents, marketing content, or UI components.

To configure your vector database:

1. Set up a Pinecone index (or other supported vector DB)
2. Add your API key and index information to `fastagent.secrets.yaml`
3. The system will automatically store and retrieve data as needed

## Development Guide

### Adding New Agents

1. Create a new agent definition in the appropriate file in the `agents/` directory:

```python
@fast.agent(
    "my_new_agent",
    """Agent description and instructions go here.""",
    servers=["filesystem", "vector_db"],
    model="claude-3.7-sonnet-20250219",
)
```

2. Register the agent in the appropriate workflow file in the `workflows/` directory

### Adding New Workflows

1. Create a new workflow definition in the appropriate file in the `workflows/` directory:

```python
@fast.chain(
    "my_new_workflow",
    sequence=["agent1", "agent2", "agent3"],
    instruction="""Workflow description goes here.""",
    cumulative=True,
)
```

2. Add a new API endpoint in `main.py` to use the workflow:

```python
@app.post("/api/my_endpoint")
async def my_endpoint(data: dict):
    """My endpoint description"""
    async with fast.run() as agent:
        result = await agent.my_new_workflow(data)
        return {"result": result}
```

### Adding New UI Components

1. Create a new React component in the `ui/components/` directory
2. Import the component in `ui/index.html`
3. Use the UI Generator agent to ensure it follows your business styling

## Troubleshooting

### Application Won't Start

- Check that all required dependencies are installed: `pip install -r requirements.txt`
- Ensure the `fastagent.secrets.yaml` file exists and contains valid API keys
- Check the console for error messages

### Document Generation Issues

- Verify the Document Generator agent is correctly configured
- Check that the filesystem server is properly saving files
- Ensure the vector database connection is working

### Marketing Content Generation Issues

- Verify the Social Media Manager agent is correctly configured
- Check that your brand guidelines have been properly set up
- Ensure templates are accessible in the filesystem

### UI Generation Issues

- Verify the UI Generator agent is correctly configured
- Check GitHub access token permissions
- Ensure repository access is properly configured

### Download Issues

- Check that the `downloads` directory exists and is writable
- Verify the download path is correctly formatted
- Ensure the file exists at the specified location

## License

MIT

## Acknowledgments

- This project is built using the [fast-agent](https://github.com/anthropics/fast-agent) framework
- Inspired by [mcp-agent](https://github.com/SarmadQadri/mcp-agent) by Sarmad Qadri
