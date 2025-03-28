# Business Workflow System - Frontend Demo

This project showcases a frontend UI demonstration for a comprehensive business workflow system, with focus on document management, marketing/advertising management, calendar features, and technical integrations.

## Frontend-Only Demo

This version of the project is a **frontend-only demo** that focuses on UI visualization without backend dependencies. It uses mock data to simulate the functionality of the full application.

## Key Features

- **Business Onboarding**: Guided process to collect company information and set up branding
- **Document Management**: Create, view, and "download" business documents (simulated)
- **Marketing & Advertising**: 
  - Social media guidelines and templates
  - Advertising campaign tracking
  - Content creator partnership management
- **Calendar Management**: Track business events, deadlines, and tasks
- **Technical UI Management**: Repository visualization and code management interface

## How to Run the Frontend Demo

### Option 1: Using Python's built-in HTTP server

```bash
# Clone the repository
git clone https://github.com/BlakeB254/fast-agent-business-workflow.git
cd fast-agent-business-workflow

# Start a simple HTTP server
python -m http.server 8000
```

Then navigate to: http://localhost:8000/ui/

### Option 2: Using Node.js http-server

If you have Node.js installed:

```bash
# Install http-server globally if not already installed
npm install -g http-server

# Clone the repository
git clone https://github.com/BlakeB254/fast-agent-business-workflow.git
cd fast-agent-business-workflow

# Start the server
http-server
```

Then navigate to: http://localhost:8080/ui/

### Option 3: Using a Code Editor Extension

If you're using VSCode:
1. Install the "Live Server" extension
2. Right-click on `ui/index.html` and select "Open with Live Server"

## Project Structure

```
fast-agent-business-workflow/
├── ui/                      # Frontend UI code
│   ├── components/          # React components
│   ├── index.html           # Main application page
│   └── styles.css           # CSS styling
├── js/                      # JavaScript code
│   ├── data.js              # Mock data
│   └── app.js               # Main application logic
└── README.md                # Documentation
```

## Navigation

The interface includes 5 main sections:

1. **Onboarding**: Business setup and profile information
2. **Documents**: Document management system with templates and file "downloads"
3. **Marketing**: Advertising campaign management, social media guidelines, and content creator partnerships
4. **Calendar**: Business calendar with events, deadlines, and task management
5. **Technical**: Repository management and technical infrastructure

## Mock Features

In this frontend demo:
- File "downloads" will show an alert instead of downloading actual files
- Form submissions will not be processed
- Navigation between sections is fully functional
- All UI components are styled and interactive
- Data displayed is from the mock datasets in `js/data.js`

## Future Development

This frontend demo serves as a visualization of the UI for the full business workflow system. For production use, the following would be implemented:

- Backend API integration
- Database connectivity
- Authentication and authorization
- Document generation and storage
- Real file downloading capability
- Integration with external services (GitHub, calendar systems, etc.)

## Acknowledgments

- UI styling framework based on modern design principles
- Icons from Font Awesome
- React.js for component-based architecture
