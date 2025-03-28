import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ColorScheme, FieldStatus } from '../../types';

interface OnboardingFormState {
  companyName: string;
  industry: string;
  businessPlan: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  logoUploaded: boolean;
  colorScheme: ColorScheme;
  currentStep: number;
  totalSteps: number;
  fieldStatus: FieldStatus;
}

const OnboardingForm: React.FC = () => {
  const [formState, setFormState] = useState<OnboardingFormState>({
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
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
      fieldStatus: {
        ...formState.fieldStatus,
        [name as keyof FieldStatus]: 'in_progress'
      }
    });
  };

  const handleFinalizeField = (fieldName: keyof FieldStatus) => {
    setFormState({
      ...formState,
      fieldStatus: {
        ...formState.fieldStatus,
        [fieldName]: 'finalized'
      }
    });
  };

  const handleColorChange = (type: keyof ColorScheme, color: string) => {
    setFormState({
      ...formState,
      colorScheme: {
        ...formState.colorScheme,
        [type]: color
      }
    });
  };

  const handleFileUpload = () => {
    // In a real implementation, this would handle file uploads
    setFormState({ ...formState, logoUploaded: true });
  };

  const nextStep = () => {
    if (formState.currentStep < formState.totalSteps) {
      setFormState({ ...formState, currentStep: formState.currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (formState.currentStep > 1) {
      setFormState({ ...formState, currentStep: formState.currentStep - 1 });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // This would connect to the fast-agent backend API
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      const result = await response.json();
      console.log('Onboarding successful:', result);
      // Handle successful onboarding
    } catch (error) {
      console.error('Onboarding error:', error);
      // Handle error
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Company Information</h3>
      
      <div className="space-y-2">
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formState.companyName}
            onChange={handleChange}
            disabled={formState.fieldStatus.companyName === 'finalized'}
            required
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
          />
          <button 
            type="button" 
            onClick={() => handleFinalizeField('companyName')}
            disabled={!formState.companyName || formState.fieldStatus.companyName === 'finalized'}
            className={`px-4 py-2 rounded-r-md font-medium ${
              formState.fieldStatus.companyName === 'finalized'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {formState.fieldStatus.companyName === 'finalized' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <select
            id="industry"
            name="industry"
            value={formState.industry}
            onChange={handleChange}
            disabled={formState.fieldStatus.industry === 'finalized'}
            required
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
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
            onClick={() => handleFinalizeField('industry')}
            disabled={!formState.industry || formState.fieldStatus.industry === 'finalized'}
            className={`px-4 py-2 rounded-r-md font-medium ${
              formState.fieldStatus.industry === 'finalized'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {formState.fieldStatus.industry === 'finalized' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Business Details</h3>
      
      <div className="space-y-2">
        <label htmlFor="businessPlan" className="block text-sm font-medium text-gray-700">
          Business Plan
        </label>
        <div className="flex">
          <textarea
            id="businessPlan"
            name="businessPlan"
            value={formState.businessPlan}
            onChange={handleChange}
            disabled={formState.fieldStatus.businessPlan === 'finalized'}
            rows={4}
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
          ></textarea>
          <button 
            type="button" 
            onClick={() => handleFinalizeField('businessPlan')}
            disabled={!formState.businessPlan || formState.fieldStatus.businessPlan === 'finalized'}
            className={`px-4 py-2 rounded-r-md font-medium ${
              formState.fieldStatus.businessPlan === 'finalized'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {formState.fieldStatus.businessPlan === 'finalized' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <div className="flex">
          <input
            type="url"
            id="website"
            name="website"
            value={formState.website}
            onChange={handleChange}
            disabled={formState.fieldStatus.website === 'finalized'}
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
          />
          <button 
            type="button" 
            onClick={() => handleFinalizeField('website')}
            disabled={!formState.website || formState.fieldStatus.website === 'finalized'}
            className={`px-4 py-2 rounded-r-md font-medium ${
              formState.fieldStatus.website === 'finalized'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {formState.fieldStatus.website === 'finalized' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Brand & Contact</h3>
      
      <div className="space-y-2">
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleFileUpload}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {formState.logoUploaded && 
          <p className="mt-2 text-sm text-green-600">Logo uploaded successfully!</p>
        }
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Color Scheme
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Primary:</span>
            <input
              type="color"
              value={formState.colorScheme.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="block w-full h-10 rounded-md border border-gray-300"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Secondary:</span>
            <input
              type="color"
              value={formState.colorScheme.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="block w-full h-10 rounded-md border border-gray-300"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Accent:</span>
            <input
              type="color"
              value={formState.colorScheme.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="block w-full h-10 rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
          Contact Email <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formState.contactEmail}
            onChange={handleChange}
            disabled={formState.fieldStatus.contactEmail === 'finalized'}
            required
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100"
          />
          <button 
            type="button" 
            onClick={() => handleFinalizeField('contactEmail')}
            disabled={!formState.contactEmail || formState.fieldStatus.contactEmail === 'finalized'}
            className={`px-4 py-2 rounded-r-md font-medium ${
              formState.fieldStatus.contactEmail === 'finalized'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {formState.fieldStatus.contactEmail === 'finalized' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <div className="relative flex justify-between mb-8 pb-2">
        {/* Progress bar line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        
        {/* Step indicators */}
        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-white ${formState.currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}>
          1
        </div>
        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-white ${formState.currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}>
          2
        </div>
        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-white ${formState.currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}>
          3
        </div>
      </div>
      
      {formState.currentStep === 1 && renderStep1()}
      {formState.currentStep === 2 && renderStep2()}
      {formState.currentStep === 3 && renderStep3()}
      
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        {formState.currentStep > 1 ? (
          <button 
            type="button" 
            onClick={prevStep} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back
          </button>
        ) : (
          <div></div> /* Empty div to maintain flex spacing */
        )}
        
        {formState.currentStep < formState.totalSteps ? (
          <button 
            type="button" 
            onClick={nextStep}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
          </button>
        ) : (
          <button 
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Complete Onboarding
          </button>
        )}
      </div>
    </form>
  );
};

export default OnboardingForm;
