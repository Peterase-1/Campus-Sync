#!/bin/bash

# Build script for Netlify deployment
echo "🚀 Building Campus Sync for production..."

# Install dependencies
npm install

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📦 Build files are in the 'dist' directory"
    echo "🌐 Ready for Netlify deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi
