import asyncio
import logging
import fast_agent as fast
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

# Import workflow definitions
from workflows.onboarding import onboarding_workflow
from workflows.document_management import document_workflow
from workflows.ui_management import ui_workflow
from workflows.calendar_management import calendar_workflow

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Business Workflow System")

# Mount static files for the UI
app.mount("/ui", StaticFiles(directory="ui", html=True), name="ui")

@app.get("/")
async def root():
    """Redirect to the UI frontend"""
    return {"message": "API is running. Access the UI at /ui"}

# API endpoints for different workflows
@app.post("/api/onboarding")
async def run_onboarding(data: dict):
    """Run the onboarding workflow with provided data"""
    async with fast.run() as agent:
        result = await agent.onboarding_workflow(data)
        return {"result": result}

@app.post("/api/document/{action}")
async def manage_document(action: str, data: dict):
    """Run document management workflows"""
    async with fast.run() as agent:
        result = await agent.document_workflow(f"{action}: {data}")
        return {"result": result}

@app.post("/api/ui/{action}")
async def manage_ui(action: str, data: dict):
    """Run UI management workflows"""
    async with fast.run() as agent:
        result = await agent.ui_workflow(f"{action}: {data}")
        return {"result": result}

@app.post("/api/calendar/{action}")
async def manage_calendar(action: str, data: dict):
    """Run calendar management workflows"""
    async with fast.run() as agent:
        result = await agent.calendar_workflow(f"{action}: {data}")
        return {"result": result}

def run_server():
    """Run the FastAPI server"""
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    run_server()
