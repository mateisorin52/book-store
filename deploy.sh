#!/bin/bash

# Deployment script for Cloudflare Pages
# Usage: ./deploy.sh [subdomain]
# Example: ./deploy.sh books

set -e

echo "📦 Building the application..."
npm run build

echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=book-store

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://dash.cloudflare.com → Pages → book-store"
echo "2. Navigate to 'Custom domains' tab"
echo "3. Click 'Set up a custom domain'"
echo "4. Enter your subdomain (e.g., books.sofermentor.ro)"
echo "5. Cloudflare will automatically configure DNS"
echo ""

