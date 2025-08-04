#!/bin/bash

# Deployment script for Gery's Portfolio

echo "🚀 Starting deployment process..."

# Check if we should use Docker or PM2
if [ "$1" = "pm2" ]; then
    echo "📦 Building with PM2 setup..."
    npm run build:standalone
    
    echo "� Copying static files to standalone..."
    # Copy public folder (images, etc)
    cp -r public .next/standalone/
    
    # Copy _next/static folder (CSS, JS, fonts)
    mkdir -p .next/standalone/.next
    cp -r .next/static .next/standalone/.next/
    
    echo "🔄 Managing PM2 process..."
    
    # Check if the process exists
    if pm2 list | grep -q "my-portfolio"; then
        echo "   Found existing process, restarting..."
        pm2 restart my-portfolio --update-env
    else
        echo "   No existing process found, starting new one..."
        pm2 start .next/standalone/server.js --name "my-portfolio"
    fi
    
    echo "📊 PM2 Status:"
    pm2 status
    
    echo "✅ PM2 Deployment complete!"
    echo "🌐 Your portfolio is running at: http://192.168.100.220:3030"
    echo "🌐 Public domain: https://gery.irmlabs.my.id/"
    echo "🔧 To view logs: pm2 logs my-portfolio"
    echo "🛑 To stop: pm2 stop my-portfolio"
else
    # Build and run with Docker Compose
    echo "📦 Building Docker image..."
    docker-compose build --no-cache

    echo "🏃 Starting containers..."
    docker-compose up -d

    echo "🔍 Checking container status..."
    docker-compose ps

    echo "📋 Container logs (last 10 lines):"
    docker-compose logs --tail=10 portfolio

    echo "✅ Docker Deployment complete!"
    echo "🌐 Your portfolio is running at: http://localhost:3000"
    echo "🔧 To view logs: docker-compose logs -f portfolio"
    echo "🛑 To stop: docker-compose down"
fi
