import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Document } from '../../types';

interface DocumentManagementProps {
  // Props can be added here if needed
}

const DocumentManagement: React.FC<DocumentManagementProps> = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentTypes] = useState<string[]>([
    'business_plan', 'license', 'legal', 'marketing', 'financial', 'other'
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newDocument, setNewDocument] = useState({
    newDocumentType: 'business_plan',
    newDocumentTitle: '',
    newDocumentContent: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, [activeTab]);

  const fetchDocuments = async (): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/document/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: activeTab === 'all' ? null : activeTab
        }),
      });
      
      const data = await response.json();
      setDocuments(data.result || []);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents. Please try again.');
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCreateForm = (): void => {
    setShowCreateForm(prev => !prev);
  };

  const handleCreateDocument = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    const { newDocumentType, newDocumentTitle, newDocumentContent } = newDocument;
    
    if (!newDocumentTitle || !newDocumentContent) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      
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
        setNewDocument({
          newDocumentType: 'business_plan',
          newDocumentTitle: '',
          newDocumentContent: ''
        });
        setShowCreateForm(false);
        setError(null);
        
        // Refresh document list
        fetchDocuments();
      } else {
        setError('Failed to create document. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating document:', error);
      setError('Failed to create document. Please try again.');
      setLoading(false);
    }
  };

  const downloadDocument = (downloadPath: string): void => {
    // Just navigate to the download URL - the server will handle the file download
    window.open(downloadPath, '_blank');
  };

  const viewDocument = async (type: string, filename: string): Promise<void> => {
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
      setError('Failed to view document. Please try again.');
    }
  };

  const renderDocumentList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading documents...</span>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }
    
    if (!documents.length) {
      return (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">No documents found. Create a new document to get started.</p>
          <button 
            onClick={toggleCreateForm}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Document
          </button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <div className="bg-gray-800 text-white p-4 flex justify-between items-start">
              <h3 className="font-medium text-lg">{doc.filename}</h3>
              <span className="text-xs px-2 py-1 bg-blue-500 rounded-full">{doc.document_type.replace('_', ' ')}</span>
            </div>
            
            <div className="p-4 text-sm flex justify-between items-center border-b border-gray-100">
              {doc.metadata && doc.metadata.created_at && (
                <span className="text-gray-600">
                  Created: {new Date(doc.metadata.created_at).toLocaleDateString()}
                </span>
              )}
              
              {doc.metadata && doc.metadata.status && (
                <span className={`px-2 py-1 rounded text-xs font-medium 
                  ${doc.metadata.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${doc.metadata.status === 'review' ? 'bg-blue-100 text-blue-800' : ''}
                  ${doc.metadata.status === 'final' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {doc.metadata.status}
                </span>
              )}
            </div>
            
            <div className="p-4 flex justify-end space-x-2">
              <button 
                className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => viewDocument(doc.document_type, doc.filename)}
              >
                View
              </button>
              <button 
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => downloadDocument(doc.download_path)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCreateForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-medium text-gray-800 mb-6 pb-2 border-b border-gray-200">Create New Document</h3>
        
        <form onSubmit={handleCreateDocument}>
          <div className="mb-4">
            <label htmlFor="newDocumentType" className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              id="newDocumentType"
              name="newDocumentType"
              value={newDocument.newDocumentType}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="newDocumentTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="newDocumentTitle"
              name="newDocumentTitle"
              value={newDocument.newDocumentTitle}
              onChange={handleInputChange}
              placeholder="Enter document title"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="newDocumentContent" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="newDocumentContent"
              name="newDocumentContent"
              value={newDocument.newDocumentContent}
              onChange={handleInputChange}
              placeholder="Enter document content"
              rows={10}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={toggleCreateForm}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Document
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Business Documents</h2>
        <button 
          onClick={toggleCreateForm}
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {showCreateForm ? 'Cancel' : 'Create Document'}
        </button>
      </div>
      
      {showCreateForm ? (
        renderCreateForm()
      ) : (
        <>
          <div className="flex overflow-x-auto space-x-2 pb-2 mb-6 border-b border-gray-200">
            <button 
              className={`px-4 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
                activeTab === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('all')}
            >
              All Documents
            </button>
            
            {documentTypes.map(type => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
                  activeTab === type 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleTabChange(type)}
              >
                {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
          
          {renderDocumentList()}
        </>
      )}
    </div>
  );
};

export default DocumentManagement;
