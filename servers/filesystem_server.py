#!/usr/bin/env python3
"""
Filesystem MCP Server for Fast-Agent Business Workflow System
Handles file operations for storing and retrieving business data
"""

import json
import os
import datetime
import platform
import shutil
from pathlib import Path
from typing import Dict, Any, List, Optional

from mcp.types import FunctionResult
from mcp.server import Server
from mcp.errors import MCPError

# Determine user's home directory
HOME_DIR = Path.home()

# Allow configuring the base directory via environment variable or default to user-specified location
if platform.system() == "Windows":
    DEFAULT_BASE_DIR = HOME_DIR / "TechShit" / "businesses"
else:
    DEFAULT_BASE_DIR = HOME_DIR / "TechShit" / "businesses"

# Use environment variable if set, otherwise use default
BASE_DIR = Path(os.environ.get("BUSINESS_WORKFLOW_DIR", str(DEFAULT_BASE_DIR)))

# Directory for storing business data
DATA_DIR = BASE_DIR / "data"
# Subdirectories
DOCUMENTS_DIR = DATA_DIR / "documents"
BUSINESS_DATA_DIR = DATA_DIR / "business"
CALENDAR_DIR = DATA_DIR / "calendar"
UI_ASSETS_DIR = DATA_DIR / "ui_assets"
DOWNLOADS_DIR = DATA_DIR / "downloads"  # For user downloads


