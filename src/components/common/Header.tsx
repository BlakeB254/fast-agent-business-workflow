import React from 'react';
import { Project } from '../../types';

interface HeaderProps {
  project?: Project | null;
  activeSection: string;
  onSectionChange: (e: React.MouseEvent<HTMLAnchorElement>, section: string) => void;
  onNavigateToProjects: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  project, 
  activeSection, 
  onSectionChange, 
  onNavigateToProjects 
}) => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">
            <button 
              onClick={onNavigateToProjects}
              className="hover:text-blue-300 transition-colors"
            >
              Business Workflow System
            </button>
          </h1>
          
          {project && (
            <div className="flex items-center ml-4 pl-4 border-l border-gray-600">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: project.colorScheme.primary }}
              >
                {project.name.charAt(0)}
              </div>
              <span className="ml-2 font-medium">{project.name}</span>
            </div>
          )}
        </div>
        
        {project && (
          <nav className="flex flex-wrap items-center space-x-1 md:space-x-4">
            <a 
              href="#dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'dashboard' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={(e) => onSectionChange(e, 'dashboard')}
            >
              <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
            </a>
            
            <a 
              href="#documents" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'documents' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={(e) => onSectionChange(e, 'documents')}
            >
              <i className="fas fa-file-alt mr-1"></i> Documents
            </a>
            
            <a 
              href="#marketing" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'marketing' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={(e) => onSectionChange(e, 'marketing')}
            >
              <i className="fas fa-bullhorn mr-1"></i> Marketing
            </a>
            
            <a 
              href="#calendar" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'calendar' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={(e) => onSectionChange(e, 'calendar')}
            >
              <i className="fas fa-calendar-alt mr-1"></i> Calendar
            </a>
            
            <a 
              href="#technical" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'technical' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={(e) => onSectionChange(e, 'technical')}
            >
              <i className="fas fa-code mr-1"></i> Technical
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
