class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    render() {
        const { project, onSelect } = this.props;
        
        return (
            <div className="project-card" onClick={() => onSelect(project.id)}>
                <div className="project-card-header" style={{backgroundColor: project.colorScheme.primary}}>
                    <div className="project-logo">
                        {project.name.charAt(0)}
                    </div>
                    <div className="project-title">
                        <h3>{project.name}</h3>
                        <span className="project-industry">{project.industry}</span>
                    </div>
                </div>
                
                <div className="project-card-body">
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-stats">
                        <div className="stat-item">
                            <i className="fas fa-file-alt"></i>
                            <span>{project.documentCount} Documents</span>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-bullhorn"></i>
                            <span>{project.campaignCount} Campaigns</span>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>{project.eventCount} Events</span>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-code"></i>
                            <span>{project.repoCount} Repositories</span>
                        </div>
                    </div>
                </div>
                
                <div className="project-card-footer">
                    <span className="project-created">
                        Created: {this.formatDate(project.createdDate)}
                    </span>
                    <span className="project-modified">
                        Updated: {this.formatDate(project.lastModified)}
                    </span>
                </div>
            </div>
        );
    }
}

// Used when rendering the component directly
if (typeof ReactDOM !== 'undefined') {
    // This ensures it doesn't error if imported elsewhere
    if (document.getElementById('project-card-container')) {
        ReactDOM.render(
            <ProjectCard project={{}} onSelect={() => {}} />,
            document.getElementById('project-card-container')
        );
    }
}
