#!/bin/bash

# Portfolio Health Monitor Script
# This script checks if your portfolio is accessible and all static files are loading correctly

echo "=== Portfolio Health Check ==="
echo "Timestamp: $(date)"
echo

# Check main page
echo "1. Testing main page..."
MAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://gery.irmlabs.my.id/)
if [ "$MAIN_STATUS" = "200" ]; then
    echo "   ✅ Main page: OK ($MAIN_STATUS)"
else
    echo "   ❌ Main page: FAILED ($MAIN_STATUS)"
fi

# Check CSS
echo "2. Testing CSS file..."
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://gery.irmlabs.my.id/_next/static/css/314e8361933ebe44.css)
if [ "$CSS_STATUS" = "200" ]; then
    echo "   ✅ CSS file: OK ($CSS_STATUS)"
else
    echo "   ❌ CSS file: FAILED ($CSS_STATUS)"
fi

# Check JavaScript
echo "3. Testing JavaScript file..."
JS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://gery.irmlabs.my.id/_next/static/chunks/59650de3-611faf956c50405f.js)
if [ "$JS_STATUS" = "200" ]; then
    echo "   ✅ JavaScript file: OK ($JS_STATUS)"
else
    echo "   ❌ JavaScript file: FAILED ($JS_STATUS)"
fi

# Check Font
echo "4. Testing font file..."
FONT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://gery.irmlabs.my.id/_next/static/media/806de4d605d3ad01-s.p.woff2)
if [ "$FONT_STATUS" = "200" ]; then
    echo "   ✅ Font file: OK ($FONT_STATUS)"
else
    echo "   ❌ Font file: FAILED ($FONT_STATUS)"
fi

# Check local server (for debugging)
echo "5. Testing local server..."
LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3030/)
if [ "$LOCAL_STATUS" = "200" ]; then
    echo "   ✅ Local server: OK ($LOCAL_STATUS)"
else
    echo "   ❌ Local server: FAILED ($LOCAL_STATUS)"
fi

echo
echo "=== Docker Status ==="
docker-compose ps

echo
echo "=== Recent nginx logs (last 5 lines) ==="
docker-compose logs --tail=5 portfolio-nginx

echo
echo "Health check completed!"
