#!/bin/bash

echo "🚀 Starting Emiriti Hub Admin Portal Development Environment..."

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found!"
    exit 1
fi

# Check if node_modules exists in backend
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "📝 Setting up backend environment..."
    cd backend
    node setup.js
    cd ..
fi

echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🎨 Starting frontend development server..."
npm start &
FRONTEND_PID=$!

echo "✅ Development environment started!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔗 Backend API: https://sky.devicebee.com/EmiratiHub"
echo "📚 API Documentation: Check backend/README.md"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for processes
wait

