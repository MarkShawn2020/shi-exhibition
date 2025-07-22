#!/bin/bash

# Script to generate favicon files from SVG
# Usage: ./generate-favicons.sh

set -e

# Change to public directory
cd "$(dirname "$0")/public"

# Check if favicon.svg exists
if [ ! -f "favicon.svg" ]; then
    echo "Error: favicon.svg not found in public directory"
    exit 1
fi

echo "Generating favicon files from favicon.svg..."

# Generate PNG files using rsvg-convert
echo "Generating PNG favicons..."
rsvg-convert -w 16 -h 16 favicon.svg > favicon-16x16.png
rsvg-convert -w 32 -h 32 favicon.svg > favicon-32x32.png
rsvg-convert -w 180 -h 180 favicon.svg > apple-touch-icon.png
rsvg-convert -w 192 -h 192 favicon.svg > icon-192x192.png
rsvg-convert -w 512 -h 512 favicon.svg > icon-512x512.png

# Generate ICO file using ImageMagick
echo "Generating favicon.ico..."
magick favicon.svg -resize 16x16 -background transparent temp-16.png
magick favicon.svg -resize 32x32 -background transparent temp-32.png
magick favicon.svg -resize 48x48 -background transparent temp-48.png
magick temp-16.png temp-32.png temp-48.png favicon.ico
rm temp-16.png temp-32.png temp-48.png

echo "✅ Favicon generation complete!"
echo "Generated files:"
echo "  - favicon-16x16.png (16x16)"
echo "  - favicon-32x32.png (32x32)"
echo "  - apple-touch-icon.png (180x180)"
echo "  - icon-192x192.png (192x192)"
echo "  - icon-512x512.png (512x512)"
echo "  - favicon.ico (multi-size: 16x16, 32x32, 48x48)"