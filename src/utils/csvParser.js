import Papa from 'papaparse';

// Parse CSV data
export const parseCSV = (csvText) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Load CSV file from public directory
export const loadCSVFile = async (filename) => {
  try {
    const response = await fetch(`/${filename}`);
    const csvText = await response.text();
    return await parseCSV(csvText);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
};

// Get ICD codes for a specific condition
export const getICDCodesForCondition = (conditionsData, conditionName) => {
  return conditionsData
    .filter(row => row['CHRONIC CONDITIONS'] === conditionName)
    .map(row => ({
      code: row['ICD-C0DE'],
      description: row['ICD-CODE DESCRIPTION']
    }));
};

// Get treatments for a specific condition
export const getTreatmentsForCondition = (treatmentsData, conditionName) => {
  const diagnostic = [];
  const management = [];
  
  treatmentsData.forEach(row => {
    if (row['CHRONIC DISEASE LIST CONDITION'] === conditionName) {
      const treatmentType = row['BASKET TYPE'];
      const treatment = {
        description: row['PROCEDURE/TEST DESCRIPTION'],
        code: row['PROCEDURE/TEST CODE'],
        covered: row['NUMBER OF PROCEDURES OR TESTS COVERED']
      };
      
      if (treatmentType === 'Diagnostic') {
        diagnostic.push(treatment);
      } else if (treatmentType === 'Ongoing Management') {
        management.push(treatment);
      }
    }
  });
  
  return { diagnostic, management };
};

// Get medications for a specific condition
export const getMedicationsForCondition = (medicinesData, conditionName, plan = null) => {
  const medications = medicinesData
    .filter(row => row['CHRONIC DISEASE LIST CONDITION'] === conditionName)
    .map(row => ({
      condition: row['CHRONIC DISEASE LIST CONDITION'],
      cdaCore: row['CDA FOR CORE, PRIORITY AND SAVER PLANS'],
      cdaExecutive: row['CDA FOR EXECUTIVE AND COMPREHENSIVE PLANS'],
      medicineClass: row['MEDICINE CLASS'],
      activeIngredient: row['ACTIVE INGREDIENT'],
      medicineName: row['MEDICINE NAME AND STRENGTH'],
      excluded: row['MEDICINE NAME AND STRENGTH']?.includes('Not available') || false
    }));
  
  // Filter by plan if specified
  if (plan) {
    return medications.filter(med => !med.excluded);
  }
  
  return medications;
};

// Group medications by medicine class
export const groupMedicationsByClass = (medications) => {
  const grouped = {};
  
  medications.forEach(med => {
    const className = med.medicineClass || 'Other';
    if (!grouped[className]) {
      grouped[className] = [];
    }
    grouped[className].push(med);
  });
  
  return grouped;
};

