import React from 'react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer" 
         onClick={() => onSelect(project.id)}>
      <div className="p-6" style={{ backgroundColor: project.colorScheme.primary }}>
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold" 
               style={{ color: project.colorScheme.primary }}>
            {project.name.charAt(0)}
          </div>
          <div className="ml-4 text-white">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <span className="inline-block px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
              {project.industry}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6">{project.description}</p>
        
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="p-2 bg-gray-50 rounded">
            <i className="fas fa-file-alt text-blue-500 mb-1 text-lg"></i>
            <p className="text-sm font-medium">{project.documentCount}</p>
            <p className="text-xs text-gray-500">Docs</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <i className="fas fa-bullhorn text-green-500 mb-1 text-lg"></i>
            <p className="text-sm font-medium">{project.campaignCount}</p>
            <p className="text-xs text-gray-500">Campaigns</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <i className="fas fa-calendar-alt text-purple-500 mb-1 text-lg"></i>
            <p className="text-sm font-medium">{project.eventCount}</p>
            <p className="text-xs text-gray-500">Events</p>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <i className="fas fa-code text-gray-700 mb-1 text-lg"></i>
            <p className="text-sm font-medium">{project.repoCount}</p>
            <p className="text-xs text-gray-500">Repos</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 flex justify-between items-center border-t border-gray-100">
        <span>Created: {formatDate(project.createdDate)}</span>
        <span>Updated: {formatDate(project.lastModified)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
