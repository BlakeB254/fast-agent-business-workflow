class ProjectDashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { project } = this.props;
        
        if (!project) {
            return <div className="loading">Loading project...</div>;
        }
        
        return (
            <div className="project-dashboard">
                <div className="dashboard-header">
                    <h2>Project Dashboard</h2>
                </div>
                
                <div className="dashboard-grid">
                    {/* Documents Overview */}
                    <div className="dashboard-card documents-card">
                        <div className="card-header">
                            <h3><i className="fas fa-file-alt"></i> Documents</h3>
                            <button className="view-all-button" onClick={(e) => this.props.onSectionChange(e, 'documents')}>
                                View All
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="document-stats">
                                <div className="stat">
                                    <span className="stat-number">{project.documentCount || 0}</span>
                                    <span className="stat-label">Total Documents</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">
                                        {project.documents ? 
                                         project.documents.filter(doc => doc.metadata.status === 'final').length : 
                                         0}
                                    </span>
                                    <span className="stat-label">Finalized</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">
                                        {project.documents ? 
                                         project.documents.filter(doc => doc.metadata.status === 'draft' || doc.metadata.status === 'review').length : 
                                         0}
                                    </span>
                                    <span className="stat-label">In Progress</span>
                                </div>
                            </div>
                            
                            <div className="recent-documents">
                                <h4>Recent Documents</h4>
                                {project.documents && project.documents.length > 0 ? (
                                    <ul className="document-list">
                                        {project.documents.slice(0, 3).map((doc, index) => (
                                            <li key={index} className="document-item">
                                                <span className="document-icon">
                                                    <i className="fas fa-file-pdf"></i>
                                                </span>
                                                <span className="document-name">{doc.filename}</span>
                                                <span className={`document-status status-${doc.metadata.status}`}>
                                                    {doc.metadata.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-documents">No documents yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Marketing Overview */}
                    <div className="dashboard-card marketing-card">
                        <div className="card-header">
                            <h3><i className="fas fa-bullhorn"></i> Marketing</h3>
                            <button className="view-all-button" onClick={(e) => this.props.onSectionChange(e, 'marketing')}>
                                View All
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="campaign-stats">
                                <div className="stat">
                                    <span className="stat-number">{project.campaignCount || 0}</span>
                                    <span className="stat-label">Campaigns</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">
                                        {project.campaigns ? 
                                         project.campaigns.filter(c => c.status === 'active').length : 
                                         0}
                                    </span>
                                    <span className="stat-label">Active</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">
                                        {project.campaigns ? 
                                         project.campaigns.filter(c => c.status === 'planned').length : 
                                         0}
                                    </span>
                                    <span className="stat-label">Planned</span>
                                </div>
                            </div>
                            
                            <div className="active-campaigns">
                                <h4>Active Campaigns</h4>
                                {project.campaigns && project.campaigns.filter(c => c.status === 'active').length > 0 ? (
                                    <ul className="campaign-list">
                                        {project.campaigns.filter(c => c.status === 'active').map((campaign, index) => (
                                            <li key={index} className="campaign-item">
                                                <div className="campaign-info">
                                                    <span className="campaign-name">{campaign.name}</span>
                                                    <span className="campaign-dates">
                                                        {campaign.start_date} - {campaign.end_date}
                                                    </span>
                                                </div>
                                                <div className="campaign-progress">
                                                    <div className="progress-bar">
                                                        <div 
                                                            className="progress-fill" 
                                                            style={{width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className="progress-text">
                                                        ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-campaigns">No active campaigns</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Calendar Overview */}
                    <div className="dashboard-card calendar-card">
                        <div className="card-header">
                            <h3><i className="fas fa-calendar-alt"></i> Calendar</h3>
                            <button className="view-all-button" onClick={(e) => this.props.onSectionChange(e, 'calendar')}>
                                View All
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="upcoming-events">
                                <h4>Upcoming Events</h4>
                                {project.events && project.events.length > 0 ? (
                                    <ul className="event-list">
                                        {project.events.slice(0, 3).map((event, index) => (
                                            <li key={index} className={`event-item event-type-${event.type}`}>
                                                <div className="event-date">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="event-details">
                                                    <span className="event-title">{event.title}</span>
                                                    <span className="event-description">{event.description}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-events">No upcoming events</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Technical Overview */}
                    <div className="dashboard-card technical-card">
                        <div className="card-header">
                            <h3><i className="fas fa-code"></i> Technical</h3>
                            <button className="view-all-button" onClick={(e) => this.props.onSectionChange(e, 'technical')}>
                                View All
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="repositories">
                                <h4>Repositories</h4>
                                {project.repositories && project.repositories.length > 0 ? (
                                    <ul className="repo-list">
                                        {project.repositories.map((repo, index) => (
                                            <li key={index} className="repo-item">
                                                <div className="repo-icon">
                                                    <i className="fas fa-code-branch"></i>
                                                </div>
                                                <div className="repo-details">
                                                    <span className="repo-name">{repo.name}</span>
                                                    <span className="repo-description">{repo.description}</span>
                                                    <span className="repo-language">
                                                        <span 
                                                            className="language-dot"
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
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-repos">No repositories yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Used when rendering the component directly
if (typeof ReactDOM !== 'undefined') {
    // This ensures it doesn't error if imported elsewhere
    if (document.getElementById('project-dashboard-container')) {
        ReactDOM.render(
            <ProjectDashboard project={{}} onSectionChange={() => {}} />,
            document.getElementById('project-dashboard-container')
        );
    }
}