class FilesystemServer(Server):
    """MCP Server for filesystem operations in the business workflow system"""

    def __init__(self):
        super().__init__()
        
        # Ensure directories exist
        self._ensure_directories()
        
        # Register functions
        self.register_function("save_business_data", self.save_business_data)
        self.register_function("get_business_data", self.get_business_data)
        self.register_function("list_business_data", self.list_business_data)
        self.register_function("save_document", self.save_document)
        self.register_function("get_document", self.get_document)
        self.register_function("list_documents", self.list_documents)
        self.register_function("save_calendar_event", self.save_calendar_event)
        self.register_function("get_calendar_events", self.get_calendar_events)
        self.register_function("save_task", self.save_task)
        self.register_function("get_tasks", self.get_tasks)
        self.register_function("save_ui_asset", self.save_ui_asset)
        self.register_function("get_ui_asset", self.get_ui_asset)
        self.register_function("list_ui_assets", self.list_ui_assets)
        
        # Add functions for download functionality
        self.register_function("prepare_download", self.prepare_download)
        self.register_function("get_download_path", self.get_download_path)
        self.register_function("list_downloads", self.list_downloads)
    
    def _ensure_directories(self):
        """Ensure required directories exist"""
        os.makedirs(DOCUMENTS_DIR, exist_ok=True)
        os.makedirs(BUSINESS_DATA_DIR, exist_ok=True)
        os.makedirs(CALENDAR_DIR, exist_ok=True)
        os.makedirs(UI_ASSETS_DIR, exist_ok=True)
        os.makedirs(DOWNLOADS_DIR, exist_ok=True)
        
        # Create a blank .keep file to ensure Git tracks the directories
        for directory in [DOCUMENTS_DIR, BUSINESS_DATA_DIR, CALENDAR_DIR, UI_ASSETS_DIR, DOWNLOADS_DIR]:
            keep_file = directory / ".keep"
            if not keep_file.exists():
                with open(keep_file, "w") as f:
                    f.write("# This file ensures the directory is tracked by Git")
    
    def save_business_data(self, data: Dict[str, Any], category: str) -> FunctionResult:
        """Save business data to a JSON file"""
        try:
            # Add timestamp
            data["updated_at"] = datetime.datetime.now().isoformat()
            
            # Create file path
            file_path = BUSINESS_DATA_DIR / f"{category}.json"
            
            # Save data
            with open(file_path, "w") as f:
                json.dump(data, f, indent=2)
            
            return FunctionResult(
                result=f"Business data saved to {file_path}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error saving business data: {str(e)}")
    
    def get_business_data(self, category: str) -> FunctionResult:
        """Get business data from a JSON file"""
        try:
            file_path = BUSINESS_DATA_DIR / f"{category}.json"
            
            if not file_path.exists():
                return FunctionResult(
                    result=f"No data found for {category}",
                    result_type="text"
                )
            
            with open(file_path, "r") as f:
                data = json.load(f)
            
            return FunctionResult(
                result=data,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error getting business data: {str(e)}")
    
    def list_business_data(self) -> FunctionResult:
        """List all business data categories"""
        try:
            files = list(BUSINESS_DATA_DIR.glob("*.json"))
            categories = [f.stem for f in files if not f.stem.startswith(".")]
            
            return FunctionResult(
                result=categories,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error listing business data: {str(e)}")
    
    def save_document(self, content: str, filename: str, 
                      document_type: str, metadata: Optional[Dict[str, Any]] = None) -> FunctionResult:
        """Save a document to the filesystem"""
        try:
            # Create document type directory if it doesn't exist
            doc_dir = DOCUMENTS_DIR / document_type
            os.makedirs(doc_dir, exist_ok=True)
            
            # Save document content
            file_path = doc_dir / filename
            with open(file_path, "w") as f:
                f.write(content)
            
            # Save metadata if provided
            if metadata:
                metadata["filename"] = filename
                metadata["document_type"] = document_type
                metadata["created_at"] = datetime.datetime.now().isoformat()
                metadata["local_path"] = str(file_path)
                
                meta_path = doc_dir / f"{Path(filename).stem}_metadata.json"
                with open(meta_path, "w") as f:
                    json.dump(metadata, f, indent=2)
            
            # Also prepare a copy for download
            self.prepare_download(content, filename, "document", document_type)
            
            return FunctionResult(
                result=f"Document saved to {file_path}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error saving document: {str(e)}")
    
    def get_document(self, filename: str, document_type: str) -> FunctionResult:
        """Get a document from the filesystem"""
        try:
            file_path = DOCUMENTS_DIR / document_type / filename
            
            if not file_path.exists():
                return FunctionResult(
                    result=f"Document {filename} not found in {document_type}",
                    result_type="text"
                )
            
            with open(file_path, "r") as f:
                content = f.read()
            
            # Try to get metadata if it exists
            meta_path = DOCUMENTS_DIR / document_type / f"{Path(filename).stem}_metadata.json"
            metadata = None
            if meta_path.exists():
                with open(meta_path, "r") as f:
                    metadata = json.load(f)
            
            result = {
                "content": content,
                "metadata": metadata,
                "download_path": f"/api/download/document/{document_type}/{filename}"
            }
            
            return FunctionResult(
                result=result,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error getting document: {str(e)}")
    
    def list_documents(self, document_type: Optional[str] = None) -> FunctionResult:
        """List documents, optionally filtered by type"""
        try:
            if document_type:
                doc_dir = DOCUMENTS_DIR / document_type
                if not doc_dir.exists():
                    return FunctionResult(
                        result=[],
                        result_type="json"
                    )
                
                # Get documents excluding metadata files and .keep files
                files = [f for f in doc_dir.glob("*") 
                        if not f.name.endswith("_metadata.json") and not f.name.startswith(".")]
                
                documents = []
                for f in files:
                    doc = {"filename": f.name, "document_type": document_type, 
                           "download_path": f"/api/download/document/{document_type}/{f.name}"}
                    
                    # Add metadata if available
                    meta_path = doc_dir / f"{f.stem}_metadata.json"
                    if meta_path.exists():
                        with open(meta_path, "r") as mf:
                            metadata = json.load(mf)
                            doc["metadata"] = metadata
                    
                    documents.append(doc)
            else:
                documents = []
                for doc_type_dir in DOCUMENTS_DIR.glob("*"):
                    if doc_type_dir.is_dir():
                        doc_type = doc_type_dir.name
                        # Get documents excluding metadata files and .keep files
                        files = [f for f in doc_type_dir.glob("*") 
                                if not f.name.endswith("_metadata.json") and not f.name.startswith(".")]
                        
                        for f in files:
                            doc = {"filename": f.name, "document_type": doc_type,
                                   "download_path": f"/api/download/document/{doc_type}/{f.name}"}
                            
                            # Add metadata if available
                            meta_path = doc_type_dir / f"{f.stem}_metadata.json"
                            if meta_path.exists():
                                with open(meta_path, "r") as mf:
                                    metadata = json.load(mf)
                                    doc["metadata"] = metadata
                            
                            documents.append(doc)
            
            return FunctionResult(
                result=documents,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error listing documents: {str(e)}")
    
    def save_calendar_event(self, event_data: Dict[str, Any]) -> FunctionResult:
        """Save a calendar event"""
        try:
            # Generate a unique ID if not provided
            if "id" not in event_data:
                event_data["id"] = f"event_{int(datetime.datetime.now().timestamp())}"
            
            event_id = event_data["id"]
            event_data["updated_at"] = datetime.datetime.now().isoformat()
            
            file_path = CALENDAR_DIR / f"event_{event_id}.json"
            
            with open(file_path, "w") as f:
                json.dump(event_data, f, indent=2)
            
            # Make it available for download
            self.prepare_download(json.dumps(event_data, indent=2), 
                                 f"event_{event_id}.json", 
                                 "calendar", "events")
            
            return FunctionResult(
                result=f"Calendar event saved with ID: {event_id}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error saving calendar event: {str(e)}")
    
    def get_calendar_events(self, start_date: Optional[str] = None, 
                           end_date: Optional[str] = None) -> FunctionResult:
        """Get calendar events, optionally filtered by date range"""
        try:
            events = []
            
            for file_path in CALENDAR_DIR.glob("event_*.json"):
                with open(file_path, "r") as f:
                    event = json.load(f)
                
                # Add download path
                event["download_path"] = f"/api/download/calendar/events/{file_path.name}"
                
                # Filter by date range if provided
                if start_date and end_date:
                    event_date = event.get("date") or event.get("start_date")
                    if event_date:
                        if start_date <= event_date <= end_date:
                            events.append(event)
                else:
                    events.append(event)
            
            return FunctionResult(
                result=events,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error getting calendar events: {str(e)}")
    
    def save_task(self, task_data: Dict[str, Any]) -> FunctionResult:
        """Save a task"""
        try:
            # Generate a unique ID if not provided
            if "id" not in task_data:
                task_data["id"] = f"task_{int(datetime.datetime.now().timestamp())}"
            
            task_id = task_data["id"]
            task_data["updated_at"] = datetime.datetime.now().isoformat()
            
            file_path = CALENDAR_DIR / f"task_{task_id}.json"
            
            with open(file_path, "w") as f:
                json.dump(task_data, f, indent=2)
            
            # Make it available for download
            self.prepare_download(json.dumps(task_data, indent=2), 
                                 f"task_{task_id}.json", 
                                 "calendar", "tasks")
            
            return FunctionResult(
                result=f"Task saved with ID: {task_id}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error saving task: {str(e)}")
    
    def get_tasks(self, status: Optional[str] = None) -> FunctionResult:
        """Get tasks, optionally filtered by status"""
        try:
            tasks = []
            
            for file_path in CALENDAR_DIR.glob("task_*.json"):
                with open(file_path, "r") as f:
                    task = json.load(f)
                
                # Add download path
                task["download_path"] = f"/api/download/calendar/tasks/{file_path.name}"
                
                # Filter by status if provided
                if status:
                    if task.get("status") == status:
                        tasks.append(task)
                else:
                    tasks.append(task)
            
            return FunctionResult(
                result=tasks,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error getting tasks: {str(e)}")
    
    def save_ui_asset(self, content: str, filename: str, 
                     asset_type: str) -> FunctionResult:
        """Save a UI asset (CSS, JS, images, etc.)"""
        try:
            # Create asset type directory if it doesn't exist
            asset_dir = UI_ASSETS_DIR / asset_type
            os.makedirs(asset_dir, exist_ok=True)
            
            # Save asset content
            file_path = asset_dir / filename
            with open(file_path, "w") as f:
                f.write(content)
            
            # Make it available for download
            self.prepare_download(content, filename, "ui_asset", asset_type)
            
            return FunctionResult(
                result=f"UI asset saved to {file_path}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error saving UI asset: {str(e)}")
    
    def get_ui_asset(self, filename: str, asset_type: str) -> FunctionResult:
        """Get a UI asset"""
        try:
            file_path = UI_ASSETS_DIR / asset_type / filename
            
            if not file_path.exists():
                return FunctionResult(
                    result=f"UI asset {filename} not found in {asset_type}",
                    result_type="text"
                )
            
            with open(file_path, "r") as f:
                content = f.read()
            
            result = {
                "content": content,
                "download_path": f"/api/download/ui_asset/{asset_type}/{filename}"
            }
            
            return FunctionResult(
                result=result,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error getting UI asset: {str(e)}")
    
    def list_ui_assets(self, asset_type: Optional[str] = None) -> FunctionResult:
        """List UI assets, optionally filtered by type"""
        try:
            if asset_type:
                asset_dir = UI_ASSETS_DIR / asset_type
                if not asset_dir.exists():
                    return FunctionResult(
                        result=[],
                        result_type="json"
                    )
                
                # Exclude .keep files
                files = [f for f in asset_dir.glob("*") if not f.name.startswith(".")]
                assets = [{"filename": f.name, 
                          "asset_type": asset_type, 
                          "download_path": f"/api/download/ui_asset/{asset_type}/{f.name}"} 
                          for f in files]
            else:
                assets = []
                for asset_type_dir in UI_ASSETS_DIR.glob("*"):
                    if asset_type_dir.is_dir():
                        asset_type = asset_type_dir.name
                        # Exclude .keep files
                        files = [f for f in asset_type_dir.glob("*") if not f.name.startswith(".")]
                        assets.extend([{"filename": f.name, 
                                      "asset_type": asset_type, 
                                      "download_path": f"/api/download/ui_asset/{asset_type}/{f.name}"} 
                                      for f in files])
            
            return FunctionResult(
                result=assets,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error listing UI assets: {str(e)}")
    
    # === Download functionality ===
    
    def prepare_download(self, content: str, filename: str, 
                        content_type: str, subtype: str = None) -> FunctionResult:
        """
        Prepare a file for download by copying it to the downloads directory
        
        Args:
            content: The content to save
            filename: The filename
            content_type: The type of content (document, calendar, ui_asset)
            subtype: The subtype (e.g., business_plan, event, css)
        """
        try:
            # Create directory if it doesn't exist
            if subtype:
                download_dir = DOWNLOADS_DIR / content_type / subtype
            else:
                download_dir = DOWNLOADS_DIR / content_type
            
            os.makedirs(download_dir, exist_ok=True)
            
            # Save the file
            file_path = download_dir / filename
            with open(file_path, "w") as f:
                f.write(content)
            
            # Create a metadata file with information about the download
            meta_path = download_dir / f"{Path(filename).stem}_metadata.json"
            metadata = {
                "filename": filename,
                "content_type": content_type,
                "subtype": subtype,
                "created_at": datetime.datetime.now().isoformat(),
                "download_path": f"/api/download/{content_type}/{subtype or ''}/{filename}"
            }
            
            with open(meta_path, "w") as f:
                json.dump(metadata, f, indent=2)
            
            return FunctionResult(
                result=f"File prepared for download at {file_path}",
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error preparing file for download: {str(e)}")
    
    def get_download_path(self, content_type: str, subtype: str, filename: str) -> FunctionResult:
        """
        Get the download path for a file
        
        Args:
            content_type: The type of content (document, calendar, ui_asset)
            subtype: The subtype (e.g., business_plan, event, css)
            filename: The filename
        """
        try:
            if subtype:
                file_path = DOWNLOADS_DIR / content_type / subtype / filename
            else:
                file_path = DOWNLOADS_DIR / content_type / filename
            
            if not file_path.exists():
                return FunctionResult(
                    result=f"File {filename} not found for download",
                    result_type="text"
                )
            
            return FunctionResult(
                result=str(file_path),
                result_type="text"
            )
        except Exception as e:
            raise MCPError(f"Error getting download path: {str(e)}")
    
    def list_downloads(self, content_type: Optional[str] = None, 
                      subtype: Optional[str] = None) -> FunctionResult:
        """
        List available downloads, optionally filtered by type and subtype
        """
        try:
            downloads = []
            
            if content_type and subtype:
                # List files in specific content type and subtype
                download_dir = DOWNLOADS_DIR / content_type / subtype
                if not download_dir.exists():
                    return FunctionResult(
                        result=[],
                        result_type="json"
                    )
                
                # Exclude metadata and .keep files
                files = [f for f in download_dir.glob("*") 
                        if not f.name.endswith("_metadata.json") and not f.name.startswith(".")]
                
                for f in files:
                    download = {
                        "filename": f.name,
                        "content_type": content_type,
                        "subtype": subtype,
                        "download_path": f"/api/download/{content_type}/{subtype}/{f.name}"
                    }
                    
                    # Add metadata if available
                    meta_path = download_dir / f"{f.stem}_metadata.json"
                    if meta_path.exists():
                        with open(meta_path, "r") as mf:
                            metadata = json.load(mf)
                            download["metadata"] = metadata
                    
                    downloads.append(download)
                
            elif content_type:
                # List files in specific content type across all subtypes
                content_dir = DOWNLOADS_DIR / content_type
                if not content_dir.exists():
                    return FunctionResult(
                        result=[],
                        result_type="json"
                    )
                
                for subtype_dir in content_dir.glob("*"):
                    if subtype_dir.is_dir():
                        subtype = subtype_dir.name
                        
                        # Exclude metadata and .keep files
                        files = [f for f in subtype_dir.glob("*") 
                                if not f.name.endswith("_metadata.json") and not f.name.startswith(".")]
                        
                        for f in files:
                            download = {
                                "filename": f.name,
                                "content_type": content_type,
                                "subtype": subtype,
                                "download_path": f"/api/download/{content_type}/{subtype}/{f.name}"
                            }
                            
                            # Add metadata if available
                            meta_path = subtype_dir / f"{f.stem}_metadata.json"
                            if meta_path.exists():
                                with open(meta_path, "r") as mf:
                                    metadata = json.load(mf)
                                    download["metadata"] = metadata
                            
                            downloads.append(download)
            
            else:
                # List all downloads
                for content_dir in DOWNLOADS_DIR.glob("*"):
                    if content_dir.is_dir():
                        content_type = content_dir.name
                        
                        for subtype_dir in content_dir.glob("*"):
                            if subtype_dir.is_dir():
                                subtype = subtype_dir.name
                                
                                # Exclude metadata and .keep files
                                files = [f for f in subtype_dir.glob("*") 
                                        if not f.name.endswith("_metadata.json") and not f.name.startswith(".")]
                                
                                for f in files:
                                    download = {
                                        "filename": f.name,
                                        "content_type": content_type,
                                        "subtype": subtype,
                                        "download_path": f"/api/download/{content_type}/{subtype}/{f.name}"
                                    }
                                    
                                    # Add metadata if available
                                    meta_path = subtype_dir / f"{f.stem}_metadata.json"
                                    if meta_path.exists():
                                        with open(meta_path, "r") as mf:
                                            metadata = json.load(mf)
                                            download["metadata"] = metadata
                                    
                                    downloads.append(download)
            
            return FunctionResult(
                result=downloads,
                result_type="json"
            )
        except Exception as e:
            raise MCPError(f"Error listing downloads: {str(e)}")


# Start the server
if __name__ == "__main__":
    print(f"Starting Filesystem Server with base directory: {BASE_DIR}")
    server = FilesystemServer()
    server.start()
