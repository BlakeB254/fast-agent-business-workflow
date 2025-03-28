import asyncio
import logging
import os
from pathlib import Path
import fast_agent as fast
from fastapi import FastAPI, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import workflow definitions
from workflows.onboarding import onboarding_workflow
from workflows.document_management import document_workflow
from workflows.ui_management import ui_workflow
from workflows.calendar_management import calendar_workflow
from workflows.marketing_management import marketing_router

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Business Workflow System")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for the UI
app.mount("/ui", StaticFiles(directory="ui", html=True), name="ui")

# Determine user's home directory
HOME_DIR = Path.home()

# Use environment variable if set, otherwise use default TechShit/businesses directory
if os.environ.get("BUSINESS_WORKFLOW_DIR"):
    BASE_DIR = Path(os.environ.get("BUSINESS_WORKFLOW_DIR"))
else:
    BASE_DIR = HOME_DIR / "TechShit" / "businesses"

# Directory for storing business data
DATA_DIR = BASE_DIR / "data"
DOWNLOADS_DIR = DATA_DIR / "downloads"

@app.get("/")
async def root():
    """Redirect to the UI frontend"""
    return {"message": "API is running. Access the UI at /ui"}

# API endpoints for different workflows
@app.post("/api/onboarding")
async def run_onboarding(data: dict):
    """Run the onboarding workflow with provided data"""
    try:
        async with fast.run() as agent:
            result = await agent.onboarding_workflow(data)
            return {"result": result}
    except Exception as e:
        logger.error(f"Error in onboarding workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/document/{action}")
async def manage_document(action: str, data: dict):
    """Run document management workflows"""
    try:
        async with fast.run() as agent:
            result = await agent.document_workflow(f"{action}: {data}")
            return {"result": result}
    except Exception as e:
        logger.error(f"Error in document workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ui/{action}")
async def manage_ui(action: str, data: dict):
    """Run UI management workflows"""
    try:
        async with fast.run() as agent:
            result = await agent.ui_workflow(f"{action}: {data}")
            return {"result": result}
    except Exception as e:
        logger.error(f"Error in UI workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/calendar/{action}")
async def manage_calendar(action: str, data: dict):
    """Run calendar management workflows"""
    try:
        async with fast.run() as agent:
            result = await agent.calendar_workflow(f"{action}: {data}")
            return {"result": result}
    except Exception as e:
        logger.error(f"Error in calendar workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/marketing/{action}")
async def manage_marketing(action: str, data: dict):
    """Run marketing management workflows"""
    try:
        async with fast.run() as agent:
            result = await agent.marketing_router(f"{action}: {data}")
            return {"result": result}
    except Exception as e:
        logger.error(f"Error in marketing workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Download API endpoints
@app.get("/api/download/{content_type}/{subtype}/{filename}")
async def download_file(content_type: str, subtype: str, filename: str):
    """Download a file from the filesystem"""
    try:
        # Get the file path from the filesystem server
        async with fast.run() as agent:
            result = await agent.filesystem.get_download_path(content_type, subtype, filename)
            
        if "not found" in result:
            raise HTTPException(status_code=404, detail=f"File {filename} not found")
        
        file_path = result
        
        # Determine content type for the response
        if filename.endswith('.pdf'):
            media_type = 'application/pdf'
        elif filename.endswith('.json'):
            media_type = 'application/json'
        elif filename.endswith('.txt'):
            media_type = 'text/plain'
        elif filename.endswith('.html'):
            media_type = 'text/html'
        elif filename.endswith('.css'):
            media_type = 'text/css'
        elif filename.endswith('.js'):
            media_type = 'application/javascript'
        elif filename.endswith(('.jpg', '.jpeg')):
            media_type = 'image/jpeg'
        elif filename.endswith('.png'):
            media_type = 'image/png'
        else:
            media_type = 'application/octet-stream'
        
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type=media_type
        )
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        logger.error(f"Error downloading file: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/downloads")
async def list_downloads(content_type: str = None, subtype: str = None):
    """List available downloads"""
    try:
        async with fast.run() as agent:
            result = await agent.filesystem.list_downloads(content_type, subtype)
            
        return {"downloads": result}
    except Exception as e:
        logger.error(f"Error listing downloads: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/config")
async def get_config():
    """Get application configuration"""
    return {
        "base_dir": str(BASE_DIR),
        "data_dir": str(DATA_DIR),
        "downloads_dir": str(DOWNLOADS_DIR),
    }

def run_server():
    """Run the FastAPI server"""
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    # Ensure directories exist
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(DOWNLOADS_DIR, exist_ok=True)
    
    # Start the server
    run_server()
