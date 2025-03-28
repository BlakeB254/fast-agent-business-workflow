class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { project, onNavigateToProjects } = this.props;
        
        return (
            <header className="app-header">
                <div className="header-left">
                    <h1>
                        <a href="#" onClick={onNavigateToProjects}>
                            Business Workflow System
                        </a>
                    </h1>
                    {project && (
                        <div className="current-project">
                            <span className="separator">|</span>
                            <div className="project-logo" style={{backgroundColor: project.colorScheme.primary}}>
                                {project.name.charAt(0)}
                            </div>
                            <span className="project-name">{project.name}</span>
                        </div>
                    )}
                </div>
                
                {project && (
                    <nav className="project-nav">
                        <ul>
                            <li>
                                <a href="#dashboard" 
                                   className={`nav-link ${this.props.activeSection === 'dashboard' ? 'active' : ''}`}
                                   data-section="dashboard"
                                   onClick={(e) => this.props.onSectionChange(e, 'dashboard')}>
                                    <i className="fas fa-tachometer-alt"></i> Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#documents" 
                                   className={`nav-link ${this.props.activeSection === 'documents' ? 'active' : ''}`}
                                   data-section="documents"
                                   onClick={(e) => this.props.onSectionChange(e, 'documents')}>
                                    <i className="fas fa-file-alt"></i> Documents
                                </a>
                            </li>
                            <li>
                                <a href="#marketing" 
                                   className={`nav-link ${this.props.activeSection === 'marketing' ? 'active' : ''}`}
                                   data-section="marketing"
                                   onClick={(e) => this.props.onSectionChange(e, 'marketing')}>
                                    <i className="fas fa-bullhorn"></i> Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#calendar" 
                                   className={`nav-link ${this.props.activeSection === 'calendar' ? 'active' : ''}`}
                                   data-section="calendar"
                                   onClick={(e) => this.props.onSectionChange(e, 'calendar')}>
                                    <i className="fas fa-calendar-alt"></i> Calendar
                                </a>
                            </li>
                            <li>
                                <a href="#technical" 
                                   className={`nav-link ${this.props.activeSection === 'technical' ? 'active' : ''}`}
                                   data-section="technical"
                                   onClick={(e) => this.props.onSectionChange(e, 'technical')}>
                                    <i className="fas fa-code"></i> Technical
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
                
                <div className="header-right">
                    {/* User profile and other options could go here */}
                    <button className="settings-button">
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </header>
        );
    }
}

// Used when rendering the component directly
if (typeof ReactDOM !== 'undefined') {
    // This ensures it doesn't error if imported elsewhere
    if (document.getElementById('header-container')) {
        ReactDOM.render(
            <Header />,
            document.getElementById('header-container')
        );
    }
}
