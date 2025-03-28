class OnboardingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            industry: '',
            businessPlan: '',
            website: '',
            contactEmail: '',
            contactPhone: '',
            logoUploaded: false,
            colorScheme: {
                primary: '#3498db',
                secondary: '#2c3e50',
                accent: '#e74c3c'
            },
            currentStep: 1,
            totalSteps: 3,
            fieldStatus: {
                companyName: 'in_progress',
                industry: 'in_progress',
                businessPlan: 'in_progress',
                website: 'in_progress',
                contactEmail: 'in_progress',
                contactPhone: 'in_progress'
            }
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            fieldStatus: {
                ...this.state.fieldStatus,
                [name]: 'in_progress'
            }
        });
    }

    handleFinalizeField = (fieldName) => {
        this.setState({
            fieldStatus: {
                ...this.state.fieldStatus,
                [fieldName]: 'finalized'
            }
        });
    }

    handleColorChange = (type, color) => {
        this.setState({
            colorScheme: {
                ...this.state.colorScheme,
                [type]: color
            }
        });
    }

    handleFileUpload = (e) => {
        // In a real implementation, this would handle file uploads
        this.setState({ logoUploaded: true });
    }

    nextStep = () => {
        const { currentStep, totalSteps } = this.state;
        if (currentStep < totalSteps) {
            this.setState({ currentStep: currentStep + 1 });
        }
    }

    prevStep = () => {
        const { currentStep } = this.state;
        if (currentStep > 1) {
            this.setState({ currentStep: currentStep - 1 });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // This would connect to the fast-agent backend API
        try {
            const response = await fetch('/api/onboarding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state),
            });
            
            const result = await response.json();
            console.log('Onboarding successful:', result);
            // Handle successful onboarding
        } catch (error) {
            console.error('Onboarding error:', error);
            // Handle error
        }
    }

    renderStep1 = () => (
        <div className="form-step">
            <h3>Company Information</h3>
            
            <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <div className="field-with-status">
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={this.state.companyName}
                        onChange={this.handleChange}
                        disabled={this.state.fieldStatus.companyName === 'finalized'}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => this.handleFinalizeField('companyName')}
                        disabled={!this.state.companyName || this.state.fieldStatus.companyName === 'finalized'}
                        className={this.state.fieldStatus.companyName === 'finalized' ? 'finalized' : ''}
                    >
                        {this.state.fieldStatus.companyName === 'finalized' ? 'Finalized' : 'Finalize'}
                    </button>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <div className="field-with-status">
                    <select
                        id="industry"
                        name="industry"
                        value={this.state.industry}
                        onChange={this.handleChange}
                        disabled={this.state.fieldStatus.industry === 'finalized'}
                        required
                    >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                    </select>
                    <button 
                        type="button" 
                        onClick={() => this.handleFinalizeField('industry')}
                        disabled={!this.state.industry || this.state.fieldStatus.industry === 'finalized'}
                        className={this.state.fieldStatus.industry === 'finalized' ? 'finalized' : ''}
                    >
                        {this.state.fieldStatus.industry === 'finalized' ? 'Finalized' : 'Finalize'}
                    </button>
                </div>
            </div>
        </div>
    );

    renderStep2 = () => (
        <div className="form-step">
            <h3>Business Details</h3>
            
            <div className="form-group">
                <label htmlFor="businessPlan">Business Plan</label>
                <div className="field-with-status">
                    <textarea
                        id="businessPlan"
                        name="businessPlan"
                        value={this.state.businessPlan}
                        onChange={this.handleChange}
                        disabled={this.state.fieldStatus.businessPlan === 'finalized'}
                        rows="4"
                    ></textarea>
                    <button 
                        type="button" 
                        onClick={() => this.handleFinalizeField('businessPlan')}
                        disabled={!this.state.businessPlan || this.state.fieldStatus.businessPlan === 'finalized'}
                        className={this.state.fieldStatus.businessPlan === 'finalized' ? 'finalized' : ''}
                    >
                        {this.state.fieldStatus.businessPlan === 'finalized' ? 'Finalized' : 'Finalize'}
                    </button>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="website">Website</label>
                <div className="field-with-status">
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={this.state.website}
                        onChange={this.handleChange}
                        disabled={this.state.fieldStatus.website === 'finalized'}
                    />
                    <button 
                        type="button" 
                        onClick={() => this.handleFinalizeField('website')}
                        disabled={!this.state.website || this.state.fieldStatus.website === 'finalized'}
                        className={this.state.fieldStatus.website === 'finalized' ? 'finalized' : ''}
                    >
                        {this.state.fieldStatus.website === 'finalized' ? 'Finalized' : 'Finalize'}
                    </button>
                </div>
            </div>
        </div>
    );

    renderStep3 = () => (
        <div className="form-step">
            <h3>Brand & Contact</h3>
            
            <div className="form-group">
                <label htmlFor="logo">Logo</label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={this.handleFileUpload}
                    accept="image/*"
                />
                {this.state.logoUploaded && <p className="success-message">Logo uploaded successfully!</p>}
            </div>
            
            <div className="form-group">
                <label>Color Scheme</label>
                <div className="color-picker-group">
                    <div className="color-field">
                        <span>Primary:</span>
                        <input
                            type="color"
                            value={this.state.colorScheme.primary}
                            onChange={(e) => this.handleColorChange('primary', e.target.value)}
                        />
                    </div>
                    <div className="color-field">
                        <span>Secondary:</span>
                        <input
                            type="color"
                            value={this.state.colorScheme.secondary}
                            onChange={(e) => this.handleColorChange('secondary', e.target.value)}
                        />
                    </div>
                    <div className="color-field">
                        <span>Accent:</span>
                        <input
                            type="color"
                            value={this.state.colorScheme.accent}
                            onChange={(e) => this.handleColorChange('accent', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="contactEmail">Contact Email *</label>
                <div className="field-with-status">
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={this.state.contactEmail}
                        onChange={this.handleChange}
                        disabled={this.state.fieldStatus.contactEmail === 'finalized'}
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => this.handleFinalizeField('contactEmail')}
                        disabled={!this.state.contactEmail || this.state.fieldStatus.contactEmail === 'finalized'}
                        className={this.state.fieldStatus.contactEmail === 'finalized' ? 'finalized' : ''}
                    >
                        {this.state.fieldStatus.contactEmail === 'finalized' ? 'Finalized' : 'Finalize'}
                    </button>
                </div>
            </div>
        </div>
    );

    render() {
        const { currentStep } = this.state;
        
        return (
            <form onSubmit={this.handleSubmit} className="onboarding-form">
                <div className="progress-bar">
                    <div className="progress-step active">1. Company</div>
                    <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>2. Business</div>
                    <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>3. Brand</div>
                </div>
                
                {currentStep === 1 && this.renderStep1()}
                {currentStep === 2 && this.renderStep2()}
                {currentStep === 3 && this.renderStep3()}
                
                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button type="button" onClick={this.prevStep} className="secondary-button">
                            Back
                        </button>
                    )}
                    
                    {currentStep < this.state.totalSteps ? (
                        <button type="button" onClick={this.nextStep}>
                            Next
                        </button>
                    ) : (
                        <button type="submit">
                            Complete Onboarding
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

// Render the component
ReactDOM.render(
    <OnboardingForm />,
    document.getElementById('onboarding-form')
);
