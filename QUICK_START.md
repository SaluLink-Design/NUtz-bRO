# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Start the Backend

Open a terminal and run:

```bash
./start-backend.sh
```

**First time?** This will:
- Create a Python virtual environment
- Install all dependencies
- Download ClinicalBERT model (takes 2-5 minutes)
- Start the Flask server on port 5000

**Keep this terminal window open!**

### 2️⃣ Start the Frontend

Open a **new terminal** and run:

```bash
./start-frontend.sh
```

This will:
- Install npm dependencies (if needed)
- Start Vite dev server on port 3000

### 3️⃣ Open Your Browser

Navigate to: **http://localhost:3000**

---

## 🎯 First Time Using the App?

1. Click **"New Case"** in the sidebar
2. Paste this sample clinical note:

```
Patient presents with elevated blood pressure readings over the past 3 months,
averaging 160/95 mmHg. Patient reports occasional headaches and dizziness.
Past medical history significant for family history of hypertension.
Physical examination reveals no acute distress. Recommend starting antihypertensive
therapy and lifestyle modifications.
```

3. Click **"Process Note"** → System detects "Hypertension"
4. Click **"Confirm & Continue"** through each module
5. Select ICD codes, treatments, and medications
6. Export your first claim as PDF!

---

## ⚡ Manual Start (if scripts don't work)

### Backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend (in new terminal):
```bash
npm install
npm run dev
```

---

## 🔧 Troubleshooting

**Backend won't start?**
- Make sure Python 3.8+ is installed: `python3 --version`
- Try: `pip3 install -r backend/requirements.txt`

**Frontend won't start?**
- Make sure Node.js 18+ is installed: `node --version`
- Try: `rm -rf node_modules && npm install`

**ClinicalBERT taking forever?**
- First download takes 2-5 minutes (downloads ~400MB model)
- Subsequent starts are much faster!

---

## 📚 Need More Help?

- Full documentation: `README.md`
- Detailed setup: `SETUP_INSTRUCTIONS.md`
- Check both terminal windows for error messages

---

## ✨ You're Ready!

Enjoy building chronic treatment claims with SaluLink! 🏥

