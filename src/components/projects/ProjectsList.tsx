import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../../types';

interface ProjectsListProps {
  onSelectProject: (project: Project) => void;
}

// Mock data for demonstration purposes
const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Acme Inc.',
    industry: 'Technology',
    description: 'Enterprise SaaS platform for workflow management',
    colorScheme: {
      primary: '#3498db',
      secondary: '#2c3e50',
      accent: '#e74c3c'
    },
    createdDate: '2025-01-15',
    lastModified: '2025-03-20',
    status: 'active',
    documentCount: 12,
    campaignCount: 3,
    eventCount: 8,
    repoCount: 2
  },
  {
    id: 'project-2',
    name: 'Green Foods',
    industry: 'Food & Beverage',
    description: 'Organic food product line and distribution',
    colorScheme: {
      primary: '#27ae60',
      secondary: '#2c3e50',
      accent: '#f39c12'
    },
    createdDate: '2025-02-10',
    lastModified: '2025-03-15',
    status: 'active',
    documentCount: 8,
    campaignCount: 2,
    eventCount: 5,
    repoCount: 1
  },
  {
    id: 'project-3',
    name: 'UrbanLiving',
    industry: 'Real Estate',
    description: 'Modern urban apartment complexes and community spaces',
    colorScheme: {
      primary: '#9b59b6',
      secondary: '#34495e',
      accent: '#1abc9c'
    },
    createdDate: '2024-11-05',
    lastModified: '2025-02-28',
    status: 'active',
    documentCount: 15,
    campaignCount: 1,
    eventCount: 10,
    repoCount: 3
  }
];

const ProjectsList: React.FC<ProjectsListProps> = ({ onSelectProject }) => {
  const [projects] = useState<Project[]>(mockProjects);
  
  const handleSelectProject = (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);
    if (selectedProject) {
      onSelectProject(selectedProject);
    }
  };
  
  const handleCreateProject = () => {
    // Navigate to onboarding in a real implementation
    console.log('Create new project');
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Projects</h1>
          <p className="text-gray-600">Select a project to manage or create a new one</p>
        </div>
        <button 
          onClick={handleCreateProject}
          className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <i className="fas fa-plus mr-2"></i> Create New Project
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onSelect={handleSelectProject} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
