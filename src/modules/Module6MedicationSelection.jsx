import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthiLogo from '../components/AuthiLogo';
import { loadCSVFile, groupMedicationsByClass } from '../utils/csvParser';

const Module6MedicationSelection = ({ caseData, updateCaseData }) => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState({});
  const [selectedMeds, setSelectedMeds] = useState(caseData.selectedMedications || []);
  const [planFilter, setPlanFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseData.confirmedCondition) {
      navigate('/treatment-documentation');
      return;
    }

    loadMedications();
  }, [caseData.confirmedCondition]);

  const loadMedications = async () => {
    try {
      const medicinesData = await loadCSVFile('Cardiovascular and Endocrine Medicine.csv');
      
      const filtered = medicinesData.filter(row => 
        row['CHRONIC DISEASE LIST CONDITION'] === caseData.confirmedCondition
      ).map(row => ({
        condition: row['CHRONIC DISEASE LIST CONDITION'],
        cdaCore: row['CDA FOR CORE, PRIORITY AND SAVER PLANS'],
        cdaExecutive: row['CDA FOR EXECUTIVE AND COMPREHENSIVE PLANS'],
        medicineClass: row['MEDICINE CLASS'],
        activeIngredient: row['ACTIVE INGREDIENT'],
        medicineName: row['MEDICINE NAME AND STRENGTH'],
        excluded: (row['MEDICINE NAME AND STRENGTH'] || '').includes('Not available')
      }));
      
      const grouped = groupMedicationsByClass(filtered);
      setMedications(grouped);
    } catch (error) {
      console.error('Error loading medications:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMedication = (med) => {
    const isSelected = selectedMeds.some(m => 
      m.medicineName === med.medicineName && m.activeIngredient === med.activeIngredient
    );
    
    if (isSelected) {
      setSelectedMeds(selectedMeds.filter(m => 
        !(m.medicineName === med.medicineName && m.activeIngredient === med.activeIngredient)
      ));
    } else {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const filterByPlan = (med) => {
    if (planFilter === 'all') return true;
    
    // Filter logic based on plan availability
    const isKeyCarePlan = ['core', 'priority', 'saver'].includes(planFilter);
    const isExecutivePlan = ['executive', 'comprehensive'].includes(planFilter);
    
    // Check if medicine is excluded for the plan
    if (med.excluded) return false;
    
    return true;
  };

  const handleConfirm = () => {
    updateCaseData({ selectedMedications: selectedMeds });
    navigate('/patient-registration');
  };

  const handleBack = () => {
    navigate('/treatment-documentation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AuthiLogo className="mb-4" />
          <p className="text-lg text-gray-600">Loading medications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="mb-8 mt-4">
        <AuthiLogo />
      </div>

      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold instrument-sans mb-4 text-center">
          Medication Selection
        </h2>

        <p className="text-base text-gray-600 mb-6 text-center">
          Condition: <strong>{caseData.confirmedCondition}</strong>
        </p>

        {/* Plan Filter */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter by Plan:</label>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Plans</option>
            <option value="core">Core</option>
            <option value="priority">Priority</option>
            <option value="saver">Saver</option>
            <option value="executive">Executive</option>
            <option value="comprehensive">Comprehensive</option>
          </select>
        </div>

        {/* Medications by Class */}
        <div className="space-y-6 mb-8 max-h-[600px] overflow-y-auto">
          {Object.entries(medications).map(([className, meds]) => {
            const filteredMeds = meds.filter(filterByPlan);
            if (filteredMeds.length === 0) return null;
            
            return (
              <div key={className} className="p-6 rounded-xl border-2 border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-primary mb-4">{className}</h3>
                
                <div className="space-y-3">
                  {filteredMeds.map((med, index) => {
                    const isSelected = selectedMeds.some(m => 
                      m.medicineName === med.medicineName && m.activeIngredient === med.activeIngredient
                    );
                    
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-primary bg-purple-50'
                            : med.excluded
                            ? 'border-gray-200 bg-gray-50 opacity-60'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => !med.excluded && toggleMedication(med)}
                            disabled={med.excluded}
                            className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary disabled:opacity-50"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">
                              {med.medicineName}
                              {med.excluded && <span className="ml-2 text-xs text-red-600">(Excluded)</span>}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              Active Ingredient: <strong>{med.activeIngredient}</strong>
                            </p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span>CDA Core: <strong>{med.cdaCore}</strong></span>
                              <span>CDA Executive: <strong>{med.cdaExecutive}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Count */}
        {selectedMeds.length > 0 && (
          <div className="mb-6 p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-700">
              {selectedMeds.length} medication{selectedMeds.length !== 1 ? 's' : ''} selected
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
            className="flex-1 bg-secondary text-white py-3 px-6 rounded-xl instrument-sans font-medium text-lg hover:bg-secondary-light transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module6MedicationSelection;

