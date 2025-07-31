#!/bin/bash

# Deployment script for Gery's Portfolio

echo "🚀 Starting deployment process..."

# Build and run with Docker Compose
echo "📦 Building Docker image..."
docker-compose build --no-cache

echo "🏃 Starting containers..."
docker-compose up -d

echo "🔍 Checking container status..."
docker-compose ps

echo "📋 Container logs (last 10 lines):"
docker-compose logs --tail=10 portfolio

echo "✅ Deployment complete!"
echo "🌐 Your portfolio is running at: http://localhost:3000"
echo "🔧 To view logs: docker-compose logs -f portfolio"
echo "🛑 To stop: docker-compose down"
