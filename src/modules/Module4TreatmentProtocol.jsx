import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { loadCSVFile } from '../utils/csvParser';

const Module4TreatmentProtocol = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('diagnostic');
  const [diagnosticTests, setDiagnosticTests] = useState([]);
  const [managementTests, setManagementTests] = useState([]);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(caseData.diagnosticBasket || []);
  const [selectedManagement, setSelectedManagement] = useState(caseData.managementBasket || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseData.confirmedCondition) {
      navigate('/icd-selection');
      return;
    }

    loadTreatments();
  }, [caseData.confirmedCondition]);

  const loadTreatments = async () => {
    try {
      const treatmentsData = await loadCSVFile('Cardiovascular and Endocrine Treatments.csv');
      
      const diagnostic = [];
      const management = [];
      
      treatmentsData.forEach(row => {
        if (row['CHRONIC DISEASE LIST CONDITION'] === caseData.confirmedCondition) {
          const treatment = {
            description: row['PROCEDURE/TEST DESCRIPTION'],
            code: row['PROCEDURE/TEST CODE'],
            covered: row['NUMBER OF PROCEDURES OR TESTS COVERED'],
            quantity: 1
          };
          
          if (row['BASKET TYPE'] === 'Diagnostic') {
            diagnostic.push(treatment);
          } else if (row['BASKET TYPE'] === 'Ongoing Management') {
            management.push(treatment);
          }
        }
      });
      
      setDiagnosticTests(diagnostic);
      setManagementTests(management);
    } catch (error) {
      console.error('Error loading treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTestSelection = (test, type) => {
    if (type === 'diagnostic') {
      const isSelected = selectedDiagnostic.some(t => t.code === test.code);
      if (isSelected) {
        setSelectedDiagnostic(selectedDiagnostic.filter(t => t.code !== test.code));
      } else {
        setSelectedDiagnostic([...selectedDiagnostic, { ...test }]);
      }
    } else {
      const isSelected = selectedManagement.some(t => t.code === test.code);
      if (isSelected) {
        setSelectedManagement(selectedManagement.filter(t => t.code !== test.code));
      } else {
        setSelectedManagement([...selectedManagement, { ...test }]);
      }
    }
  };

  const updateQuantity = (test, quantity, type) => {
    if (type === 'diagnostic') {
      setSelectedDiagnostic(selectedDiagnostic.map(t =>
        t.code === test.code ? { ...t, quantity: parseInt(quantity) || 1 } : t
      ));
    } else {
      setSelectedManagement(selectedManagement.map(t =>
        t.code === test.code ? { ...t, quantity: parseInt(quantity) || 1 } : t
      ));
    }
  };

  const handleConfirm = () => {
    if (selectedDiagnostic.length === 0 && selectedManagement.length === 0) {
      alert('Please select at least one test or procedure');
      return;
    }

    updateCaseData({
      diagnosticBasket: selectedDiagnostic,
      managementBasket: selectedManagement
    });
    navigate('/treatment-documentation');
  };

  const handleBack = () => {
    navigate('/icd-selection');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AuthiLogo className="mb-4" />
          <p className="text-lg text-gray-600">Loading treatment protocols...</p>
        </div>
      </div>
    );
  }

  const currentTests = activeTab === 'diagnostic' ? diagnosticTests : managementTests;
  const currentSelected = activeTab === 'diagnostic' ? selectedDiagnostic : selectedManagement;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="mb-8 mt-4">
        <AuthiLogo />
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-4 text-center">
          Treatment Protocol
        </h2>

        <p className="text-base text-gray-600 mb-6 text-center">
          Condition: <strong>{caseData.confirmedCondition}</strong>
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'diagnostic'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Diagnostic Basket ({selectedDiagnostic.length})
          </button>
          <button
            onClick={() => setActiveTab('management')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'management'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ongoing Management ({selectedManagement.length})
          </button>
        </div>

        {/* Tests List */}
        <div className="space-y-3 mb-8 max-h-[500px] overflow-y-auto">
          {currentTests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tests available for this category
            </div>
          ) : (
            currentTests.map((test, index) => {
              const isSelected = currentSelected.some(t => t.code === test.code);
              const selectedTest = currentSelected.find(t => t.code === test.code);
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTestSelection(test, activeTab)}
                        className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{test.description}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Code: <strong>{test.code}</strong></span>
                          <span>Covered: <strong>{test.covered}</strong></span>
                        </div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <input
                          type="number"
                          min="1"
                          max={parseInt(test.covered) || 999}
                          value={selectedTest?.quantity || 1}
                          onChange={(e) => updateQuantity(test, e.target.value, activeTab)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
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
            disabled={selectedDiagnostic.length === 0 && selectedManagement.length === 0}
            className="flex-1 bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module4TreatmentProtocol;

