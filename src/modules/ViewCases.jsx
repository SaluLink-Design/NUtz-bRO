import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Trash2 } from 'lucide-react';
import { generateClaimPDF } from '../utils/pdfGenerator';

const ViewCases = ({ savedCases, setCaseData, setCurrentModule }) => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);

  const handleViewCase = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleLoadCase = (caseItem) => {
    setCaseData(caseItem);
    setCurrentModule(7);
    navigate('/patient-registration');
  };

  const handleExportCase = (caseItem) => {
    try {
      const filename = generateClaimPDF(caseItem);
      alert(`Case exported as ${filename}`);
    } catch (error) {
      console.error('Error exporting case:', error);
      alert('Error exporting case. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Cases</h1>
          <p className="text-gray-600">View, export, or reload previously saved chronic treatment cases</p>
        </div>

        {savedCases.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved cases</h3>
            <p className="text-gray-500 mb-6">Start a new case to create your first chronic treatment claim</p>
            <button
              onClick={() => navigate('/')}
              className="bg-secondary text-white px-6 py-3 rounded-xl font-medium hover:bg-secondary-light transition-colors"
            >
              Create New Case
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cases List */}
            <div className="space-y-4">
              {savedCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedCase?.id === caseItem.id
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleViewCase(caseItem)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {caseItem.confirmedCondition || 'Untitled Case'}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(caseItem.date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportCase(caseItem);
                        }}
                        className="p-2 text-gray-600 hover:text-primary transition-colors"
                        title="Export PDF"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <strong>ICD Codes:</strong> {caseItem.selectedICDCodes?.length || 0}
                    </p>
                    <p className="text-gray-600">
                      <strong>Tests:</strong>{' '}
                      {(caseItem.diagnosticBasket?.length || 0) + (caseItem.managementBasket?.length || 0)}
                    </p>
                    <p className="text-gray-600">
                      <strong>Medications:</strong> {caseItem.selectedMedications?.length || 0}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadCase(caseItem);
                    }}
                    className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Load Case
                  </button>
                </div>
              ))}
            </div>

            {/* Case Details */}
            <div className="lg:sticky lg:top-8 h-fit">
              {selectedCase ? (
                <div className="p-6 rounded-xl border-2 border-gray-200 bg-white">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Details</h2>

                  <div className="space-y-4">
                    {/* Condition */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Condition:</p>
                      <p className="text-base text-gray-900">{selectedCase.confirmedCondition}</p>
                    </div>

                    {/* ICD Codes */}
                    {selectedCase.selectedICDCodes?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">ICD-10 Codes:</p>
                        <div className="space-y-1">
                          {selectedCase.selectedICDCodes.map((icd, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-semibold text-primary">{icd.code}</span>
                              <span className="text-gray-600"> - {icd.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Note */}
                    {selectedCase.clinicalNote && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Clinical Note:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedCase.clinicalNote}
                        </p>
                      </div>
                    )}

                    {/* Diagnostic Tests */}
                    {selectedCase.diagnosticBasket?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Diagnostic Tests:</p>
                        <ul className="space-y-1">
                          {selectedCase.diagnosticBasket.map((test, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              • {test.description} ({test.code})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Management Tests */}
                    {selectedCase.managementBasket?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Management Tests:</p>
                        <ul className="space-y-1">
                          {selectedCase.managementBasket.map((test, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              • {test.description} ({test.code})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Medications */}
                    {selectedCase.selectedMedications?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Medications:</p>
                        <ul className="space-y-1">
                          {selectedCase.selectedMedications.map((med, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              • {med.medicineName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Registration Note */}
                    {selectedCase.registrationNote && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Registration Note:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedCase.registrationNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 rounded-xl border-2 border-dashed border-gray-300 text-center">
                  <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Select a case to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCases;

