#!/bin/bash

echo "🚀 Starting SaluLink Frontend..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting Vite development server..."
echo ""
npm run dev

