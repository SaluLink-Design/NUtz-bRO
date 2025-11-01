import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { Upload } from 'lucide-react';

const Module5TreatmentDocumentation = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [documentation, setDocumentation] = useState(caseData.documentation || {});
  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
    if (!caseData.diagnosticBasket && !caseData.managementBasket) {
      navigate('/treatment-protocol');
      return;
    }

    // Combine all selected tests
    const combined = [
      ...(caseData.diagnosticBasket || []).map(t => ({ ...t, type: 'Diagnostic' })),
      ...(caseData.managementBasket || []).map(t => ({ ...t, type: 'Management' }))
    ];
    setAllTests(combined);
  }, [caseData.diagnosticBasket, caseData.managementBasket]);

  const handleTextChange = (testCode, text) => {
    setDocumentation(prev => ({
      ...prev,
      [testCode]: {
        ...prev[testCode],
        notes: text
      }
    }));
  };

  const handleFileUpload = (testCode, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentation(prev => ({
          ...prev,
          [testCode]: {
            ...prev[testCode],
            file: {
              name: file.name,
              data: reader.result
            }
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    updateCaseData({ documentation });
    navigate('/medication-selection');
  };

  const handleSkip = () => {
    navigate('/medication-selection');
  };

  const handleBack = () => {
    navigate('/treatment-protocol');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="mb-8 mt-4">
        <AuthiLogo />
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-4 text-center">
          Treatment Documentation
        </h2>

        <p className="text-base text-gray-600 mb-6 text-center">
          Document results or upload images for each selected test/procedure (Optional)
        </p>

        {/* Tests Documentation */}
        <div className="space-y-6 mb-8">
          {allTests.map((test, index) => (
            <div key={index} className="p-6 rounded-xl border-2 border-gray-200 bg-white">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{test.description}</h3>
                  <span className="text-sm px-3 py-1 bg-purple-100 text-primary rounded-full">
                    {test.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Code: <strong>{test.code}</strong> | Quantity: <strong>{test.quantity}</strong>
                </p>
              </div>

              {/* Text Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes/Results:
                </label>
                <textarea
                  value={documentation[test.code]?.notes || ''}
                  onChange={(e) => handleTextChange(test.code, e.target.value)}
                  placeholder="Enter test results or clinical notes..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none text-sm"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document/Image:
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <Upload size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Choose File</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(test.code, e)}
                      className="hidden"
                    />
                  </label>
                  {documentation[test.code]?.file && (
                    <span className="text-sm text-green-600">
                      ✓ {documentation[test.code].file.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
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
            onClick={handleSkip}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-gray-200 transition-colors"
          >
            Skip Documentation
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module5TreatmentDocumentation;

