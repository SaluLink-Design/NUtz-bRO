import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';

const Module2ConditionConfirmation = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [selectedCondition, setSelectedCondition] = useState(caseData.confirmedCondition || null);

  useEffect(() => {
    // Redirect if no detected conditions
    if (!caseData.detectedConditions || caseData.detectedConditions.length === 0) {
      navigate('/');
    }
  }, [caseData.detectedConditions, navigate]);

  const handleConfirm = () => {
    if (!selectedCondition) {
      alert('Please select a condition');
      return;
    }

    updateCaseData({ confirmedCondition: selectedCondition });
    navigate('/icd-selection');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {/* Authi Logo */}
      <div className="mb-12 mt-8">
        <AuthiLogo />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-6 text-center">
          Confirm Chronic Condition
        </h2>

        <p className="text-base text-gray-600 mb-8 text-center">
          Based on the clinical note analysis, the following chronic condition(s) were detected.
          Please confirm the primary condition for this case:
        </p>

        {/* Condition List */}
        <div className="space-y-3 mb-8">
          {caseData.detectedConditions?.map((condition, index) => (
            <button
              key={index}
              onClick={() => setSelectedCondition(condition)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedCondition === condition
                  ? 'border-primary bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg instrument-sans font-medium">{condition}</span>
                {selectedCondition === condition && (
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

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
            disabled={!selectedCondition}
            className="flex-1 bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm & Continue
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-gray-700 instrument-sans">
            <strong>Authi 1.0 Activated:</strong> Once you confirm the condition, Authi will retrieve the associated ICD-10 codes and treatment protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Module2ConditionConfirmation;

