# SaluLink Chronic Treatment App

A comprehensive medical assistant system designed to automate clinical, coding, and compliance workflows for managing chronic disease patients within South African medical scheme frameworks.

## Features

### 7 Core Modules

1. **Clinical Note Input and Analysis** - Uses ClinicalBERT to analyze clinical notes and extract chronic conditions
2. **Condition Confirmation** - Allows doctors to confirm detected conditions
3. **ICD-10 Code Selection** - Retrieves and displays applicable ICD-10 codes
4. **Treatment Protocol Generation** - Displays diagnostic and management baskets
5. **Treatment Documentation** - Document test results and upload supporting files
6. **Medication Selection** - Filter and select approved medications by medical scheme plan
7. **Patient Registration & Claim Export** - Generate complete PDF claims

### Key Technologies

- **Frontend**: React 18, Vite, TailwindCSS, React Router
- **Backend**: Flask, ClinicalBERT (Bio_ClinicalBERT)
- **Data Processing**: PapaParse for CSV parsing
- **PDF Generation**: jsPDF with autotable
- **AI Model**: Hugging Face Transformers (ClinicalBERT)

## Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The API will be available at `http://localhost:5000`

## Project Structure

```
NUtz bRO/
├── backend/
│   ├── app.py                 # Flask backend with ClinicalBERT
│   └── requirements.txt       # Python dependencies
├── public/
│   ├── Cardiovascular and Endocrine Conditions.csv
│   ├── Cardiovascular and Endocrine Medicine.csv
│   └── Cardiovascular and Endocrine Treatments.csv
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── AuthiLogo.jsx     # Authi 1.0 branding
│   ├── modules/
│   │   ├── Module1ClinicalNoteInput.jsx
│   │   ├── Module2ConditionConfirmation.jsx
│   │   ├── Module3ICDCodeSelection.jsx
│   │   ├── Module4TreatmentProtocol.jsx
│   │   ├── Module5TreatmentDocumentation.jsx
│   │   ├── Module6MedicationSelection.jsx
│   │   ├── Module7PatientRegistration.jsx
│   │   └── ViewCases.jsx
│   ├── utils/
│   │   ├── api.js            # Backend API integration
│   │   ├── csvParser.js      # CSV data processing
│   │   └── pdfGenerator.js   # PDF claim generation
│   ├── App.jsx               # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Usage

### Complete Workflow

1. **Start New Case**: Click "New Case" in the sidebar
2. **Enter Clinical Note**: Paste or type the patient's clinical note
3. **Analyze**: Click "Process Note" to detect chronic conditions using ClinicalBERT
4. **Confirm Condition**: Select the primary chronic condition
5. **Select ICD Codes**: Choose applicable ICD-10 codes
6. **Select Treatments**: Pick diagnostic and ongoing management tests
7. **Document Results**: Optionally add notes and upload test result images
8. **Select Medications**: Filter by medical scheme plan and select medicines
9. **Register & Export**: Write registration note and export as PDF

### View Saved Cases

- Click "View Cases" in the sidebar
- Browse previously saved cases
- Load cases to continue editing
- Export any case as PDF

## Data Sources

The app uses three CSV datasets:

1. **Cardiovascular and Endocrine Conditions.csv** - ICD-10 codes mapped to conditions
2. **Cardiovascular and Endocrine Treatments.csv** - Diagnostic and management protocols
3. **Cardiovascular and Endocrine Medicine.csv** - Approved medications by scheme plan

## Supported Chronic Conditions

- Cardiac Failure
- Hypertension
- Diabetes Insipidus
- Diabetes Mellitus Type 1
- Diabetes Mellitus Type 2

## API Endpoints

### Backend API

- `POST /api/analyze` - Analyze clinical note with ClinicalBERT
- `POST /api/authi` - Process condition with Authi 1.0
- `GET /api/health` - Health check

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design

Based on Figma design: [SaluLink Chronic App](https://www.figma.com/design/mjnJbgV7t60WNU1xTGYhNT/SaluLink-Chronic-App)

## License

Proprietary - SaluLink Medical Systems

## Support

For issues or questions, contact the development team.
