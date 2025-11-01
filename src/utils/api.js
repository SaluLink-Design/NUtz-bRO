import axios from 'axios';

const API_BASE_URL = '/api';

// Analyze clinical note using ClinicalBERT
export const analyzeClinicalNote = async (clinicalNote) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, {
      text: clinicalNote
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing clinical note:', error);
    throw error;
  }
};

// Process condition with Authi 1.0
export const processConditionWithAuthi = async (condition, action) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authi`, {
      condition,
      action
    });
    return response.data;
  } catch (error) {
    console.error('Error processing with Authi:', error);
    throw error;
  }
};

export default {
  analyzeClinicalNote,
  processConditionWithAuthi
};

