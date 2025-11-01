import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { generateClaimPDF } from '../utils/pdfGenerator';
import { Download, FileText } from 'lucide-react';

const Module7PatientRegistration = ({ caseData, updateCaseData, saveCase }) => {
  const navigate = useNavigate();
  const [registrationNote, setRegistrationNote] = useState(caseData.registrationNote || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveCase = () => {
    setIsSaving(true);
    updateCaseData({ registrationNote });
    
    // Save case with updated registration note
    const savedCase = saveCase();
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Case saved successfully!');
    }, 500);
  };

  const handleExportPDF = () => {
    const finalCaseData = { ...caseData, registrationNote };
    updateCaseData({ registrationNote });
    
    try {
      const filename = generateClaimPDF(finalCaseData);
      alert(`Claim exported successfully as ${filename}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/medication-selection');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="mb-8 mt-4">
        <AuthiLogo />
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-4 text-center">
          Patient Registration & Claim Export
        </h2>

        <p className="text-base text-gray-600 mb-8 text-center">
          Review your case summary and add a registration note for chronic medication
        </p>

        {/* Case Summary */}
        <div className="mb-8 p-6 rounded-xl border-2 border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Summary</h3>
          
          {/* Condition */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Confirmed Condition:</p>
            <p className="text-base text-gray-900">{caseData.confirmedCondition}</p>
          </div>

          {/* ICD Codes */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">ICD-10 Codes:</p>
            <div className="space-y-1">
              {caseData.selectedICDCodes?.map((icd, index) => (
                <div key={index} className="flex gap-2 text-sm">
                  <span className="font-semibold text-primary">{icd.code}</span>
                  <span className="text-gray-600">- {icd.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Tests */}
          {caseData.diagnosticBasket?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Diagnostic Basket:</p>
              <ul className="space-y-1">
                {caseData.diagnosticBasket.map((test, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {test.description} ({test.code}) - Qty: {test.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Management Tests */}
          {caseData.managementBasket?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Management Basket:</p>
              <ul className="space-y-1">
                {caseData.managementBasket.map((test, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {test.description} ({test.code}) - Qty: {test.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications */}
          {caseData.selectedMedications?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Medications:</p>
              <ul className="space-y-1">
                {caseData.selectedMedications.map((med, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {med.medicineName} ({med.activeIngredient})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Registration Note */}
        <div className="mb-8">
          <label className="block text-lg font-medium instrument-sans mb-3">
            Patient Registration Note for Chronic Medication:
          </label>
          <textarea
            value={registrationNote}
            onChange={(e) => setRegistrationNote(e.target.value)}
            placeholder="Enter registration note detailing chronic medication requirements, patient assessment, and treatment justification..."
            className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary resize-none instrument-sans text-base"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={handleSaveCase}
            disabled={isSaving}
            className="bg-primary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FileText size={20} />
            {isSaving ? 'Saving...' : 'Save Case'}
          </button>
        </div>

        {/* Export PDF Button */}
        <button
          onClick={handleExportPDF}
          className="w-full bg-secondary text-white py-4 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
        >
          <Download size={22} />
          Export Claim as PDF
        </button>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-700 instrument-sans">
            <strong>✓ Case Complete:</strong> Your claim is ready to be exported. The PDF will include all selected
            information, ICD codes, treatments, medications, and documentation. You can save this case for future reference
            or export it immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Module7PatientRegistration;

