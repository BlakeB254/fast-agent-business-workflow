import React from 'react';
import { Project, Document, CalendarEvent, Repository } from '../../types';

interface ProjectDashboardProps {
  project: Project;
  onSectionChange: (e: React.MouseEvent<HTMLButtonElement>, section: string) => void;
}

// In a real implementation, this data would come from API calls
const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ project, onSectionChange }) => {
  // Mock data for demonstration
  const documents: Document[] = [
    {
      filename: 'business_plan_2025.pdf',
      document_type: 'business_plan',
      download_path: '#',
      metadata: {
        created_at: '2025-01-15T10:30:00',
        status: 'final'
      }
    },
    {
      filename: 'marketing_strategy_q2.pdf',
      document_type: 'marketing',
      download_path: '#',
      metadata: {
        created_at: '2025-03-01T09:15:00',
        status: 'review'
      }
    },
    {
      filename: 'employee_handbook.pdf',
      document_type: 'policy',
      download_path: '#',
      metadata: {
        created_at: '2025-02-10T14:30:00',
        status: 'final'
      }
    }
  ];
  
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Product Launch',
      date: '2025-06-01',
      type: 'event',
      description: 'Summer product line launch event'
    },
    {
      id: '2',
      title: 'Tax Filing',
      date: '2025-04-15',
      type: 'deadline',
      description: 'Quarterly tax filing deadline'
    },
    {
      id: '3',
      title: 'Team Retreat',
      date: '2025-05-20',
      type: 'event',
      description: 'Annual team-building retreat'
    }
  ];
  
  const repositories: Repository[] = [
    {
      name: 'acme-saas-platform',
      description: 'Main SaaS platform repository',
      language: 'JavaScript',
      updatedAt: '2025-03-15T10:30:00'
    },
    {
      name: 'acme-mobile-app',
      description: 'Mobile application companion',
      language: 'Swift',
      updatedAt: '2025-03-20T15:45:00'
    }
  ];
  
  const activeCampaigns = [
    {
      name: 'Summer Product Launch',
      dates: '2025-06-01 to 2025-07-15',
      budget: 5000,
      spent: 2350,
      progress: 47 // percentage
    }
  ];
  
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: project.colorScheme.primary }}
          >
            {project.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Industry</p>
            <p className="font-medium">{project.industry}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium">{new Date(project.createdDate).toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">{new Date(project.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documents Overview */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <button 
              onClick={(e) => onSectionChange(e, 'documents')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {documents.slice(0, 3).map((doc, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-red-500 mr-3"></i>
                  <span className="font-medium">{doc.filename}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  doc.metadata?.status === 'final' ? 'bg-green-100 text-green-800' :
                  doc.metadata?.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {doc.metadata?.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Calendar Overview */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <button 
              onClick={(e) => onSectionChange(e, 'calendar')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View Calendar
            </button>
          </div>
          
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    event.type === 'event' ? 'bg-blue-100 text-blue-700' : 
                    event.type === 'deadline' ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    <i className={`fas ${
                      event.type === 'event' ? 'fa-calendar-day' : 
                      event.type === 'deadline' ? 'fa-exclamation-circle' : 
                      'fa-tasks'
                    }`}></i>
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  event.type === 'event' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Marketing Overview */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Marketing</h2>
            <button 
              onClick={(e) => onSectionChange(e, 'marketing')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View Campaigns
            </button>
          </div>
          
          {activeCampaigns.length > 0 ? (
            <div className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{campaign.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{campaign.dates}</p>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          Budget Usage
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          ${campaign.spent} / ${campaign.budget}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div style={{ width: `${campaign.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No active campaigns</p>
            </div>
          )}
        </section>
        
        {/* Technical Overview */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Technical</h2>
            <button 
              onClick={(e) => onSectionChange(e, 'technical')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {repositories.map((repo, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">{repo.name}</h3>
                  <span className="flex items-center text-xs text-gray-500">
                    <span 
                      className="w-3 h-3 rounded-full mr-1"
                      style={{ 
                        backgroundColor: 
                          repo.language === 'JavaScript' ? '#f1e05a' : 
                          repo.language === 'Swift' ? '#ffac45' : 
                          '#6e7681'
                      }}
                    ></span>
                    {repo.language}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{repo.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Updated: {new Date(repo.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={(e) => onSectionChange(e, 'documents')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <i className="fas fa-plus mr-2"></i> New Document
            </button>
            <button 
              onClick={(e) => onSectionChange(e, 'marketing')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <i className="fas fa-bullhorn mr-2"></i> New Campaign
            </button>
            <button 
              onClick={(e) => onSectionChange(e, 'calendar')}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <i className="fas fa-calendar-plus mr-2"></i> Add Event
            </button>
            <button 
              onClick={(e) => onSectionChange(e, 'technical')}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
            >
              <i className="fas fa-code-branch mr-2"></i> Manage Repos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
