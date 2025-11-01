import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { loadCSVFile, getICDCodesForCondition } from '../utils/csvParser';

const Module3ICDCodeSelection = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [icdCodes, setIcdCodes] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState(caseData.selectedICDCodes || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if no confirmed condition
    if (!caseData.confirmedCondition) {
      navigate('/condition-confirmation');
      return;
    }

    loadICDCodes();
  }, [caseData.confirmedCondition]);

  const loadICDCodes = async () => {
    try {
      const conditionsData = await loadCSVFile('Cardiovascular and Endocrine Conditions.csv');
      const codes = getICDCodesForCondition(conditionsData, caseData.confirmedCondition);
      setIcdCodes(codes);
    } catch (error) {
      console.error('Error loading ICD codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCodeSelection = (code) => {
    const isSelected = selectedCodes.some(c => c.code === code.code);
    
    if (isSelected) {
      setSelectedCodes(selectedCodes.filter(c => c.code !== code.code));
    } else {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const handleConfirm = () => {
    if (selectedCodes.length === 0) {
      alert('Please select at least one ICD-10 code');
      return;
    }

    updateCaseData({ selectedICDCodes: selectedCodes });
    navigate('/treatment-protocol');
  };

  const handleBack = () => {
    navigate('/condition-confirmation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AuthiLogo className="mb-4" />
          <p className="text-lg text-gray-600">Loading ICD-10 codes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Authi Logo */}
      <div className="mb-8 mt-4">
        <AuthiLogo />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-4 text-center">
          Select ICD-10 Code(s)
        </h2>

        <p className="text-base text-gray-600 mb-2 text-center">
          Condition: <strong>{caseData.confirmedCondition}</strong>
        </p>

        <p className="text-sm text-gray-500 mb-6 text-center">
          Select one or more applicable ICD-10 codes for this condition
        </p>

        {/* ICD Codes List */}
        <div className="space-y-3 mb-8 max-h-[500px] overflow-y-auto">
          {icdCodes.map((icd, index) => {
            const isSelected = selectedCodes.some(c => c.code === icd.code);
            
            return (
              <button
                key={index}
                onClick={() => toggleCodeSelection(icd)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-base font-semibold text-primary">{icd.code}</span>
                      {isSelected && (
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{icd.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Count */}
        {selectedCodes.length > 0 && (
          <div className="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-700">
              {selectedCodes.length} code{selectedCodes.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedCodes.length === 0}
            className="flex-1 bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module3ICDCodeSelection;

