import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Components
import Header from './components/common/Header';
import OnboardingForm from './components/Onboarding/OnboardingForm';
import DocumentManagement from './components/Documents/DocumentManagement';
import MarketingPage from './components/Marketing/MarketingPage';
import CalendarPage from './components/Calendar/CalendarPage';
import TechnicalPage from './components/Technical/TechnicalPage';
import ProjectDashboard from './components/dashboards/ProjectDashboard';
import ProjectsList from './components/projects/ProjectsList';

// Types
import { Project } from './types';

const getDefaultProject = (): Project | null => {
  const savedProject = localStorage.getItem('currentProject');
  if (savedProject) {
    return JSON.parse(savedProject);
  }
  return null;
};

const App: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(getDefaultProject());
  
  // App layout when no specific routes are being used
  return (
    <Router>
      <AppContent currentProject={currentProject} setCurrentProject={setCurrentProject} />
    </Router>
  );
};

interface AppContentProps {
  currentProject: Project | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const AppContent: React.FC<AppContentProps> = ({ currentProject, setCurrentProject }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>(location.hash.slice(1) || 'dashboard');

  // Handle navigation based on hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save/load current project from localStorage
  useEffect(() => {
    if (currentProject) {
      localStorage.setItem('currentProject', JSON.stringify(currentProject));
    }
  }, [currentProject]);

  const handleSectionChange = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => {
    e.preventDefault();
    setActiveSection(section);
    window.location.hash = section;
  };

  const navigateToProjects = () => {
    setCurrentProject(null);
    localStorage.removeItem('currentProject');
    navigate('/projects');
  };

  const selectProject = (project: Project) => {
    setCurrentProject(project);
    navigate('/project-dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        project={currentProject}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onNavigateToProjects={navigateToProjects}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/projects" element={<ProjectsList onSelectProject={selectProject} />} />
          
          <Route path="/project-dashboard" element={
            currentProject ? (
              <div>
                {activeSection === 'dashboard' && <ProjectDashboard project={currentProject} onSectionChange={handleSectionChange} />}
                {activeSection === 'documents' && <DocumentManagement />}
                {activeSection === 'marketing' && <MarketingPage />}
                {activeSection === 'calendar' && <CalendarPage />}
                {activeSection === 'technical' && <TechnicalPage />}
              </div>
            ) : (
              <Navigate to="/projects" replace />
            )
          } />
          
          <Route path="/onboarding" element={<OnboardingForm />} />
          <Route path="/" element={<Navigate to={currentProject ? "/project-dashboard" : "/projects"} replace />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Business Workflow System</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
