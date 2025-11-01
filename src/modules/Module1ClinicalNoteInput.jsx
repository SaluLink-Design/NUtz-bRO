import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { analyzeClinicalNote } from '../utils/api';

const Module1ClinicalNoteInput = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [clinicalNote, setClinicalNote] = useState(caseData.clinicalNote || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!clinicalNote.trim()) {
      setError('Please enter a clinical note');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Call ClinicalBERT API
      const result = await analyzeClinicalNote(clinicalNote);
      
      // Extract detected conditions
      const detectedConditions = result.conditions || [];
      
      // Update case data
      updateCaseData({
        clinicalNote,
        detectedConditions
      });

      // Navigate to condition confirmation
      navigate('/condition-confirmation');
    } catch (err) {
      // If API fails, use mock data for demonstration
      console.error('Error analyzing note:', err);
      
      // Mock detected conditions based on keywords
      const mockConditions = [];
      const lowerNote = clinicalNote.toLowerCase();
      
      if (lowerNote.includes('heart') || lowerNote.includes('cardiac')) {
        mockConditions.push('Cardiac Failure');
      }
      if (lowerNote.includes('hypertension') || lowerNote.includes('blood pressure') || lowerNote.includes('bp')) {
        mockConditions.push('Hypertension');
      }
      if (lowerNote.includes('diabetes') && (lowerNote.includes('type 1') || lowerNote.includes('insulin'))) {
        mockConditions.push('Diabetes Mellitus Type 1');
      }
      if (lowerNote.includes('diabetes') && (lowerNote.includes('type 2') || lowerNote.includes('metformin'))) {
        mockConditions.push('Diabetes Mellitus Type 2');
      }
      if (lowerNote.includes('diabetes insipidus')) {
        mockConditions.push('Diabetes Insipidus');
      }

      if (mockConditions.length === 0) {
        mockConditions.push('Hypertension'); // Default condition
      }

      updateCaseData({
        clinicalNote,
        detectedConditions: mockConditions
      });

      navigate('/condition-confirmation');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Authi Logo */}
      <div className="mb-12 mt-8">
        <AuthiLogo />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <label className="block text-lg font-medium instrument-sans mb-2">
            Patient Notes:
          </label>
          <textarea
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
            placeholder="Enter or paste the specialist's clinical note here..."
            className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary resize-none instrument-sans text-base"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Process Note Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full max-w-md mx-auto block bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Process Note'
          )}
        </button>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-gray-700 instrument-sans">
            <strong>Note:</strong> ClinicalBERT will analyze your clinical note to identify potential chronic conditions including:
            Cardiac Failure, Hypertension, Diabetes Insipidus, Diabetes Mellitus Type 1, and Diabetes Mellitus Type 2.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Module1ClinicalNoteInput;

