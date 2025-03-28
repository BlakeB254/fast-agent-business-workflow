class DocumentManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            documentTypes: ['business_plan', 'license', 'legal', 'marketing', 'financial', 'other'],
            loading: true,
            error: null,
            activeTab: 'all',
            newDocumentType: 'business_plan',
            newDocumentTitle: '',
            newDocumentContent: '',
            showCreateForm: false
        };
    }

    componentDidMount() {
        this.fetchDocuments();
    }

    fetchDocuments = async () => {
        try {
            this.setState({ loading: true });
            
            const response = await fetch('/api/document/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: this.state.activeTab === 'all' ? null : this.state.activeTab
                }),
            });
            
            const data = await response.json();
            this.setState({ 
                documents: data.result || [],
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('Error fetching documents:', error);
            this.setState({ 
                error: 'Failed to load documents. Please try again.',
                loading: false
            });
        }
    }

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab }, this.fetchDocuments);
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    toggleCreateForm = () => {
        this.setState(prevState => ({ 
            showCreateForm: !prevState.showCreateForm 
        }));
    }

    handleCreateDocument = async (e) => {
        e.preventDefault();
        
        const { newDocumentType, newDocumentTitle, newDocumentContent } = this.state;
        
        if (!newDocumentTitle || !newDocumentContent) {
            this.setState({ error: 'Please fill in all fields' });
            return;
        }
        
        try {
            this.setState({ loading: true });
            
            const response = await fetch('/api/document/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: newDocumentType,
                    title: newDocumentTitle,
                    content: newDocumentContent,
                    metadata: {
                        created_by: 'user',
                        status: 'draft'
                    }
                }),
            });
            
            const data = await response.json();
            
            if (data.result) {
                this.setState({
                    newDocumentTitle: '',
                    newDocumentContent: '',
                    showCreateForm: false,
                    error: null
                });
                
                this.fetchDocuments();
            } else {
                this.setState({ 
                    error: 'Failed to create document. Please try again.',
                    loading: false
                });
            }
        } catch (error) {
            console.error('Error creating document:', error);
            this.setState({ 
                error: 'Failed to create document. Please try again.',
                loading: false
            });
        }
    }

    downloadDocument = (downloadPath) => {
        // Just navigate to the download URL - the server will handle the file download
        window.open(downloadPath, '_blank');
    }

    renderDocumentList() {
        const { documents, loading, error } = this.state;
        
        if (loading) {
            return <div className="loading">Loading documents...</div>;
        }
        
        if (error) {
            return <div className="error">{error}</div>;
        }
        
        if (!documents.length) {
            return (
                <div className="empty-state">
                    <p>No documents found. Create a new document to get started.</p>
                    <button onClick={this.toggleCreateForm}>Create Document</button>
                </div>
            );
        }
        
        return (
            <div className="document-list">
                {documents.map((doc, index) => (
                    <div key={index} className="document-card">
                        <div className="document-header">
                            <h3>{doc.filename}</h3>
                            <span className="document-type">{doc.document_type}</span>
                        </div>
                        <div className="document-meta">
                            {doc.metadata && doc.metadata.created_at && (
                                <span className="created-date">
                                    Created: {new Date(doc.metadata.created_at).toLocaleDateString()}
                                </span>
                            )}
                            {doc.metadata && doc.metadata.status && (
                                <span className={`status ${doc.metadata.status}`}>
                                    {doc.metadata.status}
                                </span>
                            )}
                        </div>
                        <div className="document-actions">
                            <button 
                                className="view-button"
                                onClick={() => this.viewDocument(doc.document_type, doc.filename)}
                            >
                                View
                            </button>
                            <button 
                                className="download-button"
                                onClick={() => this.downloadDocument(doc.download_path)}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    viewDocument = async (type, filename) => {
        try {
            const response = await fetch(`/api/document/view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    filename: filename
                }),
            });
            
            const data = await response.json();
            
            // Here you could open a modal with document content
            // For simplicity, we'll just alert it
            alert(`Document content: ${data.result.content}`);
        } catch (error) {
            console.error('Error viewing document:', error);
            this.setState({ 
                error: 'Failed to view document. Please try again.',
            });
        }
    }

    renderCreateForm() {
        const { documentTypes, newDocumentType, newDocumentTitle, newDocumentContent } = this.state;
        
        return (
            <div className="create-document-form">
                <h3>Create New Document</h3>
                <form onSubmit={this.handleCreateDocument}>
                    <div className="form-group">
                        <label htmlFor="newDocumentType">Document Type</label>
                        <select
                            id="newDocumentType"
                            name="newDocumentType"
                            value={newDocumentType}
                            onChange={this.handleInputChange}
                        >
                            {documentTypes.map(type => (
                                <option key={type} value={type}>
                                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="newDocumentTitle">Title</label>
                        <input
                            type="text"
                            id="newDocumentTitle"
                            name="newDocumentTitle"
                            value={newDocumentTitle}
                            onChange={this.handleInputChange}
                            placeholder="Enter document title"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="newDocumentContent">Content</label>
                        <textarea
                            id="newDocumentContent"
                            name="newDocumentContent"
                            value={newDocumentContent}
                            onChange={this.handleInputChange}
                            placeholder="Enter document content"
                            rows="10"
                            required
                        ></textarea>
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={this.toggleCreateForm}>
                            Cancel
                        </button>
                        <button type="submit" className="create-button">
                            Create Document
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        const { documentTypes, activeTab, showCreateForm } = this.state;
        
        return (
            <div className="document-management">
                <div className="document-header">
                    <h2>Business Documents</h2>
                    <button className="create-button" onClick={this.toggleCreateForm}>
                        {showCreateForm ? 'Cancel' : 'Create Document'}
                    </button>
                </div>
                
                {showCreateForm ? (
                    this.renderCreateForm()
                ) : (
                    <>
                        <div className="document-tabs">
                            <button 
                                className={activeTab === 'all' ? 'active' : ''}
                                onClick={() => this.handleTabChange('all')}
                            >
                                All Documents
                            </button>
                            
                            {documentTypes.map(type => (
                                <button
                                    key={type}
                                    className={activeTab === type ? 'active' : ''}
                                    onClick={() => this.handleTabChange(type)}
                                >
                                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </button>
                            ))}
                        </div>
                        
                        {this.renderDocumentList()}
                    </>
                )}
            </div>
        );
    }
}

// Render the component
ReactDOM.render(
    <DocumentManagement />,
    document.getElementById('document-management')
);
