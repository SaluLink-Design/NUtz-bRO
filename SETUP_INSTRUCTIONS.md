# SaluLink Setup Instructions

Follow these steps to get the SaluLink Chronic Treatment App running on your machine.

## Quick Start

### Step 1: Install Frontend Dependencies

```bash
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Step 3: Start Backend Server

Open a terminal and run:

```bash
cd backend
python app.py
```

You should see:

```
Loading ClinicalBERT model...
Model loaded successfully!
Starting SaluLink Backend API...
ClinicalBERT is ready to analyze clinical notes!
 * Running on http://0.0.0.0:5000
```

**Keep this terminal open** - the backend needs to keep running.

### Step 4: Start Frontend Development Server

Open a **new terminal** and run:

```bash
npm run dev
```

You should see:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Open the App

Open your browser and go to: **<http://localhost:3000>**

## Testing the App

### Test with Sample Clinical Note

1. Click "New Case"
2. Paste this sample note:

```
Patient presents with elevated blood pressure readings over the past 3 months,
averaging 160/95 mmHg. Patient reports occasional headaches and dizziness.
Past medical history significant for family history of hypertension.
Physical examination reveals no acute distress. Recommend starting antihypertensive
therapy and lifestyle modifications.
```

3. Click "Process Note"
4. You should see "Hypertension" detected
5. Continue through all 7 modules to complete the workflow

### Sample Notes for Other Conditions

**Cardiac Failure:**

```
Patient with history of cardiac failure, presenting with dyspnea on exertion
and peripheral edema. Chest X-ray shows cardiomegaly. Recommend echocardiography
and adjustment of diuretic therapy.
```

**Diabetes Type 2:**

```
Patient diagnosed with Type 2 Diabetes Mellitus. Fasting glucose 8.5 mmol/L,
HbA1c 8.2%. Patient is overweight (BMI 32). Recommend metformin therapy
and dietary counseling.
```

## Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'transformers'`

**Solution:**

```bash
cd backend
pip install --upgrade transformers torch flask flask-cors
```

**Problem:** Backend taking too long to start

**Solution:** First time loading ClinicalBERT model takes 2-5 minutes. It downloads the model files. Subsequent starts will be faster.

### Frontend Issues

**Problem:** `Cannot find module 'react'`

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Port 3000 already in use

**Solution:** Edit `vite.config.js` and change the port:

```javascript
server: {
  port: 3001, // Change to any available port
  ...
}
```

### CSV Data Issues

**Problem:** "Error loading CSV file"

**Solution:** Make sure CSV files are in the `public/` directory:

```bash
ls public/*.csv
```

You should see:

- `Cardiovascular and Endocrine Conditions.csv`
- `Cardiovascular and Endocrine Medicine.csv`
- `Cardiovascular and Endocrine Treatments.csv`

## System Requirements

- **RAM**: Minimum 4GB (8GB recommended for ClinicalBERT)
- **Storage**: 2GB free space for model files
- **Internet**: Required for first-time model download
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- Frontend: Vite automatically reloads on file changes
- Backend: Flask auto-reloads in debug mode

### Viewing Logs

**Frontend logs:** Open browser DevTools (F12) → Console

**Backend logs:** Check the terminal where `python app.py` is running

### Data Modifications

To modify condition data, edit CSV files in the `public/` directory. Changes take effect on page reload.

## Next Steps

1. Test all 7 modules with different conditions
2. Try saving and viewing cases
3. Export a complete PDF claim
4. Customize CSS/styling in `src/index.css`
5. Add more chronic conditions by updating CSV files

## Support

If you encounter issues:

1. Check both terminal windows for error messages
2. Verify all dependencies are installed
3. Ensure both frontend and backend servers are running
4. Clear browser cache and reload

For additional help, refer to `README.md` for detailed documentation.
