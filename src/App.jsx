import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Module1ClinicalNoteInput from './modules/Module1ClinicalNoteInput';
import Module2ConditionConfirmation from './modules/Module2ConditionConfirmation';
import Module3ICDCodeSelection from './modules/Module3ICDCodeSelection';
import Module4TreatmentProtocol from './modules/Module4TreatmentProtocol';
import Module5TreatmentDocumentation from './modules/Module5TreatmentDocumentation';
import Module6MedicationSelection from './modules/Module6MedicationSelection';
import Module7PatientRegistration from './modules/Module7PatientRegistration';
import ViewCases from './modules/ViewCases';

const App = () => {
  const [caseData, setCaseData] = useState({
    clinicalNote: '',
    detectedConditions: [],
    confirmedCondition: null,
    selectedICDCodes: [],
    diagnosticBasket: [],
    managementBasket: [],
    documentation: {},
    selectedMedications: [],
    registrationNote: ''
  });

  const [currentModule, setCurrentModule] = useState(1);
  const [savedCases, setSavedCases] = useState([]);

  const updateCaseData = (updates) => {
    setCaseData(prev => ({ ...prev, ...updates }));
  };

  const saveCase = () => {
    const newCase = {
      ...caseData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setSavedCases(prev => [...prev, newCase]);
    return newCase;
  };

  const startNewCase = () => {
    setCaseData({
      clinicalNote: '',
      detectedConditions: [],
      confirmedCondition: null,
      selectedICDCodes: [],
      diagnosticBasket: [],
      managementBasket: [],
      documentation: {},
      selectedMedications: [],
      registrationNote: ''
    });
    setCurrentModule(1);
  };

  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar onNewCase={startNewCase} />
        
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route 
              path="/" 
              element={
                <Module1ClinicalNoteInput 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/condition-confirmation" 
              element={
                <Module2ConditionConfirmation 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/icd-selection" 
              element={
                <Module3ICDCodeSelection 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/treatment-protocol" 
              element={
                <Module4TreatmentProtocol 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/treatment-documentation" 
              element={
                <Module5TreatmentDocumentation 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/medication-selection" 
              element={
                <Module6MedicationSelection 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route 
              path="/patient-registration" 
              element={
                <Module7PatientRegistration 
                  caseData={caseData}
                  updateCaseData={updateCaseData}
                  saveCase={saveCase}
                />
              } 
            />
            <Route 
              path="/view-cases" 
              element={
                <ViewCases 
                  savedCases={savedCases}
                  setCaseData={setCaseData}
                  setCurrentModule={setCurrentModule}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

