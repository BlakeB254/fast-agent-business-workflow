// js/projects.js - Project management functionality

// Sample mock projects
const mockProjects = [
    {
        id: "project-1",
        name: "Acme Inc.",
        industry: "Technology",
        description: "Software development company specializing in AI solutions",
        logo: "https://via.placeholder.com/80",
        created: "2025-01-15",
        lastModified: "2025-03-20",
        stats: {
            documents: 12,
            campaigns: 3,
            events: 8,
            repositories: 5
        },
        status: "active"
    },
    {
        id: "project-2",
        name: "EcoSolutions",
        industry: "Environmental",
        description: "Sustainable product manufacturing and distribution",
        logo: "https://via.placeholder.com/80",
        created: "2025-02-03",
        lastModified: "2025-03-15",
        stats: {
            documents: 8,
            campaigns: 2,
            events: 5,
            repositories: 3
        },
        status: "active"
    },
    {
        id: "project-3",
        name: "HealthPlus",
        industry: "Healthcare",
        description: "Healthcare services provider with innovative telemedicine platform",
        logo: "https://via.placeholder.com/80",
        created: "2024-11-20",
        lastModified: "2025-03-10",
        stats: {
            documents: 15,
            campaigns: 4,
            events: 10,
            repositories: 2
        },
        status: "active"
    }
];

// Function to initialize project selection screen
function initProjectSelection() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projectsContainer) return;
    
    // Clear any existing content
    projectsContainer.innerHTML = '';
    
    // Add projects
    mockProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.projectId = project.id;
        
        projectCard.innerHTML = `
            <div class="project-logo">
                <img src="${project.logo}" alt="${project.name} logo">
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <div class="project-industry">${project.industry}</div>
                <p>${project.description}</p>
                <div class="project-stats">
                    <div class="stat">
                        <i class="fas fa-file-alt"></i>
                        <span>${project.stats.documents}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-bullhorn"></i>
                        <span>${project.stats.campaigns}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${project.stats.events}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-code"></i>
                        <span>${project.stats.repositories}</span>
                    </div>
                </div>
                <div class="project-meta">
                    <span>Last modified: ${formatDate(project.lastModified)}</span>
                </div>
            </div>
            <div class="project-actions">
                <button class="select-project-btn" onclick="selectProject('${project.id}')">
                    Open Project
                </button>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Function to select and load a project
function selectProject(projectId) {
    // Store selected project ID in localStorage
    localStorage.setItem('currentProjectId', projectId);
    
    // In a real app, this would load data for the specific project
    console.log(`Loading project ${projectId}`);
    
    // Redirect to project dashboard
    window.location.href = 'project-dashboard.html';
}

// Function to navigate to onboarding/create new project
function createNewProject() {
    // Clear any current project
    localStorage.removeItem('currentProjectId');
    
    // Redirect to onboarding
    window.location.href = 'onboarding.html';
}

// Check if user is on a project page but not logged in to a project
function checkProjectAccess() {
    // Simple check - if we're on a project page but no project is selected, redirect
    const isProjectPage = document.body.classList.contains('project-page');
    const hasSelectedProject = localStorage.getItem('currentProjectId');
    
    if (isProjectPage && !hasSelectedProject) {
        // Redirect to project selection
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Function to load current project data into page
function loadCurrentProject() {
    const projectId = localStorage.getItem('currentProjectId');
    if (!projectId) return false;
    
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return false;
    
    // Update project name in header
    const projectNameElement = document.getElementById('current-project-name');
    if (projectNameElement) {
        projectNameElement.textContent = project.name;
    }
    
    // Update project details if on dashboard
    const projectDetailsElement = document.getElementById('project-details');
    if (projectDetailsElement) {
        projectDetailsElement.innerHTML = `
            <div class="project-detail-header">
                <img src="${project.logo}" alt="${project.name} logo" class="project-logo-large">
                <div>
                    <h2>${project.name}</h2>
                    <div class="project-industry">${project.industry}</div>
                </div>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="project-meta-details">
                <div class="meta-item">
                    <span class="meta-label">Created:</span>
                    <span class="meta-value">${formatDate(project.created)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Last Modified:</span>
                    <span class="meta-value">${formatDate(project.lastModified)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Status:</span>
                    <span class="meta-value status-${project.status}">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                </div>
            </div>
        `;
    }
    
    return true;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project selection if on the right page
    if (document.getElementById('projects-container')) {
        initProjectSelection();
    }
    
    // Check project access for project pages
    if (document.body.classList.contains('project-page')) {
        if (checkProjectAccess()) {
            loadCurrentProject();
        }
    }
    
    // Attach event listener to new project button if it exists
    const newProjectBtn = document.getElementById('new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', createNewProject);
    }
    
    // Attach event listener to back to projects button if it exists
    const backToProjectsBtn = document.getElementById('back-to-projects');
    if (backToProjectsBtn) {
        backToProjectsBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Attach event listener to logout button if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentProjectId');
            window.location.href = 'index.html';
        });
    }
});